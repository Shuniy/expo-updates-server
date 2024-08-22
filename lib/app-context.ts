import { Session } from "next-auth";
import { createContext, Dispatch, SetStateAction } from "react";

export type AppContextModel = {
  selectedRuntimeVersion?: string;
  setSelectedRuntimeVersion?: Dispatch<SetStateAction<string | undefined>>;
  allUpdatesMetaData?: Record<string, string[]>;
  session?: Session;
};

const AppContext = createContext<AppContextModel>({});
export default AppContext;
