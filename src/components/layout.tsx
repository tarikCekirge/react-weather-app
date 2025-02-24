import { PropsWithChildren } from 'react'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
            <main className='flex-1 py-6 '>
                <div className="container">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Layout