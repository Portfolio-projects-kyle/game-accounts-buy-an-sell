// app/layout.tsx
import type { ReactNode } from "react";
import MUIWrapper from "./MUIWrapper";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MUIWrapper>{children}</MUIWrapper>
      </body>
    </html>
  );
}
