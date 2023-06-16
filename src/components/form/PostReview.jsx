import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../redux/actions/ReviewAction";

const PostReview = ({ postId, getReview,reviewsRefrech}) => {
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const modifyStars = (star) => {
    setStars(star);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    if (getReview.map(e => user === e.userName).includes(true)) {
      setStars(0);
      setDescription("");
    } else if (stars > 0 && description.length > 3) {
      const newReview = {
        userName: user.userName,
        postId:postId,
        icon:user.profile,
        description: description, 
        stars:stars
      }
      dispatch(postReview(newReview));
      setStars(0);
      setDescription("");
      reviewsRefrech()
    } else {
      console.log("No se Pudo Enviar El Formulario");
    }
  };

  const stars5 = [1, 2, 3, 4, 5];

  return (
    <form onSubmit={handleOnSubmit} className=" flex">
      <div className="flex-shrink-0 mr-3">
        <img
          className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
          src=""
          alt=""
        />
      </div>
      <div class="flex-1 border rounded-sm px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <textarea
          value={description}
          name="description"
          onChange={e => setDescription(e.target.value)}
          class=" w-full text-black  sec p-3 h-60 border border-gray-300"
          placeholder="Describe everything about this post here"
        ></textarea>

        <div class="icons flex text-gray-500 m-2">
          <ul className="flex justify-center cursor-pointer">
            {stars5.map(star => {
              return (
                <li key={`stars ${star}`} onClick={() => modifyStars(star)}>
                  {stars >= star ? (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="star"
                      className="w-4 text-yellow-500 mr-1"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="star"
                      className="w-4 text-yellow-500 mr-1"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                      ></path>
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div class="buttons flex">
          <div class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancelar
          </div>
          <button type="submit" class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
            Publicar
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostReview;
