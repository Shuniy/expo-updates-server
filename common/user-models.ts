import { Error } from "./models";

export type UserState = {
  user?: { status: boolean };
  loading: boolean;
  error?: Error;
};
