import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center -mt-6">
              <a href="https://mbai-group.com" target="_blank" rel="noopener noreferrer">
                <img 
                  src={`/autoleads-images/leads-vcai-logo.png`} 
                  alt="LEADS by MBAI Solutions"
                  className="h-72 w-auto object-contain opacity-90 hover:opacity-75 transition-opacity duration-200"
                />
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              A complete lead generation operation — built and run for real estate companies. We find the prospects, organize them, and convert them into appointments.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Lead Sourcing</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Lead Tracking</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Cold Calling Team</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Our Process</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Success Stories</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>mohanad.barakat@mbai-group.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{"\uD83C\uDDEA\uD83C\uDDEC"} +20 1100054278</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Cairo, Egypt &<br/>Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pb-8 mb-8 border-b border-border text-center">
          <p className="text-foreground font-display font-bold text-lg mb-3">Ready to fill your pipeline?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-colors"
          >
            Get started today
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LEADS by <a href="https://mbai-group.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MBAI Solutions</a>. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
