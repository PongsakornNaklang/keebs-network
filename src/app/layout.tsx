
import { Providers } from "./providers";

export const metadata = {
  title: 'Keebs Network :)',
  description: 'Custom Keyboard Community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>

  )
}
