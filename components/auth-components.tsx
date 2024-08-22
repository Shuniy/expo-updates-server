"use client";

import { signout } from "../lib/server-actions";
import { Button } from "./ui/button";

export function SignIn(props: React.ComponentPropsWithRef<typeof Button>) {
  return <Button {...props}>Sign In</Button>;
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  const handleSignOut = () => {
    signout();
  };

  return (
    <Button onClick={handleSignOut} variant="ghost" className="w-full" {...props}>
      Sign Out
    </Button>
  );
}
