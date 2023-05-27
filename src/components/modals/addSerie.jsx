import { useNavigate } from 'react-router-dom';

const AddSerie = ({setIsOpenAddProduct}) => {
    const navegate = useNavigate()
    return (
        <div
			className="border  modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div className="modal-content py-4 text-left px-6">
			
				<div className="flex justify-between items-center pb-3">
					<p className="text-2xl font-bold text-gray-800">Suggestion</p>
					<div className="modal-close cursor-pointer z-50">
						<svg onClick={()=> setIsOpenAddProduct(false)} className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
							viewBox="0 0 18 18">
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
							</path>
						</svg>
					</div>
				</div>
		
				<div className="my-5  text-gray-800">
					<p className='text-gray-800'>You want to add another product press yes, press no if you do not want to add</p>
				</div>

				<div className="flex justify-end pt-2">
					<button onClick={()=> navegate("/products")}
						className="focus:outline-none modal-close px-4 bg-gray-200 p-3 rounded-lg text-black hover:bg-gray-100">No</button>
					<button onClick={()=> setIsOpenAddProduct(false)}
						className="focus:outline-none px-4 bg-gray-800 p-3 ml-3 rounded-lg text-white hover:bg-gray-600">Yes</button>
				</div>
			</div>
		</div>
    )
}

export default AddSerie