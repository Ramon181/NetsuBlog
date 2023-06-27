import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSerie } from "../../redux/actions/SerieAction";
import { getPost } from "../../redux/actions/PostAction";

const Blog = () => {
  const allSerie = useSelector(state => state.series);
  const getAllPost = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getSerie());
    dispatch(getPost());
  }, [dispatch]);

  return (
    <main className=" bg-gray-50">
      <div className="block md:flex md:space-x-2 px-2 lg:p-0">
        <Link
          to={`/blog/post/${getAllPost[0].id}`}
          className="mb-4 md:mb-0 w-full md:w-2/3 relative rounded-sm inline-block h-[24rem]"
          href=""
        >
          <div className="absolute left-0 bottom-0 w-full h-full z-10 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.7))]"></div>
          <img
            src={getAllPost[0].img}
            className="absolute left-0 top-0 w-full h-full rounded-sm z-0 object-cover"
          />
          <div className="p-4 absolute bottom-0 left-0 z-20">
            <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
              {getAllPost[0].series.name}
            </span>
            <h2 className="text-4xl w-7/12 font-semibold text-gray-100 leading-tight">
              {getAllPost[0].title}
            </h2>
          </div>
        </Link>

        <Link
          to={`/blog/post/${getAllPost[0].id}`}
          className="w-full md:w-1/3 relative rounded-sm h-[24em]"
          href="./blog.html"
        >
          <div className="absolute left-0 top-0 w-full h-full z-10 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.7))]"></div>
          <img
            src={getAllPost[0].img}
            className="absolute left-0 top-0 w-full h-full rounded-sm z-0 object-cover"
          />
          <div className="p-4 absolute bottom-0 left-0 z-20">
            <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
              {getAllPost[0].series.name}
            </span>
            <h2 className="text-3xl font-semibold text-gray-100 leading-tight">
              {getAllPost[0].title}
            </h2>
          </div>
        </Link>
      </div>

      {/* cartas */}
      <div className="block lg:flex lg:space-x-2 px-4 mt-10">
        <div className="w-full lg:w-2/3">
          {getAllPost.map(e => (
            <Link
              to={`/blog/post/${e.id}`}
              key={e.id}
              className="block rounded-sm w-full bg-white lg:flex mb-10"
            >
              <div
                className="h-48 lg:w-48 flex-none bg-cover text-center overflow-hidden opacity-75"
                title="deit is very important"
              >
                <img className=" w-full h-full" src={e.img} alt="" />
              </div>
              <div className=" px-4 pb-4 pt-2 flex flex-col justify-between leading-normal">
                <div>
                  <div className="mt-3 md:mt-0 text-gray-900 font-bold text-2xl mb-2">
                    {e.title}
                  </div>
                  <div className="flex items-center w-full justify-between min-w-0 max-w-[30rem]">
                    <p className="text-gray-900 text-base truncate">{e.description}</p>
                  </div>
                </div>
                <div className=" flex justify-end">
                  <Link
                    to={`/blog/post/${e.id}`}
                    className=" text-gray-900 font-semibold"
                  >
                    Ver Mas
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full lg:w-1/3 px-3">
          <div className="mb-4">
            <h5 className=" text-lg uppercase text-gray-900 font-semibold px-1 mb-2">
              {" "}
              Series Populares{" "}
            </h5>
            <ul>
              {allSerie.map(e => (
                <li
                  key={e.id}
                  className="px-1 py-4 border-b border-t font-semibold text-gray-900 hover:border-gray-200 transition duration-300"
                >
                  <a
                    href="#"
                    className="flex items-center text-gray-900 cursor-pointer"
                  >
                    <img
                      className="inline-block h-6 w-6 rounded-full bg-green-300 mr-3"
                      src={e.img}
                      alt=""
                    />
                    {e.name}
                    <span className="text-gray-900 font-semibold ml-auto">
                      {e.posts.length} articulos
                    </span>
                    <i className="text-gray-900 bx bx-right-arrow-alt ml-1"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
