import { Logo } from "./logo";

export function Header() {
  return (
    <header>
      <div className="layout-grid">
        {Logo}
      </div>
    </header>
  );
}
