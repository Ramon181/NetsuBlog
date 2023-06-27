import { useState } from "react";
import {useDispatch} from "react-redux"
import { login } from "../../redux/actions/UserAction";

const SingIn = ({setLoginModal}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();

    const onSubmit =(e)=>{
        e.preventDefault()
        const newUser = {
            userName: userName,
            password: password
        }
        dispatch(login(newUser))
        setLoginModal(false)
    }

    return (
        <div className="w-full max-w-md p-4 z-[5] rounded-sm shadow sm:p-8 bg-gray-50 text-gray-900">
            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
            <p className="text-sm text-center text-gray-800">Dont have account?
                <a href="#" rel="noopener noreferrer" className="focus:underline hover:underline">Sign up here</a>
            </p>
            <div className="my-6 space-y-4">
                <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-900 focus:ring-violet-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                </button>
            </div>
            <div className="flex items-center w-full my-4">
                <div className=" w-full h-[1px] bg-gray-900"></div>
                <p className="px-3 text-black">OR</p>
                <div className=" w-full h-[1px] bg-gray-900"></div>
            </div>
            <form noValidate="" onSubmit={onSubmit} action="" className="space-y-8 ng-untouched ng-pristine ng-valid">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm">Username</label>
                        <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} name="username" id="username" placeholder="Enter Username" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Forgot password?</a>
                        </div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                </div>
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">Sign in</button>
            </form>
        </div>
    )
}

export default SingIn