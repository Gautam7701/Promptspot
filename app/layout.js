import React, { children } from 'react'
import "@styles/globals.css";
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from "@components/Footer"

// Next-auth does not just use the front-end files within the app for authenticaion...it uses the next GS Api backend  endpoints as well
export const metadata = {
    // openGraph: {
        title: "Promptspot",
        description: "Discover & Share AI Prompts",
        images: [
            {
                url: "/assets/images/logo1.svg",
                width: 800, 
                height: 600,
                alt: "Promptspot - Discover & Share AI Prompts",
            },
        ],
    }
// }
const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
            <div className="main">
                <div className="gradient" />
            </div>
            <main className='app'>
                <Nav/>
                {children}
                <Footer/>
            </main>
            </Provider>
        </body>
    </html>
  ) 
}

export default RootLayout

