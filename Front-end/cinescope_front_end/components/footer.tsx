export function Footer() {
  return (
    <footer className="px-4 py-12 border-t bg-card border-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-primary">CineScope</h3>
            <p className="text-sm text-muted-foreground">
              Discover movies powered by artificial intelligence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between pt-8 text-sm border-t border-secondary md:flex-row text-muted-foreground">
          <p>© 2025 CineScope. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Data powered by{" "}
            <a href="#" className="text-primary hover:underline">
              TMDB
            </a>{" "}
            • AI by{" "}
            <a href="#" className="text-primary hover:underline">
              OpenAI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
