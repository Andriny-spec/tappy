import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Providers } from "./providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tappy | Tecnologia Inteligente para Transformar Conexões",
  description: "Tappy oferece um ecossistema exclusivo de soluções digitais que transformam a maneira como interagimos no mundo corporativo. Integre Tappy Link, Tappy Whats e Tappy Imob para revolucionar seu negócio com inovação e elegância.",
  keywords: ["Tappy", "Tappy Link", "Tappy Whats", "Tappy Imob", "CRM", "Imobiliária", "WhatsApp", "Cartão Virtual", "Networking", "Cartão Digital", "Identidade Digital", "Automação", "Marketing Digital", "Conexões Profissionais"],
  authors: [{ name: "Tappy" }],
  creator: "Tappy",
  publisher: "Tappy Technologies",
  icons: {
    icon: [
      { url: "/logo.svg" }
    ],
    apple: [
      { url: "/logo.svg" }
    ],
    shortcut: [
      { url: "/logo.svg" }
    ]
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://tappy.id",
    title: "Tappy | Tecnologia Inteligente para Transformar Conexões",
    description: "Tappy oferece um ecossistema exclusivo de soluções digitais que transformam a maneira como interagimos no mundo corporativo.",
    siteName: "Tappy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tappy - Ecossistema de soluções digitais"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tappy | Tecnologia Inteligente para Transformar Conexões",
    description: "Descubra o ecossistema Tappy de soluções digitais e transforme seu negócio.",
    images: ["/og-image.jpg"],
    creator: "@tappytech"
  },
  robots: {
    index: true,
    follow: true
  },
  metadataBase: new URL("https://tappy.id"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="scroll-smooth">
      <body className={`${poppins.variable} ${inter.variable} antialiased min-h-screen bg-background text-foreground`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
