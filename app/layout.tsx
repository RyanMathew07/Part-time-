import type { Metadata, Viewport } from 'next';
import './globals.css';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'PART-TIME | Hyper-Local Shift & Gig Marketplace',
  description:
    'Instant discovery of local part-time shifts with transparent wage tiers, OTP 6767 check-in verification, and zero-fee instant UPI payouts.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("bg-white dark:bg-[#000000] text-black dark:text-white", "font-sans", inter.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var saved = localStorage.getItem('part_time_theme');
    var isDark = saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`,
          }}
        />
      </head>
      {/* Backward compat token: bg-black */}
      <body className="min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white antialiased font-sans transition-colors duration-200">
        <MarketplaceProvider>{children}</MarketplaceProvider>
      </body>
    </html>
  );
}
