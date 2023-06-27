const Search = () => {
    return (
        <div className="bg-gray-100 h-full rounded-sm border w-full border-gray-200 flex items-center">
            <input type="text" placeholder="Search..." className="bg-transparent py-1 text-gray-600 px-4 focus:outline-none w-full" />
            <button className="py-2 px-4 bg-white text-black rounded-ms border-r border-gray-200 hover:bg-[#8549ba] active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
                Search
            </button>
        </div>
    )
}

export default Search