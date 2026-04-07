import type { Metadata } from "next";                                                                                                                                       
  import "./globals.css";                                                                                                                                                     
                                                                                                                                                                              
  export const metadata: Metadata = {                                                                                                                                         
    title: "Interactive Calendar",                                                                                                                                            
    description: "A beautiful wall calendar with date range selection",                                                                                                       
  };                                                                                                                                                                          
                                                                                                                                                                              
  export default function RootLayout({                                                                                                                                        
    children,                                                                                                                                                                 
  }: Readonly<{                                                                                                                                                               
    children: React.ReactNode;                                                                                                                                                
  }>) {                                                                                                                                                                       
    return (                                                                                                                                                                  
      <html lang="en">                                                                                                                                                        
        <body>{children}</body>                                                                                                                                               
      </html>                                                                                                                                                                 
    );                                                                                                                                                                        
  } 