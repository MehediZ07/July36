import { Anton, IBM_Plex_Mono, Newsreader, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';

const anton = Anton({ subsets: ['latin'], weight: ['400'], variable: '--font-anton' });
const newsreader = Newsreader({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-newsreader' });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-ibm-plex-mono' });
const notoSansBengali = Noto_Sans_Bengali({ subsets: ['latin', 'bengali'], weight: ['400', '600', '700'], variable: '--font-noto-sans-bengali' });

export const metadata = {
  title: 'July36 — ৩৬ দিন',
  description: 'A simple Next.js tribute page for the July uprising in Bangladesh.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${newsreader.variable} ${ibmPlexMono.variable} ${notoSansBengali.variable}`}>
      <body>{children}</body>
    </html>
  );
}
