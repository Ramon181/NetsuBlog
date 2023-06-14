import { Link } from "react-router-dom"
import Search from "./Search"

const UsersList = () => {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full lg:w-5/6">

                    <div className="sm:flex items-center bg-white justify-between px-2 py-1 mt-6 mb-4">
                        <div className="flex items-center">
                            <div>
                                <Search />
                            </div>
                            <button data-testing="download" className="mx-2 ">
                                <svg className="text-gray-600 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M6 20q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Zm6-4l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Z" /></svg>
                            </button>
                            <button className="mx-2 ">
                                <svg className="text-gray-600 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8V5H8v3H6V3h12v5h-2ZM4 10h16H4Zm14 2.5q.425 0 .713-.288T19 11.5q0-.425-.288-.713T18 10.5q-.425 0-.713.288T17 11.5q0 .425.288.713T18 12.5ZM16 19v-4H8v4h8Zm2 2H6v-4H2v-6q0-1.275.875-2.138T5 8h14q1.275 0 2.138.863T22 11v6h-4v4Zm2-6v-4q0-.425-.288-.713T19 10H5q-.425 0-.713.288T4 11v4h2v-2h12v2h2Z" /></svg>
                            </button>
                            <button className="mx-2 ">
                                <svg className="text-gray-600 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M9 18h11v-2.675H9V18ZM4 8.675h3V6H4v2.675Zm0 4.675h3v-2.675H4v2.675ZM4 18h3v-2.675H4V18Zm5-4.65h11v-2.675H9v2.675Zm0-4.675h11V6H9v2.675ZM4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Z" /></svg>
                            </button>
                            <button className="mx-2 ">
                                <svg className="text-gray-600 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16"><path fill="currentColor" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" /></svg>
                            </button>
                        </div>
                        <Link to={"/series-list/post"} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-[#8549ba] hover:bg-[#6e3d99] focus:outline-none rounded-sm">
                            <p className="text-sm font-medium leading-none text-white">Add Task</p>
                        </Link>
                    </div>

                    <div className="bg-white overflow-x-scroll scroll-smooth scrollbar shadow-md rounded ">

                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-3 text-left">Nombre</th>
                                    <th className="py-3 px-3 text-left">Descripción</th>
                                    <th className="py-3 px-3 text-left">Autor</th>
                                    <th className="py-3 px-3 text-left">Pais</th>
                                    <th className="py-3 px-3 text-left">Demografía</th>
                                    <th className="py-3 px-3 text-left">Genero</th>
                                    <th className="py-3 px-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {/* {
                                    series.map(event => (
                                        <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-3 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2">
                                                        <img className=" w-6 h-6 rounded-full" src={event.img} alt="" />
                                                    </div>
                                                    <span className="font-medium">{event.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 text-left">
                                                <div className="flex items-center w-full justify-between min-w-0 max-w-[10rem]">
                                                    <span className="truncate">{event.description}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 text-left">
                                                <div className="flex items-center">

                                                    <span>{event.author}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 text-left">
                                                <span>{event.country}</span>
                                            </td>
                                            <td className="py-3 px-3 text-left">
                                                <span>{event.demography}</span>
                                            </td>
                                            <td className="py-3 px-3 text-left">
                                                <div className="flex items-center w-full justify-between min-w-0 max-w-[10rem]">
                                                {
                                                    event.genders?.map(e =>(
                                                        <span className="truncate" key={e.id}>{e.name}</span>
                                                    ))
                                                }

                                                </div>
                                                
                                            </td>
                                            <td className="py-3 px-3 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                } */}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersList