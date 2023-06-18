import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCharacters } from "../../redux/actions/CharacterAction";

const Character = () => {
  const getCharacters = useSelector(state => state.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCharacters());
  }, []);

  return (
    <div className="bg-gray-50 flex justify-center w-full h-screen">
      <div className=" flex justify-center items-center flex-grow space-x-4 w-2/4">
        {getCharacters.map(character => (
          <div
            class="h-[500px] w-[250px] bg-white shadow-[0_0_0_7px_#fff,0_0_8px_5px_#000] mx-[30px] my-0 border-[5px] border-solid border-[black]"
            id="spiderman"
          >
            <div class="relative h-[72%] bg-[#5CAAB4] w-full z-[1] border-b-[5px] border-b-black border-solid">
              <img
                class=" absolute z-[3] w-[130%] h-[90%] ml-[-30px]"
                src={character.img}
              />
            </div>
            <div class="card-text">
              <h2 className=" text-lg font-semibold mb-6 tracking-[5px] text-center text-[#2E5579]">
                {character.serie.name}
              </h2>

              <div className="flex justify-between pt-[5px] p-2.5">
                <div className="flex flex-col">
                  <span className="text-2xl leading-[30px] font-medium">
                    Edad
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[5rem] font-extrabold leading-[60px]">
                    {character.age}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Character;
