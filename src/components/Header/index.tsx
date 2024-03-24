import { strings } from "./strings";

export function Header() {
  return (
    <header className="sticky top-0 border-b border-slate-950 px-4 md:px-8">
      <div className="border-x border-slate-950 w-full h-24 flex items-center px-6">
        <a
          href="/"
          title="Vite Travel"
          className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          {strings.title}
        </a>
      </div>
    </header>
  );
}
