import "@/styles/globals.css";
import {Metadata, Viewport} from "next";
import clsx from "clsx";

import {Providers} from "./providers";

import {siteConfig} from "@/config/site";
import {fontMono, fontSans} from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html suppressHydrationWarning lang="en">
      <head />
      <body
          className={clsx(
              "min-h-screen text-foreground bg-background font-sans antialiased",
              fontSans.variable,
              fontMono.variable
          )}
      >
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <div className="relative flex flex-col h-screen">
          {/*<Navbar />*/}
          <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow z-10">
            {children}
          </main>
          <div
              className="fixed hidden dark:block dark:opacity-100 -bottom-[20%] md:-bottom-[30%] -left-[30%] z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/docs-left-white.png"
                 className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                 alt="docs left background" data-loaded="true"/>
          </div>
          <div
              className="fixed hidden dark:block dark:opacity-70 -top-[20%] md:-top-[50%] -right-[80%] md:-right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/docs-right-red.png"
                 className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                 alt="docs right background" data-loaded="true"/>
          </div>
        </div>
      </Providers>
      </body>
      </html>
  );
}
