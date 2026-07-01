import './globals.css';

export const metadata = {
  title: '৩৬ দিন — July Uprising',
  description: 'A simple Next.js tribute page for the July uprising in Bangladesh.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
