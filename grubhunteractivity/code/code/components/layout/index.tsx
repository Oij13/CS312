import { ReactNode } from "react";
import { Header } from "../header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="layout-grid">{children}</main>
    </>
  );
}
