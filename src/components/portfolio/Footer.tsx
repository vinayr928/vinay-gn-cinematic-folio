export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.82_0.18_210)] shadow-[0_0_10px_oklch(0.82_0.18_210)]" />
          Vinay<span className="text-gradient font-semibold">.GN</span> — Project Implementation Engineer II
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Crafted with obsessive detail.
        </div>
      </div>
    </footer>
  );
}
