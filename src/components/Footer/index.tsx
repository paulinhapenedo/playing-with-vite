import { strings } from "./strings";

export function Footer() {
  return (
    <footer className="border-t border-slate-950 px-4 md:px-8">
      <div className="border-x border-slate-950 w-full flex flex-col p-6 space-y-8">
        <p className="text-sm text-muted-foreground">{strings.content}</p>
      </div>
    </footer>
  );
}
