import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSerie } from "../../redux/actions/SerieAction"
import axios from "axios"
import { createPost } from "../../redux/actions/PostAction"
import Modal from "react-modal";
import Exito from "../modals/Exito"

const PostPost = () => {

    const [info, setInfo] = useState({
        title: "",
        description: "",
        serieId: "",
        textos: [],
        photos: []
    })
    const [openExito, setIsOpenExito] = useState(false);
    const [multiImage, setMultiImage] = useState("")
    const serie = useSelector(state => state.series)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            title: info.title,
            description: info.description,
            serieId: info.serieId,
            textos: info.textos,
            photos: info.photos
        }
        dispatch(createPost(newPost))
        setInfo({
            title: "",
            description: "",
            serieId: "",
            textos: [],
            photos: []
        })
    }

    const handleSelect = (e) => {
        setInfo({
            ...info,
            serieId: e
        })
    }

    const handleSelctTexto = (index, value) => {
        const updatedInputs = [...info.textos];
        updatedInputs[index] = value;
        setInfo({
            ...info,
            textos: updatedInputs
        })
    }

    const handleInputChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleAddInput = () => {
        setInfo({
            ...info,
            textos: [...info.textos, ""],
        });
    };

    const uploadMultiImage = async (e) => {
        try {
            let imagenes = [];
            let nameImage = [];
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                nameImage.push(files[0].name)
                const formData2 = new FormData();
                formData2.append("file", files[i])
                formData2.append("upload_preset", "cgdjowgz");
                await axios
                    .post("https://api.cloudinary.com/v1_1/dwffcpljq/image/upload", formData2)
                    .then(ress => {
                        imagenes.push(ress.data.secure_url)
                    });
            }
            setMultiImage([...nameImage]);
            setInfo({
                ...info,
                photos: [...info.photos, ...imagenes]
            })
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        dispatch(getSerie())
    }, [dispatch]);

    const link = "/post-list"
    console.log(info)

    return (
        <div className="mx-auto bg-gray-100 w-full h-full px-4 py-10 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-[45rem] space-y-4">
                <div className=" w-full">
                    <label htmlFor="title" className="sr-only">Nombre del Personaje</label>
                    <div className="relative">
                        <input
                            value={info.title}
                            onChange={handleInputChange}
                            type="text"
                            name="title"
                            id="title"
                            className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Titulo de la Publicación"
                        />
                    </div>
                </div>
                <div className=" w-full">
                    <label htmlFor="description" className="sr-only">Descripcion</label>
                    <div className="relative">
                        <textarea
                            value={info.description}
                            onChange={handleInputChange}
                            className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                            name="description"
                            id="description"
                            cols="10"
                            placeholder="Descripcion"
                            rows="10"></textarea>
                    </div>
                </div>
                <div className=" space-y-4">
                    {
                        info.textos.map((input, index) => (
                            <input key={index}
                                value={input}
                                onChange={(e) => handleSelctTexto(index, e.target.value)}
                                type="text"
                                name="texto"
                                id="texto"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder={`Escribe el texto ${index + 1}`}
                            />
                        ))

                    }
                </div>
                <div className=" w-full flex justify-end">
                    <button type="button" onClick={handleAddInput} className=" p-2 bg-gray-600 text-white font-semibold hover:bg-gray-500  rounded-sm">
                        Añadir Texto
                    </button>
                </div>


                <div className="relative selct">
                    <div className="bg-white flex border cursor-pointer border-gray-200 rounded items-center">

                        {
                            serie.map(event => (
                                info.serieId.includes(event.id) ? (
                                    <div key={event.id} className="w-full flex flex-row ">
                                        <div onClick={() => {
                                            setInfo({
                                                ...info,
                                                serieId: ""
                                            })
                                        }} className="p-1 m-2 rounded-sm flex flex-row opacity-60 bg-gray-200 hover:bg-[#da2121]">
                                            <span className=" appearance-none outline-none opacity-75 text-gray-900 " >{event.name}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <span key={event.id} className="p-4 appearance-none outline-none text-gray-700 w-full" > Selccionar una Serie</span>
                                )
                            ))
                        }

                        <label htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </label>
                    </div>
                    {
                        info.serieId ? null : (
                            <div className="absolute  max-h-[200px] overflow-y-scroll scroll-smooth selector rounded shadow bg-white overflow-hidden hidden peer-checked:flex z-10 flex-col w-full mt-1 border border-gray-200">
                                {
                                    serie.map(event => (
                                        <div key={event.id} className="cursor-pointer  w-full group">
                                            <button type="button" onClick={() => handleSelect(event.id)} className="block p-2 w-full text-left border-transparent border-l-4 group-hover:border-[#8549ba] group-hover:bg-gray-100">
                                                {event.name}
                                            </button>
                                        </div>

                                    ))
                                }
                            </div>
                        )
                    }

                </div>

                <div className="flex w-full justify-center">
                    <label htmlFor="upload-imagenes"
                        className=" w-auto inline-flex items-center px-4 py-2 bg-gray-600 border border-gray-600 rounded-l font-semibold cursor-pointer text-sm text-white tracking-widest hover:bg-gray-500 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition ">
                        Selccionar imagenes
                    </label>
                    <input id="upload-imagenes" name="file" type="file" onChange={uploadMultiImage} className="hidden" multiple />
                    <div className="w-full max-w-[33rem] border border-gray-300 rounded-r-md flex items-center justify-between">
                        {
                            info.photos.length ? (<>
                                <div>
                                    <span className="p-2">{multiImage.length}</span><span className="p-2"> Imagenes Seleccionadas</span>
                                </div>
                                <button type="button" onClick={() => {
                                    setMultiImage("")
                                    setInfo({
                                        ...info,
                                        photos: ""
                                    })
                                }} id="multi-upload-delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-red-700 w-3 h-3"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                                    </svg>
                                </button>
                            </>) : null
                        }
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="inline-block rounded-sm bg-gray-600 hover:bg-gray-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Publicar
                    </button>
                </div>
            </form>

            <Modal
                isOpen={openExito}
                onRequestClose={() => setIsOpenExito(false)}
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
                <Exito setClose={setIsOpenExito} setNavegate={link}/>
            </Modal>
        </div>
    )
}

export default PostPost