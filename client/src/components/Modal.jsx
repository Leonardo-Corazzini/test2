import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"
export default function Modal() {
    const { setModal, user, logout } = useContext(GlobalContext)
    function onClose() {
        setModal(false)
    }
    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ciao {user}</h5>
                        <button onClick={onClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Vuoi effettuare il logout?</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        <button onClick={logout} type="button" className="btn btn-primary">Conferma</button>
                    </div>
                </div>
            </div>
        </div>
    )
}