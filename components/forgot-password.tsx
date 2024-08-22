"use client";

import { FormEvent, useState } from "react";
import { forgotPassword } from "../lib/server-actions";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");

  const resetEmail = async (event: FormEvent) => {
    try {
      event.preventDefault();
      forgotPassword({ email });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={resetEmail}
      className="flex flex-1 flex-col gap-9 bg-card rounded-md justify-center p-3">
      <h2 className="text-center text-3xl font-bold">Forgot Password</h2>

      <div className="flex flex-col gap-9">
        <div>
          <label htmlFor="email" className="text-sm font-medium leading-6">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-primary rounded-md sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={!email}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-primary p-3 text-sm font-bold text-primary-foreground">
            Send Forgot Password Email
          </button>
        </div>
      </div>
    </form>
  );
}
