import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPostId } from "../../redux/actions/PostAction"

const Post = () => {
    const { id } = useParams()
    const post = useSelector(state => state.postId)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostId(id))
    }, [dispatch]);

    return (
        <div className="w-full h-full relative mx-auto my-0 bg-gray-800">
            <div className="h-[342px] w-full relative overflow-hidden z-[1] m-0 rounded-t-[5px]">
                <img className="w-full h-full z-[-1] overflow-hidden absolute left-0 top-0 origin-[0_0] skew-y-[-2.2deg]" src={post.articles[1].article} alt="" />
                <div className="p-4 absolute bottom-0 left-0 z-20">
                    <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">{post.serie.name}</span>
                    <h2 className="text-4xl w-7/12 font-semibold text-gray-100 leading-tight">
                        {post.title}
                    </h2>
                </div>


            </div>

            <div className="block lg:flex lg:space-x-2 px-4 mt-10">
                <div className="w-full text-white lg:w-2/3">
                    <p className=" font-semibold text-2xl">{post.description}</p>

                    <img src="" alt="" />

                </div>
                <div className="w-full lg:w-1/3 px-3">

                    <div className="mb-4">
                        <h5 className=" text-lg uppercase text-gray-100 font-semibold px-1 mb-2"> Otras Publicacionses </h5>
                        <ul>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post