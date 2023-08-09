import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css';
export const metadata ={
    title:"Threads",
    description:"A nextjs based social media application"
}
const clerk_pub_key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const inter = Inter({subsets:["latin"]})
export default function RootLayout({children}:{children: React.ReactNode}){
    return(

        <ClerkProvider publishableKey={clerk_pub_key}>
            <html>
                <body className={`${inter.className} bg-dark-1`}>
                {children}
                </body>
            </html>
        </ClerkProvider>
    )
}