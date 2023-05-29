import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Modal from "react-modal";
import AddSerie from "../modals/addSerie";
import { allAbility, crearCharcter } from "../../redux/actions/CharacterAction";
import { getSerie } from "../../redux/actions/SerieAction";
import AddAbility from "../modals/addAbility";

const PostCharacter = () => {


    const abilityAll = useSelector(state => state.ability)
    const allSerie = useSelector(state => state.series)
    const dispatch = useDispatch()

    const [openAddProduct, setIsOpenAddProduct] = useState(false);
    const [openAddAbility, setIsOpenAddAbility] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage] = useState("")
    const [multiImage, setMultiImage] = useState("")
    const [info, setInfo] = useState({
        name: "",
        description: "",
        age: null,
        height: null,
        weight: null,
        state: "",
        race: "",
        img: "",
        serieId: "",
        photos: [],
        ability: [],
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCharacter = {
            name: info.name,
            description: info.description,
            age: info.age,
            height: info.height,
            weight: info.weight,
            state: info.state,
            race: info.race,
            img: info.img,
            serieId: info.serieId,
            photos: info.photos,
            ability: info.ability,
        }
        dispatch(crearCharcter(newCharacter))
        setIsOpenAddProduct(true);
        setInfo({
            name: "",
            description: "",
            age: "",
            height: "",
            weight: "",
            state: "",
            race: "",
            img: "",
            serieId: "",
            photos: [],
            ability: [],
        })
    }


    const uploadImage = async (e) => {
        try {

            const files = e.target.files[0];
            setImage(files.name);
            const data = new FormData();
            data.append("file", files);
            data.append("upload_preset", "cgdjowgz");
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

    const handleInputChange = async (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        })
    }

    const handleSelect = (e) => {
        console.log(e);
        setInfo({
            ...info,
            serieId: e
        })

    }

    useEffect(() => {
        dispatch(allAbility())
        dispatch(getSerie())
    }, [dispatch]);

    console.log(info);
    console.log(abilityAll)

    return (
        <div className="mx-auto bg-gray-100 w-full h-screen px-4 py-10 sm:px-6 lg:px-8">

            <form action="" onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-[45rem] space-y-4">
                <div className=" flex flex-row space-x-2">

                    <div className=" w-full">
                        <label htmlFor="name" className="sr-only">Nombre del Personaje</label>

                        <div className="relative">
                            <input
                                value={info.name}
                                onChange={handleInputChange}
                                type="text"
                                name="name"
                                id="name"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Nombre del Personaje"
                            />
                        </div>
                    </div>

                    <div className=" w-full">
                        <label htmlFor="author" className="sr-only">Edad</label>

                        <div className="relative">
                            <input
                                value={info.age}
                                onChange={handleInputChange}
                                type="number"
                                name="age"
                                id="age"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="age"
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
                        <label htmlFor="demography" className="sr-only">Altura</label>

                        <div className="relative">
                            <input
                                value={info.height}
                                onChange={handleInputChange}
                                type="number"
                                name="height"
                                id="height"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Altura"
                            />
                        </div>
                    </div>

                    <div className=" w-full">
                        <label htmlFor="country" className="sr-only">Peso</label>

                        <div className="relative">
                            <input
                                value={info.weight}
                                onChange={handleInputChange}
                                type="number"
                                name="weight"
                                id="weight"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Peso"
                            />
                        </div>
                    </div>
                </div>

                <div className=" flex flex-row space-x-2">

                    <div className=" w-full">
                        <label htmlFor="demography" className="sr-only">Estado</label>

                        <div className="relative">
                            <input
                                value={info.state}
                                onChange={handleInputChange}
                                type="text"
                                name="state"
                                id="state"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Estado"
                            />
                        </div>
                    </div>

                    <div className=" w-full">
                        <label htmlFor="country" className="sr-only">Especie</label>

                        <div className="relative">
                            <input
                                value={info.race}
                                onChange={handleInputChange}
                                type="text"
                                name="race"
                                id="race"
                                className="w-full rounded-sm border-gray-800 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Especie"
                            />
                        </div>
                    </div>
                </div>


                <div className="relative selct">
                    <div className="bg-white flex border cursor-pointer border-gray-200 rounded items-center">
                        {
                            allSerie.map((serie) => (
                                info.serieId.includes(serie.id) ? (
                                    <div key={serie.id} className="w-full flex flex-row ">
                                        <div onClick={() => {
                                            setInfo({
                                                ...info,
                                                serieId: ""
                                            })
                                        }} className="p-1 m-2 rounded-sm flex flex-row opacity-60 bg-gray-200 hover:bg-[#da2121]">
                                            <span className=" appearance-none outline-none opacity-75 text-gray-900 " >{serie.name}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <span key={serie.id} className="p-4 appearance-none outline-none text-gray-700 w-full" > Selccionar un Genero</span>
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
                            <div className="absolute  h-[200px] overflow-y-scroll scroll-smooth selector rounded shadow bg-white overflow-hidden hidden peer-checked:flex z-10 flex-col w-full mt-1 border border-gray-200">
                                {
                                    allSerie.map(event => (
                                        info.serieId.includes(event.name) ? null :
                                            <div key={event.id} className="cursor-pointer  w-full group">
                                                <button className="block p-2 w-full text-left border-transparent border-l-4 group-hover:border-[#8549ba] group-hover:bg-gray-100" type="button" onClick={() => handleSelect(event.id)}  >
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
                    <label htmlFor="upload-img"
                        className=" w-auto inline-flex items-center px-4 py-2 bg-gray-600 border border-gray-600 rounded-l font-semibold cursor-pointer text-sm text-white tracking-widest hover:bg-gray-500 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition ">
                        Selccionar imagen
                    </label>
                    <input id="upload-img" name="file" type="file" onChange={uploadImage} className="hidden" />
                    <div className="w-full max-w-[34rem] border border-gray-300 rounded-r-md flex items-center justify-between">
                        {
                            info.img ? (<>
                                <span className="p-2">{image}</span>
                                <button type="button" onClick={() => {
                                    setImage("")
                                    setInfo({
                                        ...info,
                                        img: ""
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
                <div>
                    {
                        info.ability.map(e => (
                            <div key={e}>
                                {e}
                            </div>
                        ))
                    }
                </div>
                <button type="button" onClick={() => setIsOpenAddAbility(true)} className=" w-full justify-center flex flex-row items-center">
                    Agregar Habilidad
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path fill="currentColor" d="M2.47 3.28a.75.75 0 0 1 1.06-1.06l3.25 3.25a.75.75 0 0 1 0 1.06L3.53 9.78a.75.75 0 0 1-1.06-1.06L5.19 6L2.47 3.28ZM9.75 10a.75.75 0 0 0 .75-.75v-6.5a.75.75 0 0 0-1.5 0v6.5c0 .414.336.75.75.75Z" /></svg>
                </button>
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
            <Modal
                isOpen={openAddAbility}
                onRequestClose={() => setIsOpenAddAbility(false)}
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
                <AddAbility abilityAll={abilityAll} setIsOpenAddAbility={setIsOpenAddAbility} info={info} setInfo={setInfo} name={name} setName={setName} description={description} setDescription={setDescription} />
            </Modal>
        </div>
    )
}

export default PostCharacter