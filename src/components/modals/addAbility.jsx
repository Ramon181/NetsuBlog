import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { createAility } from "../../redux/actions/CharacterAction"

const AddAbility = ({ name, setName, description, abilityAll, setDescription, info, setInfo, setIsOpenAddAbility }) => {

    const navegation = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (abilityAll[0].name.includes(name)) {
            setInfo({
                ...info,
                ability: [...info.ability, name]
            })
            setIsOpenAddAbility(false)
            navegation("/characters-list/post")
        } else {
            const newAbility = {
                name: name,
                description: description,
            }
            setInfo({
                ...info,
                ability: [...info.ability, name]
            })
            dispatch(createAility(newAbility))
            setIsOpenAddAbility(false)

            navegation("/characters-list/post")
        }

    }
    return (
        <div className="w-full max-w-7xl py-8 px-0 rounded-sm shadow  bg-gray-50 text-gray-900">


            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2 mx-20 px-0">
                        <label htmlFor="name" className="text-sm">Nombre de la Habilidad</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder="Nombre de la Habilidad" className="w-full m-0 px-3 py-2 border rounded-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-2 mx-20 px-0">
                        <div className="flex justify-between ">
                            <label htmlFor="description" className="text-sm">Descripcion</label>
                        </div>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3  py-2 border rounded-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" name="description" id="description" cols="20" placeholder="Descripcion" rows="10"></textarea>
                    </div>
                </div>
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">Agregar</button>
            </form>
        </div>
    )
}

export default AddAbility