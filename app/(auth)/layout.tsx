// import React from "react";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";

// import "../globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Auth",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
    // <ClerkProvider
    //   appearance={{
    //     baseTheme: dark,
    //   }}
    // >
    //   <html lang='en'>
    //     <body className={`${inter.className} bg-dark-1`}>{children}</body>
    //   </html>
    // </ClerkProvider>
//   );
// }

import '../globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ['latin'] })

export const metadata ={
  title:"onboarding",
  description:"A nextjs based social media application"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}
  >
    <html lang='en'>
      <body className={`${inter.className} bg-dark-1`}>{children}</body>
    </html>
  </ClerkProvider>
  )
}
