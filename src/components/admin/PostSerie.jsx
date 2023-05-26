import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGender } from "../../redux/actions/SerieAction"

const PostSerie = () => {

    const genderAll = useSelector(state => state.gender)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGender())
    }, [dispatch]);

    console.log(genderAll)

    return (
        <div className="mx-auto bg-gray-100 w-full h-screen px-4 py-16 sm:px-6 lg:px-8">

            <form action="" className="mx-auto mb-0 mt-8 max-w-[45rem] space-y-4">
                <div className=" flex flex-row space-x-2">

                    <div className=" w-full">
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />
                        </div>
                    </div>

                    <div className=" w-full">
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>
                </div>


                <div>
                    <label htmlFor="password" className="sr-only">Password</label>

                    <div className="relative">
                        <input
                            type="password"
                            className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"
                        />
                    </div>
                </div>

                <div className=" flex flex-row space-x-2">

                    <div className=" w-full">
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />
                        </div>
                    </div>

                    <div className=" w-full">
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>
                </div>


                <div className="relative selct">
                    <div className="bg-white flex border cursor-pointer border-gray-200 rounded items-center">
                        <span className="p-4 appearance-none outline-none text-gray-700 w-full" > select</span>

                        <label htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </label>
                    </div>
                    <div className="absolute  h-[200px] overflow-y-scroll scroll-smooth selector rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
                        {
                            genderAll.map(e => (
                                <button value={e.name} key={e.id} className="cursor-pointer group">
                                    <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">{e.name}</a>
                                </button>
                            ))
                        }
                    </div>

                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="inline-block rounded-sm bg-[#8549ba] hover:bg-[#6e3d99] px-5 py-3 text-sm font-medium text-white"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostSerie