import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Gitsift",
  description: "A simple github repository evaluation tool",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link
        rel="icon"
        href="/icon.png"
        type="image/png"
        sizes="32x32"
      />
      <body className="min-h-screen antialiased font-sans bg-background text-foreground flex flex-col">
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
