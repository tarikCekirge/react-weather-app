import { Github } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className='py-6 backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60'>
            <div className="container flex justify-center">
                <Link target="_blank" to={"https://github.com/tarikCekirge"}>
                    <Github />
                </Link>
            </div>
        </footer>
    )
}

export default Footer