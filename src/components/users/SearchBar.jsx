const SearchBar = () => {
    return (
        <div className="bg-gray-200 rounded-sm border w-full border-gray-800 flex items-center ">
            <button className="py-2 px-4 font-semibold bg-gray-800 text-white rounded-ms border-r border-gray-800 hover:bg-[#8549ba] active:bg-gray-800 disabled:opacity-50 inline-flex items-center focus:outline-none">
                Buscar
            </button>
            <input type="text" placeholder="Buscar por Personaje, Serie o Publicación..." className="bg-transparent py-1 text-gray-600 font-semibold px-4 focus:outline-none w-full" />
        </div>
    //      <div className="bg-gray-100 rounded-sm border w-full border-gray-500 flex items-center shadow-[10px_4px_#1d89ff,10px_4px_2px_rgba(0,0,0,0.3),20px_-4px_#feab3a,20px_-4px_2px_rgba(0,0,0,0.3),30px_8px_#ff5964,30px_8px_2px_rgba(0,0,0,0.3),-10px_-8px_#28b78d,-10px_-8px_2px_rgba(0,0,0,0.3),-20px_8px_#bd2df5,-20px_8px_2px_rgba(0,0,0,0.3)] opacity-100 translate-y-0">
    //      <button className="py-2 px-4 bg-white text-black rounded-ms border-r border-gray-200 hover:bg-[#8549ba] active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
    //          Search
    //      </button>
    //      <input type="text" placeholder="Search by character, anime or publication..." className="bg-transparent py-1 text-gray-600 px-4 focus:outline-none w-full" />
    //  </div>
    )
}

export default SearchBar