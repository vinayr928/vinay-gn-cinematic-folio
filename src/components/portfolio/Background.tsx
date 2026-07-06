export function Background() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-background"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 50% -10%, rgba(0,113,227,0.06), transparent 60%)",
      }}
    />
  );
}
