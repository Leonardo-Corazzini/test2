import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"
export default function Header() {
    const { user, setModify, setModal } = useContext(GlobalContext)

    function onAdd(e) {
        e.preventDefault()
        setModify(true)
    }
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <form className="d-flex" role="search">
                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button> */}
                    <button onClick={onAdd} className="btn btn-outline-success" type="submit">Nuovo documento</button>

                </form>
                <button onClick={() => setModal(true)} className="btn-primary" >{user}</button>
            </div>
        </nav>
    )
}