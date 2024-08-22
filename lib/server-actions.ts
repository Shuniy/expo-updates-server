"use server";

import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, signIn, signOut } from "../auth";
import { firebaseAuth, fireStoreDB } from "../common/firebase";
import { redirect } from "next/navigation";
import { collection, addDoc, setDoc, doc, getDocs, getDoc } from "firebase/firestore";
import { UpdateMetaDataDB } from "../common/models";

export async function login(params: { email: string; password: string }) {
  const email = params.email;
  const password = params.password;

  await signIn("credentials", { email, password });
}

export async function register(params: { email: string; password: string }) {
  const email = params.email;
  const password = params.password;

  const _ = await createUserWithEmailAndPassword(firebaseAuth, email, password);

  login({ email, password });
}

export async function forgotPassword(params: { email: string }) {
  const email = params.email;

  const _ = await sendPasswordResetEmail(firebaseAuth, email);
}

export async function signout() {
  await signOut({ redirect: false });
  redirect("/");
}

export async function addUpdateMetaToDB(metaData: UpdateMetaDataDB) {
  try {
    const response = await setDoc(doc(fireStoreDB, "updates", metaData.name), {
      ...metaData,
    });
    console.log("Document written with ID: ", response);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUpdateMetaData(timestamp: string): Promise<UpdateMetaDataDB | undefined> {
  const docRef = doc(fireStoreDB, "updates", timestamp);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UpdateMetaDataDB;
  } else {
    return undefined;
  }
}

export const getSession = async () => {
  const session = await auth();
  return session;
};
