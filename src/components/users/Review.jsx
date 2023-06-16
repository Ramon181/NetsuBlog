import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReview } from "../../redux/actions/ReviewAction";
import PostReview from "../form/PostReview";

const Review = ({ postId }) => {
  const dispatch = useDispatch();
  const getReview = useSelector(state => state.reviews);

  const reviewsRefrech = () => {
    dispatch(allReview(postId));
  }

  useEffect(() => {
    reviewsRefrech()
  }, []);

  const stars5 = [1, 2, 3, 4, 5];

  return (
    <div className=" w-full space-y-4">
      {getReview.map(e => (
        <div className="flex">
          <div className="flex-shrink-0 mr-3">
            <img
              className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src={e.icon}
              alt=""
            />
          </div>
          <div className="flex-1 border rounded-sm px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <div className=" flex space-x-2 items-center">
              <strong>{e.userName}</strong>
              {stars5.map(star => {
                return e.stars >= star ? (
                  <svg
                    key={`reviewStar ${e.userName} ${star}`}
                    aria-hidden="true"
                    className="w-4 h-4 mt-1 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ) : (
                  <svg
                    key={`reviewStar ${e.userName} ${star}`}
                    aria-hidden="true"
                    className="w-4 h-4 mt-1 text-gray-300 dark:text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                );
              })}
            </div>
            <p className="text-sm">{e.description}</p>
          </div>
        </div>
      ))}

      <PostReview postId={postId} getReview={getReview} reviewsRefrech={reviewsRefrech}/>
      
    </div>
  );
};

export default Review;
