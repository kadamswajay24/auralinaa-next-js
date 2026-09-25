import { Outfit, Dancing_Script } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing', weight: '700' });

export const metadata = {
  title: 'Auralinaa Foods - Sustainable Seafood Solutions',
  description: 'Empowering sustainable fisheries with traceable, ethical seafood.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={`${outfit.variable} ${dancing.variable} font-outfit`}>
        {children}
      </body>
    </html>
  );
}
