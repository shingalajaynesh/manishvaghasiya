export function Footer() {
  return (
    <footer className="relative z-10 text-center py-8 border-t border-white/5 mt-auto w-full">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p className="text-white/30">
          © {new Date().getFullYear()} Manish Vaghasiya. All rights reserved.
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/40">
          <a 
            href="mailto:info@manishvaghasiya.com" 
            className="hover:text-gold-primary transition-colors duration-200"
          >
            info@manishvaghasiya.com
          </a>
          <a 
            href="tel:+918200302328" 
            className="hover:text-gold-primary transition-colors duration-200"
          >
            +91 82003 02328
          </a>
        </div>

        <p className="text-white/20 tracking-wider">
          manishvaghasiya.com · manishvaghasiya.in
        </p>
      </div>
    </footer>
  )
}
