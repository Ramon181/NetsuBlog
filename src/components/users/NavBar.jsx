import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal"
import SearchBar from "./SearchBar"
import img from "../../images/netsu.png"
import SingIn from "./SingIn";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../../redux/actions/UserAction";
import { getSerie } from "../../redux/actions/SerieAction";


const NavBar = () => {

    const [loginModal, setLoginModal] = useState(false);
    const dispatch = useDispatch();
    const navegate = useNavigate()
    const user = useSelector(state => state.user)
    const allSerie = useSelector(state => state.series)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            dispatch(userState(user));
        } else {
            dispatch(
                userState({
                    userName: null,
                    name: null,
                    token: null,
                    role: null,
                    profile: null,
                    banned: null
                })
            );
        }
        dispatch(getSerie())
    }, [dispatch]);

    const singOff = () => {
        localStorage.removeItem("user");
        dispatch(userState({
            userName: null,
            name: null,
            token: null,
            role: null,
            profile: null,
            banned: null
        }));
        navegate("/")
    }

    return (
        <div>
            <header className="bg-[#ffffff] text-gray-900 border-b-2 shadow-lg md:block">
                <div className="mx-auto flex justify-between container items-center h-24">
                    <Link to={"/"} className="p-0 flex justify-center items-center ">
                        <img className=" w-32 h-32" src={img} alt="" />
                    </Link>
                    <div className=" flex justify-center items-center mx-auto w-full max-w-4xl h-full">
                        <SearchBar />
                    </div>
                    {
                        user.userName ? (
                            <div className="body_Drox ">
                                <div className=" cursor-pointer flex flex-row justify-center items-center">
                                    <img className=" w-7 h-7 rounded-full" src={user.profile} alt="" />
                                </div>
                                <ul className="drox right-0">
                                    <li className="texto">
                                        <a className="linke" href="">
                                            Seting
                                        </a>
                                    </li>
                                    <li className="texto">
                                        <button type="button" onClick={() => singOff()} className="linke w-full text-left" href="">
                                            SignOff
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className=" flex flex-row justify-center items-center font-semibold">
                                <button onClick={() => setLoginModal(true)} className=" flex flex-row justify-center items-center px-1 hover:text-[#8549ba]">
                                     Ingresar
                                </button>
                                <Link to={"/register"} className=" flex flex-row justify-center items-center px-1 hover:text-[#8549ba] border-l border-gray-200 transition-all">
                                    Crear Cuenta
                                </Link>

                            </div>
                        )
                    }

                </div>
            </header>
            <nav className="bg-[#ffffff] text-gray-900 border-b-2 flex flex-row justify-center items-center py-0 font-semibold text-lg">
                <ul className="mx-auto flex items-center">
                    <li className="p-4 hover:text-[#8549ba]">
                        <Link to={"/"} >
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li className="p-4 hover:text-[#8549ba]">
                        <Link to={"/blog"} >
                            <span>Blog</span>
                        </Link>

                    </li>
                    <li className="p-4 body_Drox">
                        <Link to={"/series"} >
                            <span>Series</span>
                        </Link>
                    </li>
                    <li className="p-4 body_Drox ">
                        <a className=" flex flex-row justify-center items-center" href="#">
                            <span>Personajes</span>
                            <svg className=" text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="rotate(180 12 12)"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 14l-5-5m0 0l-5 5"/></g></svg>
                        </a>
                        <ul className="drox">
                            {
                                allSerie.map(e => (
                                    <li key={e.id} className="texto">
                                        <Link to={"/characters"} className="linke">
                                            {e.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                </ul>
            </nav>
            {/* <div className=" w-full h-10 bg-[#8549ba]">
                <h2>
                    Hola
                </h2>
            </div> */}
            <Modal
                isOpen={loginModal}
                onRequestClose={() => setLoginModal(false)}
                overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                }}
                className={{
                    base: "content-base",
                    afterOpen: "content-box",
                    beforeClose: "content-before",
                }}
                closeTimeoutMS={500}
            >
                <SingIn setLoginModal={setLoginModal} />
            </Modal>
        </div>
    )
}

export default NavBar