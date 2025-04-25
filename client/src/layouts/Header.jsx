import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"
export default function Header() {
    const { user, setUser, checkUser } = useContext(GlobalContext)
    function logout() {
        localStorage.removeItem('token')
        setUser(null)
        checkUser()
    }
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <button onClick={logout} className="btn-primary" >{user}</button>
            </div>
        </nav>
    )
}