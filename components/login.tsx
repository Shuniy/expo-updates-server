"use client";

import { FormEvent, useState } from "react";
import { login } from "../lib/server-actions";
import CustomLink from "./custom-link";

export default function LoginView() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      login({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 gap-9 flex-col justify-center">
      <h2 className="text-center text-3xl font-bold tracking-tight">Login to your account</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-9 bg-card rounded-md p-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full p-3 border border-primary rounded-md sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6">
              Password
            </label>
            <CustomLink href={"forgot-password"} className="font-semibold text-sm text-primary">
              Forgot password?
            </CustomLink>
          </div>

          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full p-3 border border-primary rounded-md sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={!email || !password}
            className="flex disabled:opacity-40 w-full justify-center rounded-md bg-primary p-3 text-sm font-bold text-primary-foreground">
            Sign in
          </button>
        </div>

        <CustomLink
          href={"/register"}
          className="flex text-sm w-full justify-center rounded-md bg-primary p-3 font-semibold text-primary-foreground">
          Register for access
        </CustomLink>
      </form>
    </div>
  );
}
