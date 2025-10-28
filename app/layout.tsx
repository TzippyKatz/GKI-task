// /app/layout.tsx
import './globals.css';
import Header from '../components/Header/Header';

export const metadata = {
  title: 'Hadasim Store',
  description: 'Online store for fashion products',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
