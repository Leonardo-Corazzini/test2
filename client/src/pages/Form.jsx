import { useState, useContext } from "react"
import GlobalContext from "../context/GlobalContext"
import axios from 'axios'
export default function Form() {


    const { API_URL, setModify, propDoc, fetchData, setPropDoc } = useContext(GlobalContext)

    const initialData = {
        nome_documento: propDoc ? propDoc.nome_documento : '',
        descrizione_documento: propDoc ? propDoc.descrizione_documento : '',
        quantita: propDoc ? propDoc.quantita : 0,
        importo: propDoc ? propDoc.importo : 0,
        definitivo: propDoc ? propDoc.definitivo : 0
    }
    const [data, setData] = useState(initialData)
    function set(e) {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        });

    }

    function onSubmit(e) {
        e.preventDefault()
        if (propDoc) {
            axios.patch(`${API_URL}data/${propDoc.id}`, data)
                .then(res => {
                    console.log('modifica avvenuta con successo')
                    fetchData()
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            axios.post(`${API_URL}data/`, data)
                .then(res => {
                    console.log('documento inserito con successo')
                    fetchData()

                })
                .catch(err => {
                    console.error(err);
                })
        }


        setModify(false)
    }
    function onClose() {
        setPropDoc({
            nome_documento: '',
            descrizione_documento: '',
            quantita: 0,
            importo: 0,
            definitivo: 0
        })
        setModify(false)
    }
    return (
        <div className="overlay-form">
            <div className="container login">
                <form>
                    <div className="mb-3">
                        <label htmlFor="InputNome" className="form-label">Nome</label>
                        <input onChange={set} type="text" name="nome_documento" className="form-control" id="InputNome" value={data.nome_documento} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputDescrizione" className="form-label">Descrizione</label>
                        <input onChange={set} type="textarea" name="descrizione_documento" className="form-control" id="InputDescrizione" value={data.descrizione_documento} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputImporto" className="form-label">Importo</label>
                        <input onChange={set} type="number" name="importo" className="form-control" id="InputImporto" value={data.importo} />
                        <label htmlFor="InputQuantita" className="form-label">Quantita</label>
                        <input onChange={set} type="number" name="quantita" className="form-control" id="InputQuantita" value={data.quantita} />
                    </div>
                    <div className="mb-3 form-check">
                        <input onChange={set} name="definitivo" type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1" checked={data.definitivo === 1}>Definitvo</label>
                    </div>
                    <div>
                        <button onClick={onSubmit} type="submit" className="btn btn-primary">Salva</button>
                        <button onClick={onClose} type="submit" className="btn btn-secondary">Chiudi</button>
                    </div>



                </form>

            </div>
        </div>

    )
}