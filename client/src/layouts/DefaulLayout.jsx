import Header from "./Header";
import { Outlet } from "react-router";
import Login from "../pages/Login"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"

export default function DefaulLayout() {
    const { isLogin } = useContext(GlobalContext)
    return (
        <>
            {isLogin && <Header />}

            {isLogin && <Outlet />}
            {!isLogin && <Login />}




        </>

    )
}