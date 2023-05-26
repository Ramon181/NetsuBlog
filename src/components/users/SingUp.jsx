import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/UserAction"

const SingUp = () => {

    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navegate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            name: firstName + " " + surname,
            userName: username,
            email: email,
            password: password,
            role: "user",
            profile: "https://tinypic.host/images/2023/05/17/profile.png"
        }
        dispatch(register(newUser))
        navegate("/")
    }

    console.log(firstName,surname,email,username,password)


    return (
        <div className="mx-auto mt-12 mb-6">
            <div className="flex flex-col justify-center rounded-sm max-w-[40%] mx-auto bg-gray-200 items-center pb-5">
                <div className=" p-3 flex rounded-sm justify-start bg-slate-700 w-full">
                    <h2 className=" text-2xl text-gray-800  font-semibold">Register</h2>
                </div>
                <div className=" w-full p-7">

                    <div className=" w-full">
                        <form onSubmit={onSubmit} className="text-1xl">
                            <div className=" w-full flex flex-row justify-center">
                                <div className=" w-full">
                                    <label htmlFor="first_name">First Name</label>
                                    <input onChange={e => {
                                        setFirstName(e.target.value)
                                    }}
                                        value={firstName} type="text" name="first_name" id="first_name" placeholder="Enter First Name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="surname">Surname</label>
                                    <input onChange={e => {
                                        setSurname(e.target.value)
                                    }} value={surname} type="text" name="surname" id="surname" placeholder="Enter Surname" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                </div>
                            </div>



                            <div className=" ">
                                <label htmlFor="username">Username</label>
                                <input onChange={e => {
                                    setUsername(e.target.value)
                                }} value={username} type="text" name="username" id="username" placeholder="Enter Username" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>
                            <div className="">
                                <label htmlFor="email">Email</label>
                                <input onChange={e => {
                                    setEmail(e.target.value)
                                }} value={email} type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
                            </div>
                            <div className=" w-full flex flex-row justify-center skew-x-2">
                                <div className=" w-full">
                                    <label htmlFor="Password">Password</label>
                                    <input onChange={e => {
                                        setPassword(e.target.value)
                                    }} value={password} type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Enter Password" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="repeat_password">Repeat password</label>
                                    <input type="password" name="repeat_password" id="repeat_password" placeholder="Repeat password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                </div>
                            </div>

                            <div className="md:col-span-5 mt-4 text-right">
                                <div className="inline-flex items-end">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingUp