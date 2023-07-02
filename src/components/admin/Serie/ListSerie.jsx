import { Link } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  deleteSerie,
  getSerie,
  resetSeries,
} from "../../../redux/actions/SerieAction";
import Delete from "./Views/Delete";
Modal.setAppElement("#root");

const ListSerie = ({ usuario }) => {
  const [elimina, setElimina] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [toastSuccess, setToastSuccess] = useState(false);

  const series = useSelector(state => state.series);
  const dispatch = useDispatch();

  const fetchSerie = () => {
    if (usuario && usuario.userName) {
      const userName = usuario.userName;
      dispatch(getSerie(userName));
      setIsLoading(false);
    }
  };

  const handleEliminarSerie = id => {
    dispatch(deleteSerie(usuario.userName, id));
    setIsLoading(true);
    fetchSerie();
    setSuccess("¡La eliminación se ha realizado correctamente!");
    setToastSuccess(true);
    setElimina(false);
  };

  console.log(series)
  useEffect(() => {
    setIsLoading(true);
    fetchSerie();
  }, []);

  return isLoading ? (
    <div class="flex items-center justify-center w-full h-full">
      <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <svg
          fill="none"
          class="w-6 h-6 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>

        <div>Loading ...</div>
      </div>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="sm:flex items-center bg-white justify-between px-2 py-1 mt-6 mb-4">
            <div className="flex items-center">
              <div>
                <Search />
              </div>
              <button data-testing="download" className="mx-2 ">
                <svg
                  className="text-gray-600 hover:text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6 20q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Zm6-4l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Z"
                  />
                </svg>
              </button>
              <button className="mx-2 ">
                <svg
                  className="text-gray-600 hover:text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M16 8V5H8v3H6V3h12v5h-2ZM4 10h16H4Zm14 2.5q.425 0 .713-.288T19 11.5q0-.425-.288-.713T18 10.5q-.425 0-.713.288T17 11.5q0 .425.288.713T18 12.5ZM16 19v-4H8v4h8Zm2 2H6v-4H2v-6q0-1.275.875-2.138T5 8h14q1.275 0 2.138.863T22 11v6h-4v4Zm2-6v-4q0-.425-.288-.713T19 10H5q-.425 0-.713.288T4 11v4h2v-2h12v2h2Z"
                  />
                </svg>
              </button>
              <button className="mx-2">
                <svg
                  className="text-gray-600 hover:text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 18h11v-2.675H9V18ZM4 8.675h3V6H4v2.675Zm0 4.675h3v-2.675H4v2.675ZM4 18h3v-2.675H4V18Zm5-4.65h11v-2.675H9v2.675Zm0-4.675h11V6H9v2.675ZM4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Z"
                  />
                </svg>
              </button>
              <button className="mx-2 ">
                <svg
                  className="text-gray-600 hover:text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </div>
            <Link
              to={"/series-list/post"}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-[#8549ba] hover:bg-[#6e3d99] focus:outline-none rounded-sm"
            >
              <p className="text-sm font-medium leading-none text-white">
                Add Task
              </p>
            </Link>
          </div>

          <div className="bg-white overflow-x-scroll scroll-smooth scrollbar shadow-md rounded ">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-3 text-left">Nombre</th>
                  <th className="py-3 px-3 text-left">Descripción</th>
                  <th className="py-3 px-3 text-left">Autor</th>
                  <th className="py-3 px-3 text-left">Genero</th>
                  <th className="py-3 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {series &&
                  series.map(event => (
                    <tr
                      key={event.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-3 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className=" w-6 h-6 rounded-full"
                              src={event.img}
                              alt=""
                            />
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
                        <div className="flex items-center w-full justify-between min-w-0 max-w-[10rem]">
                          {event.genders?.map(e => (
                            <span className="truncate" key={e.id}>
                              {e.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex item-center justify-center">
                          <Link to={`/series-list/post/${event.id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={() => setElimina(true)}
                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <Modal
                        isOpen={elimina}
                        onRequestClose={() => setElimina(false)}
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
                        <Delete
                          setClose={setElimina}
                          id={event.id}
                          handleEliminarSerie={handleEliminarSerie}
                        />
                      </Modal>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default ListSerie;
