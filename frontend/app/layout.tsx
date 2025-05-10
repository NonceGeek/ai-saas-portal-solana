import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import type { Metadata } from "next";
import { SolanaProvider } from "@/components/counter/provider/Solana";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "TaiShang AI SaaS System",
  description: "Make AI Agents as the Labors for your business!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={
          "flex justify-center min-h-screen bg-background font-sans antialiased bg-white dark:bg-gray-800"
        }
      >
        <ThemeProvider enableSystem>
          <SolanaProvider>
            {children}
            <Toaster
              position="bottom-right"
              theme="dark"
              closeButton
              richColors={false}
              toastOptions={{
                style: {
                  background: "#171717",
                  color: "white",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                },
                className: "toast-container",
              }}
            />
          </SolanaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
