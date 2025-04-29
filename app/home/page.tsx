import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header
        className="px-6 lg:px-8 h-16 flex items-center backdrop-blur-sm bg-background/30 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
            D
          </div>
          <span className="font-semibold">DashBoard</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">
            Powerful Analytics Dashboard for your Business
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Gain valuable insights into your business performance with our comprehensive
            analytics dashboard. Monitor metrics, track progress, and make data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">View Dashboard</Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button size="lg" variant="outline" className="px-8">Explore Analytics</Button>
            </Link>
          </div>
        </div>
        <div className="mt-16 relative w-full max-w-6xl mx-auto">
          <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border shadow-xl bg-card">
            <div className="w-full h-full bg-gradient-to-tr from-muted to-card p-8 flex flex-col">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}
                       className="h-24 rounded-lg bg-background/50 border border-border animate-pulse" />
                ))}
              </div>
              <div className="flex-1 rounded-lg bg-background/50 border border-border animate-pulse" />
            </div>
          </div>
          <div
            className="absolute -bottom-4 -right-4 h-24 w-24 rounded-lg bg-primary blur-3xl opacity-20 animate-pulse" />
          <div
            className="absolute -top-4 -left-4 h-24 w-24 rounded-lg bg-primary blur-3xl opacity-20 animate-pulse" />
        </div>
      </main>
      <footer className="border-t border-border py-6 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2025 Dashboard Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}