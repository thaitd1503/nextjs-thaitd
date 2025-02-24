import Loading from "@/app/ui/loading/Loading";
import {Providers} from "@/app/components/providers";
import {inter} from "@/app/ui/fonts";
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${inter.className} antialiased`}>
        <Providers>
            <Loading/>
            {children}
        </Providers>
        </body>
        </html>
    );
}
