export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 text-[12px] text-muted-foreground sm:flex-row">
        <div>Vinay GN — Project Implementation Engineer II</div>
        <div>© {new Date().getFullYear()} · Crafted with care.</div>
      </div>
    </footer>
  );
}
