import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <header className='py-6 '>
                <div className="container">
                    Header
                </div>
            </header>
            <main className='flex-1 py-6 '>
                <div className="container">
                    {children}
                </div>
            </main>
            <footer className='py-6 supports-[backdrop-filter]:bg-background/60'>
                <div className="container">
                    Footer
                </div>
            </footer>
        </>
    )
}

export default Layout