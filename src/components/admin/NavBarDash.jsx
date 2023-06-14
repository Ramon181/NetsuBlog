import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../../redux/actions/UserAction";

const NavBarDash = () => {

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

    console.log(user)

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
            <div className="bg-[#8549ba]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center md:justify-between py-4">
                        <div className="w-1/4 md:hidden">
                            <svg className="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z" /></svg>
                        </div>
                        <div className="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
                            Netsu
                        </div>
                        <div className="body_Drox">
                            <div className=" cursor-pointer flex flex-row justify-center items-center">
                                <h2 className=" font-semibold text-lg mx-2 text-white">{user.userName}</h2>
                                <img className=" w-7 h-7 rounded-full" src={user.profile} alt="" />
                            </div>
                            <ul className="drox right-0">
                                <li className="texto">
                                    <a className="linke" href="">
                                        Seting
                                    </a>
                                </li>
                                <li className="texto">
                                    <button type="button" onClick={()=>singOff()} className="linke w-full text-left" href="">
                                        SignOff
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden bg-white md:block md:border-b">
                <div className="container mx-auto px-4">
                    <div className="md:flex">
                        <div className="flex -mb-px mr-8">
                            <Link to={"/"} className="no-underline text-gray-800 md:text-blue-dark flex items-center py-4 border-b border-blue-dark">
                                <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fillRule="evenodd" d="M3.889 3h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H3.89A.9.9 0 0 1 3 12.09V3.91A.9.9 0 0 1 3.889 3zM3.889 15h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H3.89C3.398 21 3 20.616 3 20.143v-4.286c0-.473.398-.857.889-.857zM13.889 11h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H13.89a.9.9 0 0 1-.889-.91v-8.18a.9.9 0 0 1 .889-.91zM13.889 3h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H13.89C13.398 9 13 8.616 13 8.143V3.857c0-.473.398-.857.889-.857z" /></svg>
                                Dashboard
                            </Link>
                        </div>
                        <div className="flex -mb-px mr-8">
                            <Link to={"/series-list"} className="no-underline text-gray-800e opacity-50 md:text-grey-dark md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">
                                <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 24 24"><path fill="currentColor" d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm-2.486-6.164V14a1 1 0 0 1-2 0V6a1 1 0 1 1 2 0v2.164l3.93-2.808A1.887 1.887 0 0 1 12.542 5c1.09 0 1.972.941 1.972 2.102v5.796c0 .417-.116.824-.334 1.17c-.606.965-1.832 1.222-2.736.576l-3.93-2.808zm5.028-4.734L8.487 10l4.055 2.898V7.102z" /></svg>
                                Series
                            </Link>
                        </div>
                        <div className="flex -mb-px mr-8">
                            <Link to={"/characters-list"} className="no-underline text-gray-800 opacity-50 md:text-grey-dark md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">
                                <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="currentColor" d="M8 14v-2.108c1.984-.504 3.501-2.476 3.501-4.882c0-2.797-2.049-5.007-4.5-5.007c-2.45 0-4.5 2.21-4.5 5.007c0 2.405 1.516 4.376 3.499 4.881V14H1a1 1 0 0 1 0-2.003h1.434C1.241 10.727.501 8.961.501 7.01c0-3.872 2.91-7.01 6.5-7.01s6.5 3.138 6.5 7.01c0 1.951-.74 3.716-1.933 4.987H13A1 1 0 0 1 13 14H8Z" /></svg>
                                Personajes
                            </Link>
                        </div>
                        <div className="flex -mb-px mr-8">
                            <Link to={"/users"} className="no-underline text-gray-800 opacity-50 md:text-grey-dark md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">
                                <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M152 80a12 12 0 0 1 12-12h80a12 12 0 0 1 0 24h-80a12 12 0 0 1-12-12Zm92 36h-80a12 12 0 0 0 0 24h80a12 12 0 0 0 0-24Zm0 48h-56a12 12 0 0 0 0 24h56a12 12 0 0 0 0-24Zm-88.38 25a12 12 0 1 1-23.24 6c-5.72-22.23-28.24-39-52.38-39s-46.66 16.76-52.38 39a12 12 0 1 1-23.24-6c5.38-20.9 20.09-38.16 39.11-48a52 52 0 1 1 73 0c19.04 9.85 33.75 27.11 39.13 48ZM80 132a28 28 0 1 0-28-28a28 28 0 0 0 28 28Z" /></svg>
                                Usuarios
                            </Link>
                        </div>
                        <div className="flex -mb-px mr-8">
                            <Link to={"/post-list"} className="no-underline text-gray-800 opacity-50 md:text-grey-dark md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">
                                <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048"><path fill="currentColor" d="M896 1537V936L256 616v880l544 273l-31 127l-641-320V472L960 57l832 415v270q-70 11-128 45V616l-640 320v473l-128 128zM754 302l584 334l247-124l-625-313l-206 103zm206 523l240-120l-584-334l-281 141l625 313zm888 71q42 0 78 15t64 41t42 63t16 79q0 39-15 76t-43 65l-717 717l-377 94l94-377l717-716q29-29 65-43t76-14zm51 249q21-21 21-51q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692l-34 135l135-34l692-691z" /></svg>
                                Publicaciones
                            </Link>
                        </div>
                        <div className="flex -mb-px">
                            <Link to={"/inquests-list"} className="no-underline text-gray-800 opacity-50 md:text-grey-dark md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">
                                <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 2v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.993.993 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4H7V2h10ZM7 6H5v14h14V6h-2v2H7V6Zm2 10v2H7v-2h2Zm0-3v2H7v-2h2Zm0-3v2H7v-2h2Zm6-6H9v2h6V4Z" /></svg>
                                Comentarios
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBarDash

