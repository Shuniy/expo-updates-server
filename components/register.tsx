"use client";

import { FormEvent, useState } from "react";
import { register } from "../lib/server-actions";
import CustomLink from "./custom-link";

export default function RegisterView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const signup = async (event: FormEvent) => {
    try {
      event.preventDefault();
      register({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={signup} className="flex flex-1 gap-9 flex-col justify-center w-full px-3">
      <h2 className="text-center text-3xl font-bold">Register</h2>

      <div className="flex flex-col gap-9 rounded-md bg-card p-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-primary rounded-md sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-primary rounded-md sm:text-sm"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6">
              Password Again
            </label>
          </div>
          <div className="mt-2">
            <input
              id="passwordAgain"
              name="passwordAgain"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPasswordAgain(e.target.value)}
              required
              className="w-full p-3 border border-primary rounded-md sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!email || !password || !passwordAgain || password !== passwordAgain}
          className="disabled:opacity-40 flex w-full justify-center rounded-md bg-primary p-3 text-sm font-bold text-primary-foreground">
          Sign Up
        </button>
        <CustomLink
          href={"/login"}
          className="flex text-sm w-full justify-center rounded-md bg-primary p-3 font-bold text-primary-foreground">
          Login
        </CustomLink>
      </div>
    </form>
  );
}
