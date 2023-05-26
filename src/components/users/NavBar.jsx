import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal"
import SearchBar from "./SearchBar"
import img from "../../images/netsu.png"
import SingIn from "./SingIn";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../../redux/actions/UserAction";


const NavBar = () => {

    const [loginModal, setLoginModal] = useState(false);
    const dispatch = useDispatch();
    const navegate = useNavigate()
    const user = useSelector(state => state.user)

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
            <header className="bg-[#fffde7] border-b-[1px] border-gray-50 text-gray-900 shadow-lg md:block">
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
                                <button onClick={() => setLoginModal(true)} className=" flex flex-row justify-center items-center border-r-2 border-gray-400 px-1 hover:text-[#8549ba]">
                                    <svg className=" mx-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5l-5-5m9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14Z" /></svg>
                                    Sing in
                                </button>
                                <Link to={"/register"} className=" flex flex-row justify-center items-center px-1 hover:text-[#8549ba]">
                                    <svg className=" mx-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7H4m11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1Z" /></svg>
                                    Sing up
                                </Link>

                            </div>
                        )
                    }

                </div>
            </header>
            <nav className="bg-[#fffde7] shadow-[inset_20px_0_50px_#ecebd6,inset_-10px_0_20px_#ecebd6] animate-[expand-from-left_0.3s_1.5s_cubic-bezier(.02,0.01,0.47,1)_forwards] flex flex-row justify-center items-center py-0 font-semibold text-base">
                <ul className="mx-auto flex items-center">
                    <li className="p-4 hover:text-[#8549ba]">
                        <Link to={"/"} href="">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="p-4 hover:text-[#8549ba]">
                        <a href="">
                            <span>Blog</span>
                        </a>

                    </li>
                    <li className="p-4 body_Drox">
                        <a href="">
                            <span>Series</span>
                        </a>
                        <ul className="drox">
                            <li className="texto">
                                <a className="linke" href="">
                                    Naruto
                                </a>
                            </li>
                            <li className="texto">
                                <a className="linke" href="">
                                    Demon Slayer
                                </a>
                            </li>
                            <li className="texto">
                                <a className="linke" href="">
                                    Dragon Ball
                                </a>
                            </li>
                            <li className="texto">
                                <a className="linke" href="">
                                    Inazuma Eleven
                                </a>
                            </li>
                            <li className="texto">
                                <a className="linke" href="">
                                    My Hero Academy
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="p-4 body_Drox ">
                        <a href="">
                            <span>Characters</span>
                        </a>
                        <ul className="drox">
                            <li className="texto">
                                <a className="linke" href="">
                                    Naruto
                                </a>
                            </li>
                            <li className="texto">
                                <a className="linke" href="">
                                    Demon Slayer
                                </a>
                            </li>
                            <li className="texto">
                                <a className="linke" href="">
                                    Dragon Ball
                                </a>
                            </li>
                            <li className="texto">
                                <a className="linke" href="">
                                    Inazuma Eleven
                                </a>
                            </li>
                            <li className="texto">
                                <a className="linke" href="">
                                    My Hero Academy
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="p-4 hover:text-[#8549ba]">
                        <a href="">
                            <span>Inquest</span>
                        </a>
                    </li>
                </ul>
            </nav>
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