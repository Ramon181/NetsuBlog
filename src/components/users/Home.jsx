import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getPost } from "../../redux/actions/PostAction";
import { getSerie } from "../../redux/actions/SerieAction";

const Home = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { id: 1, content: 'https://source.unsplash.com/1600x900/?beach' },
        { id: 2, content: 'https://source.unsplash.com/1600x900/?cat' },
        { id: 3, content: 'https://source.unsplash.com/1600x900/?dog' },
        { id: 4, content: 'https://source.unsplash.com/1600x900/?lego' },
        { id: 5, content: 'https://source.unsplash.com/1600x900/?textures&patterns' },
    ];

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };
    const allPost = useSelector(state => state.post);
    const gerAnime = useSelector(state => state.series);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost())
        dispatch(getSerie())
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }, 60000)
        return () => {
            clearInterval(interval)
        }
    }, [dispatch]);

    return (
        <section className="bg-gray-800 text-gray-100 space-y-8">
            <div className="slider">
                <img src={slides[currentSlide].content} alt="Image" className="relative inset-0 w-full h-[30rem]" />

                <button onClick={prevSlide}
                    className="absolute left-14 top-[60%] -translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-gray-100 hover:bg-gray-200">
                    <svg className=" w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7">
                        </path>
                    </svg>
                </button>
                <button onClick={nextSlide}
                    className="absolute right-14 top-[60%] -translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-gray-100 hover:bg-gray-200">
                    <svg className=" w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
            <div className=" w-full space-y-6 p-10">
                <div className="space-y-4 text-center flex items-center flex-col">
                    <h2 className="text-4xl font-bold">Bienvenido a mi blog de anime</h2>
                    <div className="bg-[#8549ba] w-40 h-1"></div>
                    <p className="font-serif text-lg text-gray-400">
                        En mi blog, me apasiona el mundo del anime y quiero compartir contigo todo lo relacionado con esta forma de entretenimiento. Aquí encontrarás una amplia variedad de contenido educativo y divertido diseñado específicamente para aquellos que desean profundizar en el fascinante universo del anime.
                        Mi objetivo principal es proporcionarte información valiosa sobre diferentes aspectos del anime, desde recomendaciones de series y películas destacadas, hasta análisis de personajes, tramas y géneros. Te brindo reseñas en profundidad para ayudarte a descubrir nuevos títulos y a comprender mejor los que ya conoces.
                    </p>
                </div>
                <div className="space-y-4 text-center flex items-center flex-col">
                    <h2 className="text-4xl font-bold">Últimas publicaciones</h2>
                    <div className="bg-[#8549ba] w-40 h-1"></div>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">

                        {
                            allPost.map((post) => (
                                <article key={post.id} className="flex flex-col rounded-sm bg-gray-900">
                                    <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                                        <img alt="" className="rounded-sm object-cover w-full h-52 bg-gray-500" src={post.articles[0].article} />
                                    </a>
                                    <div className="flex flex-col flex-1 text-left p-6">
                                        <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{post.title}</h3>
                                        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-400">
                                            <span>{post.serie.name}</span>
                                            <Link to={`/blog/post/${post.id}`} rel="noopener noreferrer" href="#" className="text-xs tracking-wider uppercase hover:underline dark:text-violet-400">Ver mas</Link>
                                            {/* <span>2.1K views</span> */}
                                        </div>
                                    </div>
                                </article>
                            ))
                        }
                    </div>
                </div>
                <div className="space-y-4 text-center flex flex-col items-center">
                    <h2 className="text-4xl font-bold">Series de anime</h2>
                    <div className="bg-[#8549ba] w-40 h-1"></div>
                    <div>
                        {
                            gerAnime.map(e => (
                                <div key={e.id}>
                                    <img src={e.img} alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home