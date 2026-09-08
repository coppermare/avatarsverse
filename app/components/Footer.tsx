export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-900/50 py-8">
      <div className="container-main flex flex-col items-center justify-between gap-4 text-sm text-zinc-400 sm:flex-row">
        <span>
          MIT licensed. Made by{" "}
          <a
            href="https://kristikumrija.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-zinc-300"
          >
            Kristi Kumrija
          </a>
          .
        </span>
        <a
          href="https://github.com/coppermare/avatarsverse"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-zinc-300"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
