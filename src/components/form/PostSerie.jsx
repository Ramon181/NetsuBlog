import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Modal from "react-modal";
import { createSerie, getGender } from "../../redux/actions/SerieAction"
import AddSerie from "../modals/addSerie";

const PostSerie = () => {

    const genderAll = useSelector(state => state.gender)
    const dispatch = useDispatch()

    const [openAddProduct, setIsOpenAddProduct] = useState(false);
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({
        name: "",
        description: "",
        author: "",
        demography: "",
        country: "",
        img: "",
        gender: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const newSerie = {
            name: info.name,
            description: info.description,
            author: info.author,
            demography: info.demography,
            country: info.country,
            img: info.img,
            gender: info.gender
        }
        dispatch(createSerie(newSerie))
        setIsOpenAddProduct(true);
        setInfo({
            name: "",
            description: "",
            author: "",
            demography: "",
            country: "",
            img: "",
            gender: ""
        })
    }


    const uploadImage = async (e) => {
        try {

            const files = e.target.files[0];
            setImage(files.name);
            const data = new FormData();
            data.append("file", files);
            data.append("upload_preset", "cgdjowgz");
            setLoading(true);
            await axios
                .post("https://api.cloudinary.com/v1_1/dwffcpljq/image/upload", data)
                .then(ress => {

                    setInfo({
                        ...info,
                        img: ress.data.secure_url
                    })
                });
        } catch (error) {
            console.log(error)
        }
    };

    const handleInputChange = async (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        })
    }

    const handleSelect = (e) => {
        console.log(e);
        if (!info.gender.includes(e)) {
            setInfo({
                ...info,
                gender: [...info.gender, e]
            })
        } else {
            alert("Please select")
        }
    }

    useEffect(() => {
        dispatch(getGender())
    }, [dispatch]);

    console.log(info)
    console.log(loading)

    return (
        <div className="mx-auto bg-gray-100 w-full h-screen px-4 py-10 sm:px-6 lg:px-8">

            <form action="" onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-[45rem] space-y-4">
                <div className=" flex flex-row space-x-2">

                    <div className=" w-full">
                        <label htmlFor="name" className="sr-only">Nombre de la Serie</label>

                        <div className="relative">
                            <input
                                value={info.name}
                                onChange={handleInputChange}
                                type="text"
                                name="name"
                                id="name"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Nombre de la Serie"
                            />
                        </div>
                    </div>

                    <div className=" w-full">
                        <label htmlFor="author" className="sr-only">Autor</label>

                        <div className="relative">
                            <input
                                value={info.author}
                                onChange={handleInputChange}
                                type="text"
                                name="author"
                                id="author"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Autor"
                            />
                        </div>
                    </div>
                </div>


                <div>
                    <label htmlFor="description" className="sr-only">Descripción</label>

                    <div className="relative">
                        <input
                            value={info.description}
                            onChange={handleInputChange}
                            type="text"
                            name="description"
                            id="description"
                            className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Descripción"
                        />
                    </div>
                </div>

                <div className=" flex flex-row space-x-2">

                    <div className=" w-full">
                        <label htmlFor="demography" className="sr-only">Demografía</label>

                        <div className="relative">
                            <input
                                value={info.demography}
                                onChange={handleInputChange}
                                type="text"
                                name="demography"
                                id="demography"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Demografía"
                            />
                        </div>
                    </div>

                    <div className=" w-full">
                        <label htmlFor="country" className="sr-only">País</label>

                        <div className="relative">
                            <input
                                value={info.country}
                                onChange={handleInputChange}
                                type="text"
                                name="country"
                                id="country"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="País"
                            />
                        </div>
                    </div>
                </div>


                <div className="relative selct">
                    <div className="bg-white flex border cursor-pointer border-gray-200 rounded items-center">
                        {
                            info.gender.length === 0 ? (
                                <span className="p-4 appearance-none outline-none text-gray-700 w-full" > Selccionar un Genero</span>
                            ) : (
                                <div className="w-full flex flex-row ">
                                    {
                                        info.gender.map(event => (
                                            <div key={event} onClick={() => {
                                                setInfo({
                                                    ...info,
                                                    gender: info.gender.filter(e => e !== event)
                                                })
                                            }} className="p-1 m-2 rounded-sm flex flex-row opacity-60 bg-gray-200 hover:bg-[#da2121]">
                                                <span className=" appearance-none outline-none opacity-75 text-gray-900 " >{event}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }

                        <label htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </label>
                    </div>
                    <div className="absolute  h-[200px] overflow-y-scroll scroll-smooth selector rounded shadow bg-white overflow-hidden hidden peer-checked:flex z-10 flex-col w-full mt-1 border border-gray-200">
                        {
                            genderAll.map(event => (
                                info.gender.includes(event.name) ? null :
                                    <div key={event.id} className="cursor-pointer  w-full group">
                                        <button className="block p-2 w-full text-left border-transparent border-l-4 group-hover:border-[#8549ba] group-hover:bg-gray-100" type="button" onClick={() => handleSelect(event.name)}  >
                                            {event.name}
                                        </button>
                                    </div>
                            ))
                        }
                    </div>

                </div>

                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-700" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex justify-center items-center text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-sm p-1 font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span className="">Upload a file</span>
                                <input id="file-upload" name="file" type="file" onChange={uploadImage} className="sr-only" aria-describedby="file_input_help" />
                            </label>
                            {
                                info.img ? <p className="pl-1 text-gray-700">{image}</p> :
                                    <p className="pl-1 text-gray-700">Seleccionar una imagen</p>
                            }
                        </div>
                        <p className="text-xs text-gray-700">
                            PNG, JPG, GIF de 800 kbs
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="inline-block rounded-sm bg-[#8549ba] hover:bg-[#6e3d99] px-5 py-3 text-sm font-medium text-white"
                    >
                        Publicar
                    </button>
                </div>
            </form>
            <Modal
                isOpen={openAddProduct}
                onRequestClose={() => setIsOpenAddProduct(false)}
                overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                }}
                className={{
                    base: "content-base",
                    afterOpen: "content-after",
                    beforeClose: "content-before",
                }}
                closeTimeoutMS={500}
            >
                <AddSerie setOpenError={setIsOpenAddProduct} />
            </Modal>
        </div>
    )
}

export default PostSerie