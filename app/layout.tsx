// app/layout.tsx
import type { ReactNode } from "react";
import MUIWrapper from "./MUIWrapper";
import { AuthProvider } from "./context/AuthContext"; // Import your new provider

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MUIWrapper>
            {children}
          </MUIWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}