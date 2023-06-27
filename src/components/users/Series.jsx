import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSerie } from "../../redux/actions/SerieAction";


const Series = () => {

    const gerAnime = useSelector(state => state.series)
    const dispatch = useDispatch()

    // useEffect(()=> {
    //     dispatch(getSerie())
    // },[])

  return (
    <div className="bg-gray-50 flex justify-center w-full h-screen">
      <div className=" flex justify-center flex-grow space-x-4 space-y-4 w-2/4 items-center">
        {gerAnime.map(e => (
          <div key={e.id}>
            <img className=" w-50 h-20" src={e.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series;
