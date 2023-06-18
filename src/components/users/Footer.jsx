import img from "../../images/netsu.png";

const Footer = () => {
    return (
        <footer className="px-4 py-8 border-t-[1px] border-gray-100 bg-white text-gray-600">
            <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
                <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-violet-400">
                        <img src={img} alt="" />
                    </div>
                    <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
                        <li>
                            <a rel="noopener noreferrer" href="#">Condiciones de uso</a>
                        </li>
                    </ul>
                </div>
                <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                    <li>
                        <a rel="noopener noreferrer" href="#">Instagram</a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#">Facebook</a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#">Linkedin</a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#">GitHub</a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#">Setio Web</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer