
export default function Layout({ children }:{children:React.ReactNode}) {
    return (
        <div className="flex flex-col min-h-screen w-full justify-center items-center">
            <main>{children}</main>
        </div>
    );
}