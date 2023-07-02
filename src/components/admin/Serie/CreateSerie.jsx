import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { createSerie, getGender } from "../../../redux/actions/SerieAction";
import axios from "axios";
import Exito from "./Views/Exito";
Modal.setAppElement("#root");

const CreateSerie = ({ usuario }) => {
  // Para controlar los errores y el mesaje de exito
  const [error, setError] = useState("");
  const [toastError, setToastError] = useState(false);
  const [success, setSuccess] = useState("");
  const [toastSuccess, setToastSuccess] = useState(false);

  // Esta variable utiliza el hook useSelector de Redux para acceder al
  // estado global de la aplicación y obtener la lista de géneros disponibles.
  // Guarda el resultado de la selección en la variable allGender. Se espera que el
  // estado de Redux tenga una propiedad llamada gender que contenga la lista de géneros.

  const allGender = useSelector(state => state.gender);

  // Esta variable utiliza el hook useDispatch de Redux para acceder a la función
  // dispatch y enviar acciones al store de Redux. Guarda la función dispatch en la variable dispatch.

  const dispatch = useDispatch();

  // Esta variable guarda el estado de una lista (Array) que representa las secciones en
  // alguna parte del código. Inicialmente, el estado se inicializa como un arreglo vacío.

  const [seccion, setSeccion] = useState([]);

  // Esta variable guarda el estado de un valor booleano (true o false) que indica si la
  // opción de agregar un producto está abierta o no. Inicialmente, el estado se inicializa
  // como false, lo que indica que la opción de agregar un producto no está abierta.

  const [openAddProduct, setIsOpenAddProduct] = useState(false);

  // Esta variable guarda el estado de un objeto que contiene información relacionada con
  // algún formulario o sección del código.

  const [info, setInfo] = useState({
    name: "",
    description: "",
    author: "",
    img: "",
    portada: "",
    fondo: "",
    gender: "",
  });

  // Esta variable guarda el estado de una lista (Array) que representa una lista de animes en
  // alguna parte del código. Inicialmente, el estado se inicializa como un arreglo vacío.

  const [animes, setAnime] = useState([]);

  //Esta función se encarga de agregar un nuevo episodio a un anime específico en la lista de animes.

  const handleAddEpisodeToAnime = animeIndex => {
    const updatedAnimes = [...animes];
    const updatedEpisodes = [...updatedAnimes[animeIndex].episodes];
    updatedEpisodes.push({ number: "", date: "", title: "", type: "" });
    updatedAnimes[animeIndex].episodes = updatedEpisodes;
    setAnime(updatedAnimes);
  };

  // Esta función se encarga de agregar un nuevo elemento a la lista
  // seccion y un nuevo objeto anime a la lista animes.

  const handleAddInput = () => {
    setSeccion([...seccion, ""]);
    setAnime([
      ...animes,
      {
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        image: "",
        type: "",
        episodes: [],
      },
    ]);
  };

  // Esta función se encarga de manejar el cambio de valor en los campos de
  // entrada de información (input) del formulario. Actualiza el estado info agregando o
  // modificando el valor del campo específico que se ha cambiado.

  const handleInfoChange = async e => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  // Esta función se encarga de manejar el cambio de valor en un campo de entrada específico (input) del formulario.
  // Actualiza el estado info agregando o modificando el valor del campo description. Además,
  // ajusta la altura del campo de entrada según su contenido.

  const handleInputChange = event => {
    setInfo({
      ...info,
      description: event.target.value,
    });
    adjustHeight(event.target);
  };

  /**
   * Ajusta la altura de un elemento para adaptarse a su contenido.
   * @param {HTMLElement} element - El elemento HTML cuya altura se ajustará.
   */

  const adjustHeight = element => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  /**
   * Maneja la selección de opciones en un elemento select.
   * @param {Event} e - El evento de selección.
   */

  const handleInSelect = e => {
    console.log(e);
    if (!info.gender.includes(e)) {
      setInfo({
        ...info,
        gender: [...info.gender, e],
      });
    } else {
      alert("Please select");
    }
  };

  /**
   * Carga una imagen de fondo en la nube utilizando Cloudinary.
   * @param {Event} e - El evento de cambio de archivo.
   */

  const uploadFondo = async e => {
    try {
      const files = e.target.files[0];
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "cgdjowgz");
      await axios
        .post("https://api.cloudinary.com/v1_1/dwffcpljq/image/upload", data)
        .then(ress => {
          setInfo({
            ...info,
            [e.target.name]: ress.data.secure_url,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Maneja los cambios en los campos de los animes en el estado.
   * @param {number} index - El índice del anime en el estado animes.
   * @param {string} value - El nuevo valor del campo.
   * @param {string} fieldName - El nombre del campo que se está actualizando.
   */

  const handleAnimesChange = (index, value, fieldName) => {
    const updatedAnimes = [...animes];
    updatedAnimes[index][fieldName] = value;
    setAnime(updatedAnimes);
  };

  /**
   * Maneja los cambios en la descripción de un anime en el estado `animes`.
   * @param {number} index - El índice del anime en el estado `animes`.
   * @param {string} value - El nuevo valor de la descripción.
   * @param {string} fieldName - El nombre del campo que se está actualizando.
   * @param {HTMLElement} target - El elemento HTML asociado al campo de descripción.
   */

  const handleAnimeDescriptionChange = (index, value, fieldName, terget) => {
    const updatedAnimes = [...animes];
    updatedAnimes[index][fieldName] = value;
    setAnime(updatedAnimes);
    adjusAnimeDescriptiontHeight(terget);
  };

  /**
   * Ajusta la altura del elemento para que se ajuste automáticamente al contenido de la descripción del anime.
   * @param {HTMLElement} element - El elemento HTML asociado al campo de descripción.
   */

  const adjusAnimeDescriptiontHeight = element => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  /**
   * Carga una imagen mediante la API de Cloudinary y actualiza el estado `animes` con la URL segura de la imagen cargada.
   * @param {number} index - El índice del anime en el estado `animes`.
   * @param {Event} e - El evento de cambio de archivo.
   */

  const uploadImages = async (index, e) => {
    try {
      const files = e.target.files[0];
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "cgdjowgz");
      await axios
        .post("https://api.cloudinary.com/v1_1/dwffcpljq/image/upload", data)
        .then(ress => {
          const updatedAnimes = [...animes];
          updatedAnimes[index]["image"] = ress.data.secure_url;
          setAnime(updatedAnimes);
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Maneja los cambios en los campos de los episodios de un anime en el estado `animes`.
   * @param {number} index - El índice del anime en el estado `animes`.
   * @param {number} i - El índice del episodio en el arreglo de episodios del anime.
   * @param {string} value - El nuevo valor del campo.
   * @param {string} fieldName - El nombre del campo que se está actualizando.
   */

  const handleEpisodesChange = (index, i, value, fieldName) => {
    const updatedAnimes = [...animes];
    updatedAnimes[index].episodes[i][fieldName] = value;
    setAnime(updatedAnimes);
  };

  /**
   * Maneja el envío del formulario.
   * @param {Event} e - El evento de envío del formulario.
   */

  const handleSubmit = e => {
    e.preventDefault();
    if (!usuario && !usuario.userName) {
      setError("No se ha encontrado un administrador");
      setToastError(true);
    }
    if (!info.name) {
      setError("Por favor llene los campos");
      setToastError(true);
    }
    if (!info.description) {
      setError("Por favor llene los campos");
      setToastError(true);
    }
    if (!info.author) {
      setError("Por favor llene los campos");
      setToastError(true);
    }
    if (!info.img) {
      setError("Por favor seleccione las imagenes");
      setToastError(true);
    }
    if (!info.portada) {
      setError("Por favor seleccione las imagenes");
      setToastError(true);
    }
    if (!info.fondo) {
      setError("Por favor seleccione las imagenes");
      setToastError(true);
    }
    if (!info.gender.length > 0) {
      setError("Por favor llene los campos");
      setToastError(true);
    } else {
      const newSerie = {
        userName: usuario.userName || "",
        name: info.name || "",
        description: info.description || "",
        author: info.author || "",
        portada: info.portada || "",
        fondo: info.fondo || "",
        img: info.img || "",
        gender: info.gender || "",
        animes: animes || [],
      };

      dispatch(createSerie(newSerie));
      setInfo({
        name: "",
        description: "",
        author: "",
        img: "",
        portada: "",
        fondo: "",
        gender: "",
      });
      setSeccion([]);
      setAnime([]);
      setIsOpenAddProduct(true);
      setError("");
      setToastError(false);
      setSuccess("Los dataos fueron guardados");
      setToastSuccess(true);
    }
  };

  // La variable link contiene la URL a la que se redirigirá después de realizar el envío del formulario.

  const link = "/series-list";

  /**
   * Realiza una acción cuando se monta o actualiza el componente.
   */

  useEffect(() => {
    dispatch(getGender());
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full h-full bg-white  flex flex-col justify-center"
    >
      <div className=" bg-gray-800 w-full h-full">
        <div className="h-[342px] flex justify-center items-center w-full relative overflow-hidden z-[1] m-0 rounded-b-[5px]">
          {info.fondo ? (
            <img
              className="w-full h-full z-[-1] overflow-hidden absolute left-0 top-0"
              src={info.fondo}
              alt=""
            />
          ) : (
            <img
              className="w-full h-full z-[-1] overflow-hidden absolute left-0 top-0"
              src="https://www.xtrafondos.com/descargar.php?id=7935&resolucion=3840x2400"
              alt=""
            />
          )}

          <input
            type="file"
            name="fondo"
            id="file-upload"
            className="hidden"
            onChange={uploadFondo}
          />
          <label
            htmlFor="file-upload"
            className=" flex justify-center cursor-pointer items-center absolute top-2 right-2 z-20 text-4xl w-10 h-10 rounded-full font-semibold leading-tight overflow-hidden bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M13.44 2.56a1.914 1.914 0 0 0-2.707 0L3.338 9.956a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633l2.743-.915c.243-.08.463-.217.644-.398l7.395-7.394a1.914 1.914 0 0 0 0-2.707Zm-2 .708a.914.914 0 1 1 1.293 1.293L12 5.294l-1.293-1.293l.734-.733ZM10 4.708l1.292 1.293l-5.954 5.954a.648.648 0 0 1-.253.157l-1.794.598l.598-1.794a.649.649 0 0 1 .156-.254L10 4.709Z"
              />
            </svg>
          </label>
          <input
            type="file"
            name="img"
            id="file-img"
            className="hidden"
            onChange={uploadFondo}
          />
          {info.img ? (
            <div className="flex justify-center items-center absolute top-2 left-2 z-20 text-4xl w-32 h-32 overflow-hidden">
              <img src={info.img} alt="" />
              <label
                htmlFor="file-img"
                className=" flex justify-center cursor-pointer items-center absolute top-2 right-0 z-20 text-4xl w-7 h-7 rounded-full font-semibold leading-tight overflow-hidden bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M13.44 2.56a1.914 1.914 0 0 0-2.707 0L3.338 9.956a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633l2.743-.915c.243-.08.463-.217.644-.398l7.395-7.394a1.914 1.914 0 0 0 0-2.707Zm-2 .708a.914.914 0 1 1 1.293 1.293L12 5.294l-1.293-1.293l.734-.733ZM10 4.708l1.292 1.293l-5.954 5.954a.648.648 0 0 1-.253.157l-1.794.598l.598-1.794a.649.649 0 0 1 .156-.254L10 4.709Z"
                  />
                </svg>
              </label>
            </div>
          ) : (
            <label
              htmlFor="file-img"
              className=" cursor-pointer flex justify-center items-center absolute top-2 left-2 z-20 text-4xl w-28 h-28 border-2 border-black rounded-full font-semibold leading-tight overflow-hidden bg-[url('https://www.xtrafondos.com/descargar.php?id=7935&resolucion=3840x2400')]"
            >
              <svg
                className="mx-auto h-12 w-12 text-black"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
          )}
        </div>
        <div className=" w-full flex flex-row justify-center items-center p-10">
          <div className="grow relative w-auto mx-auto my-0">
            <div className="ml-[-0.75rem] mr-[-0.75rem] mt-[-0.75rem] flex">
              <div className="flex-none w-[8.33333337%]"></div>
              <div className="flex flex-col w-[20%] px-2">
                <input
                  type="file"
                  name="portada"
                  id="file-portada"
                  className="hidden"
                  onChange={uploadFondo}
                />
                {info.portada ? (
                  <div className=" flex w-full justify-center items-center h-[18rem] border-2 border-gray-800 rounded-[5px] relative">
                    <img className=" w-full h-full" src={info.portada} alt="" />
                    <label
                      htmlFor="file-upload"
                      className=" flex justify-center cursor-pointer items-center absolute top-2 right-2 z-20 text-4xl w-10 h-10 rounded-full font-semibold leading-tight overflow-hidden bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="M13.44 2.56a1.914 1.914 0 0 0-2.707 0L3.338 9.956a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633l2.743-.915c.243-.08.463-.217.644-.398l7.395-7.394a1.914 1.914 0 0 0 0-2.707Zm-2 .708a.914.914 0 1 1 1.293 1.293L12 5.294l-1.293-1.293l.734-.733ZM10 4.708l1.292 1.293l-5.954 5.954a.648.648 0 0 1-.253.157l-1.794.598l.598-1.794a.649.649 0 0 1 .156-.254L10 4.709Z"
                        />
                      </svg>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="file-portada"
                    className=" flex w-full cursor-pointer justify-center items-center h-[18rem] border-2 border-gray-800 rounded-[5px] bg-[url('https://www.xtrafondos.com/descargar.php?id=7935&resolucion=3840x2400')]"
                  >
                    <svg
                      className="mx-auto h-12 w-12 text-black"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                )}

                <div className="flex flex-row justify-center mt-5 items-center space-x-1">
                  <h1 className=" text-white font-semibold text-xl">Autor: </h1>
                  <div className=" text-white">
                    <div className="input w-full">
                      <input
                        value={info.author}
                        onChange={handleInfoChange}
                        type="text"
                        name="author"
                        id="author"
                        className="input_field overflow-hidden w-full"
                        placeholder="Autor"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="block basis-0 grow shrink p-3">
                <div className=" flex items-center text-white space-x-5">
                  <div className="input w-full">
                    <input
                      value={info.name}
                      onChange={handleInfoChange}
                      type="text"
                      name="name"
                      id="name"
                      className="input_field w-full"
                      placeholder="Nombre del anime"
                      required
                    />
                  </div>
                </div>
                <div className=" text-white w-full flex flex-row items-center mt-5  ">
                  <div className=" flex flex-row">
                    {info.gender &&
                      info.gender.map((event, index) => (
                        <div
                          onClick={() => {
                            setInfo({
                              ...info,
                              gender: info.gender.filter(e => e !== event),
                            });
                          }}
                          key={index}
                          href="#"
                          className="bg-[rgba(1,188,242,0.1)] w-auto text-center text-[#01bcf2] leading-[25px] px-3 py-1 text-[10px] font-bold hover:bg-[#da2121] hover:text-red-400 cursor-pointer mr-2.5 rounded-[20px]"
                        >
                          {event}
                        </div>
                      ))}
                  </div>
                  <div className="relative selct input  ">
                    <div className=" flex border input_field cursor-pointer items-center">
                      <label
                        htmlFor="show_more"
                        className="cursor-pointer justify-between items-center flex flex-row outline-none focus:outline-none transition-all text-gray-400 hover:text-gray-600"
                      >
                        <h2>Seleccionar un genero</h2>
                        <svg
                          className="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </label>
                    </div>
                    <div className="absolute h-[200px] overflow-y-scroll scroll-smooth selector rounded shadow bg-gray-800 overflow-hidden hidden peer-checked:flex z-10 flex-col w-full border border-gray-200">
                      {allGender.map(event =>
                        info.gender.includes(event.name) ? null : (
                          <div
                            key={event.id}
                            className="cursor-pointer  w-full group"
                          >
                            <button
                              className="block p-2 w-full text-left border-transparent border-l-4 group-hover:bg-gray-900"
                              type="button"
                              onClick={() => handleInSelect(event.name)}
                            >
                              {event.name}
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className=" text-white flex mt-5  justify-center items-center flex-row space-x-5">
                  <div className="input w-full">
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Descripción"
                      value={info.description}
                      onChange={handleInputChange}
                      className="input_field overflow-hidden"
                      rows={1}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white rounded-b-[5px] flex flex-col items-center justify-center w-full h-full">
        {seccion &&
          seccion.map((event, index) => (
            <div className=" m-4">
              <div
                key={index}
                className="sm:mb-10 flex flex-row justify-center bg-white"
              >
                <div className=" px-10 py-10 max-w-md m-auto lg:col-span-2 mt-20 mb-20 shadow-xl rounded-xl lg:mt-10 md:shadow-xl md:rounded-xl lg:shadow-none lg:rounded-none lg:w-full lg:mb-10 lg:px-5 lg:pt-5 lg:pb-5 lg:max-w-lg bg-white">
                  <div className="input ">
                    <input
                      value={animes[index].name}
                      name="name"
                      onChange={e =>
                        handleAnimesChange(index, e.target.value, e.target.name)
                      }
                      type="text"
                      className="input_field"
                      required
                      placeholder="Nombre de la serie"
                    />
                  </div>
                  <div className="flex text-black flex-row text-center mt-4 justify-center items-center">
                    <div className="input w-full">
                      <input
                        value={animes[index].start_date}
                        name="start_date"
                        onChange={e =>
                          handleAnimesChange(
                            index,
                            e.target.value,
                            e.target.name
                          )
                        }
                        type="number"
                        className="input_field"
                        required
                        placeholder="Fecha de inicio"
                      />
                    </div>{" "}
                    _{" "}
                    <div className="input w-full">
                      <input
                        value={animes[index].end_date}
                        onChange={e =>
                          handleAnimesChange(
                            index,
                            e.target.value,
                            e.target.name
                          )
                        }
                        name="end_date"
                        type="text"
                        className="input_field"
                        required
                        placeholder="Fecha de fin"
                      />
                    </div>
                  </div>
                  <div className="input mt-4 ">
                    <textarea
                      name="description"
                      value={animes[index].description}
                      onChange={e =>
                        handleAnimeDescriptionChange(
                          index,
                          e.target.value,
                          e.target.name,
                          e.target
                        )
                      }
                      className="input_field overflow-hidden"
                      rows={1}
                      placeholder="Descripcion de la serie"
                    ></textarea>
                  </div>
                  <div className="input mt-4">
                    <select
                      value={animes[index].type}
                      onChange={e =>
                        handleAnimesChange(index, e.target.value, e.target.name)
                      }
                      name="type"
                      className="input_field mt-4 "
                      required
                    >
                      <option disabled>Selecciona un tipo</option>
                      <option value="Serie">Serie</option>
                      <option value="Pelicula">Pelicula</option>
                      <option value="Ova">Ova</option>
                    </select>
                  </div>
                </div>

                <div className="hidden w-[20rem] relative lg:block  lg:col-span-3">
                  {animes[index].image ? (
                    <img
                      className="absolute rounded-[5px] inset-0 w-full h-full object-cover object-center"
                      src={animes[index].image}
                      alt="Ad- woman on a beach"
                    />
                  ) : (
                    <img
                      className="absolute rounded-[5px] inset-0 w-full h-full object-cover object-center"
                      src="https://www.xtrafondos.com/descargar.php?id=7935&resolucion=3840x2400"
                      alt="Ad- woman on a beach"
                    />
                  )}
                  <input
                    type="file"
                    name="image"
                    id={`imagen${index}`}
                    className="hidden"
                    onChange={e => uploadImages(index, e)}
                  />
                  <label
                    htmlFor={`imagen${index}`}
                    className=" flex justify-center items-center absolute top-2 right-2 cursor-pointer text-4xl w-10 h-10 rounded-full font-semibold leading-tight overflow-hidden bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M13.44 2.56a1.914 1.914 0 0 0-2.707 0L3.338 9.956a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633l2.743-.915c.243-.08.463-.217.644-.398l7.395-7.394a1.914 1.914 0 0 0 0-2.707Zm-2 .708a.914.914 0 1 1 1.293 1.293L12 5.294l-1.293-1.293l.734-.733ZM10 4.708l1.292 1.293l-5.954 5.954a.648.648 0 0 1-.253.157l-1.794.598l.598-1.794a.649.649 0 0 1 .156-.254L10 4.709Z"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              {animes[index] ? (
                <div>
                  <div className="relative mb-[15px] ">
                    <div className=" flex flex-row items-center space-x-3 text-[#3b4248]">
                      <h2 className="text-xl font-bold leading-[30px] tracking-[-1px]">
                        Lista de episodios
                      </h2>
                      <div className="body_Drox">
                        <a
                          href=""
                          className="flex flex-row justify-center items-center"
                        >
                          <svg
                            className=" mt-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill="currentColor"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z"
                            />
                          </svg>
                        </a>
                        <div className="drox basis-auto shrink-0 p-3">
                          <p className="text-justify m-2 p-0 text-[#363636]">
                            Si tienes dudas acerca de los diferentes tipos de
                            episodios que mostramos en los listados puedes
                            apoyarte en la siguiente tabla:
                          </p>
                          <table className="mt-5 bg-white text-[#363636] m-2 border-spacing-0 border-collapse">
                            <tbody className="bg-transparent table-row-group align-middle border-inherit">
                              <tr className="table-row border-inherit">
                                <td className="align-top px-[0.75em] py-[0.5em] border-[solid] text-right">
                                  <span className="text-black bg-neutral-100 text-[rgba(0,0,0,0.7)] items-center rounded font-semibold inline-flex text-xs h-[2em] justify-center leading-normal whitespace-nowrap px-[0.75em]">
                                    CANON
                                  </span>
                                </td>{" "}
                                <td className="align-top px-[0.75em] py-[0.5em] border-[solid] text-left">
                                  Episodios completamente fieles al manga. Es
                                  obligatorio su visionado.
                                </td>
                              </tr>{" "}
                              <tr>
                                <td className="align-top px-[0.75em] py-[0.5em] text-right border-[solid]">
                                  <span className="text-black bg-amber-200 text-[rgba(0,0,0,0.7)] items-center rounded font-semibold inline-flex text-xs h-[2em] justify-center leading-normal whitespace-nowrap px-[0.75em]">
                                    MIXTO
                                  </span>
                                </td>{" "}
                                <td className="align-top px-[0.75em] py-[0.5em] border-[solid] text-left">
                                  Episodios que mezclan contenido basado en el
                                  manga con partes de relleno. Recomendamos
                                  verlos.
                                </td>
                              </tr>{" "}
                              <tr>
                                <td className="align-top px-[0.75em] py-[0.5em] text-right border-[solid]">
                                  <span className="text-black bg-yellow-500 text-[rgba(0,0,0,0.7)] items-center rounded font-semibold inline-flex text-xs h-[2em] justify-center leading-normal whitespace-nowrap px-[0.75em]">
                                    RELLENO
                                  </span>
                                </td>{" "}
                                <td className="align-top px-[0.75em] py-[0.5em] border-[solid] text-left">
                                  Episodios que no están adaptados del manga.
                                  Son los episodios a evitar.
                                </td>
                              </tr>{" "}
                              <tr>
                                <td className="align-top px-[0.75em] py-[0.5em] text-right border-[solid]">
                                  <span className="text-black bg-gray-700 text-[rgba(0,0,0,0.7)] items-center rounded font-semibold inline-flex text-xs h-[2em] justify-center leading-normal whitespace-nowrap px-[0.75em]">
                                    ANIME CANON
                                  </span>
                                </td>{" "}
                                <td className="align-top px-[0.75em] py-[0.5em] border-[solid] text-left">
                                  Episodios que no están adaptados del manga,
                                  pero que cuentan una historia que avanza la
                                  trama principal. Recomendamos verlos.
                                </td>
                              </tr>{" "}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-0 -top-0">
                      <input
                        type="text"
                        id="eSearch"
                        className=" float-right block w-full h-[34px] text-sm leading-[1.42857143] text-[#555] bg-white bg-none border rounded shadow-[inset_0_1px_1px_rgba(0,0,0,0.075)] px-3 py-1.5 border-solid border-[#ccc]"
                        placeholder="Buscar"
                        value=""
                      />
                    </div>
                  </div>
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                          #
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Titulo
                        </th>

                        <th className="px-6 py-3 text-center border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-center border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                          Tipo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {animes &&
                        animes[index].episodes.map((event, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-500">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm leading-5 text-gray-800">
                                    <div className="input">
                                      <input
                                        value={animes[index].episodes[i].number}
                                        onChange={e =>
                                          handleEpisodesChange(
                                            index,
                                            i,
                                            e.target.value,
                                            e.target.name
                                          )
                                        }
                                        name="number"
                                        type="number"
                                        className="input_field"
                                        required
                                        placeholder="Episodeo"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-500">
                              <div className="text-sm leading-5 text-blue-900">
                                <div className="input">
                                  <input
                                    value={animes[index].episodes[i].title}
                                    onChange={e =>
                                      handleEpisodesChange(
                                        index,
                                        i,
                                        e.target.value,
                                        e.target.name
                                      )
                                    }
                                    name="title"
                                    type="text"
                                    className="input_field"
                                    required
                                    placeholder="Titulo"
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                              <div className="input">
                                <input
                                  value={animes[index].episodes[i].date}
                                  onChange={e =>
                                    handleEpisodesChange(
                                      index,
                                      i,
                                      e.target.value,
                                      e.target.name
                                    )
                                  }
                                  name="date"
                                  type="date"
                                  className="input_field"
                                  required
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                              <div className="input">
                                <select
                                  value={animes[index].episodes[i].type}
                                  onChange={e =>
                                    handleEpisodesChange(
                                      index,
                                      i,
                                      e.target.value,
                                      e.target.name
                                    )
                                  }
                                  name="type"
                                  className="input_field"
                                  required
                                >
                                  <option value="" disabled>
                                    Selecciona una opción
                                  </option>
                                  <option value="Canon">Canon</option>
                                  <option value="Mixto">Mixto</option>
                                  <option value="Relleno">Relleno</option>
                                  <option value="Aanime Canon">
                                    Aanime Canon
                                  </option>
                                </select>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className=" w-full flex justify-center items-center">
                    <button
                      onClick={() => handleAddEpisodeToAnime(index)}
                      type="button"
                      className="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800"
                    >
                      Nuevo Episodeo
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        <button
          type="button"
          onClick={handleAddInput}
          className=" bg-gray-200 text-center p-2 border-2 text-blue-600 font-semibold hover:bg-blue-200 border-blue-500 rounded-3xl"
        >
          Agregar serie
        </button>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="inline-block rounded-3xl bg-[#8549ba] hover:bg-[#6e3d99] px-5 py-3 text-sm font-medium text-white"
        >
          Crear
        </button>
      </div>
      {toastError ? (
        <div className="fixed z-30 text-[color:var(--toast-white)] flex items-start leading-[1.6] text-sm bg-[#c52929] mb-[1em] p-[15px] rounded-[3px] left-0.5 bottom-0.5">
          <div className="w-[22px] h-[22px] flex items-center justify-center bg-[rgba(255,255,255,0.2)] mr-2.5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <g transform="translate(.077 .077)">
                <g>
                  <path
                    fill="#fff"
                    d="M10.915 9.98l2.853-2.846a.666.666 0 00-.942-.942L9.979 9.044 7.133 6.191a.666.666 0 00-.942.942L9.044 9.98 6.19 12.826a.666.666 0 10.942.942l2.846-2.853 2.846 2.853a.666.666 0 10.942-.942z"
                    transform="translate(-2.017 -2.018)"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="flex-1">
            <p className="m-0 p-0">{error}</p>
          </div>
          <div
            onClick={() => {
              setError("");
              setToastError(false);
            }}
            type="button"
            className="w-[22px] h-[22px] flex items-center justify-center bg-[rgba(255,255,255,0)] transition-all duration-100 ease-[ease-in-out] cursor-pointer ml-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <g transform="translate(.077 .077)">
                <g>
                  <path
                    fill="#fff"
                    d="M10.915 9.98l2.853-2.846a.666.666 0 00-.942-.942L9.979 9.044 7.133 6.191a.666.666 0 00-.942.942L9.044 9.98 6.19 12.826a.666.666 0 10.942.942l2.846-2.853 2.846 2.853a.666.666 0 10.942-.942z"
                    transform="translate(-2.017 -2.018)"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      ) : null}
      {toastSuccess ? (
        <div className="fixed z-30 text-[color:var(--toast-white)] flex items-start leading-[1.6] text-sm bg-[#27d0b2] mb-[1em] p-[15px] rounded-[3px] left-0.5 bottom-0.5">
          <div className="w-[22px] h-[22px] flex items-center justify-center bg-[rgba(255,255,255,0.2)] mr-2.5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <g transform="translate(.077 .077)">
                <g>
                  <path
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3.719 7.884L6.235 10.4l3.032-3.032 2.774-2.774"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="flex-1">
            <p className="m-0 p-0">{success}</p>
          </div>
          <div
            onClick={() => {
              setSuccess("");
              setToastSuccess(false);
            }}
            type="button"
            className="w-[22px] h-[22px] flex items-center justify-center bg-[rgba(255,255,255,0)] transition-all duration-100 ease-[ease-in-out] cursor-pointer ml-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <g transform="translate(.077 .077)">
                <g>
                  <path
                    fill="#fff"
                    d="M10.915 9.98l2.853-2.846a.666.666 0 00-.942-.942L9.979 9.044 7.133 6.191a.666.666 0 00-.942.942L9.044 9.98 6.19 12.826a.666.666 0 10.942.942l2.846-2.853 2.846 2.853a.666.666 0 10.942-.942z"
                    transform="translate(-2.017 -2.018)"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      ) : null}
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
        <Exito setClose={setIsOpenAddProduct} setNavegate={link} />
      </Modal>
    </form>
  );
};
export default CreateSerie;
