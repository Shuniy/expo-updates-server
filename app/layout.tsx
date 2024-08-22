import "../styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import Footer from "../components/footer";
import { cn } from "../lib/utils";
import SectionContainer from "../components/section-container";

export const metadata: Metadata = {
  title: {
    template: "%s | Expo Dashboard",
    default: "Expo Dashboard",
  },
  description: "Expo Dashboard",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={cn([inter.className, "bg-background"])}>
      <body className="antialiased mx-auto bg-background min-h-dvh text-foreground relative top-0 bottom-0 left-0 right-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <SectionContainer>
            <div className="flex h-full flex-col justify-center">
              <Header />
              <main className="mb-auto top-16 py-9">{children}</main>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
