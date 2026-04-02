
import { Logo } from "./logo";
import { AuthElement } from "./auth-element";

export function Header() {
  return (
    <header>
      <div className="layout-grid" style={{ display: "flex", alignItems: "center" }}>
        {Logo}
        <AuthElement />
      </div>
    </header>
  );
}
