import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return <section className="mx-auto max-w-3xl px-3 py-3 sm:px-9 sm:py-9">{children}</section>;
}
