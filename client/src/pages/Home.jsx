import { useState, useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext"
import Form from "./Form";
import { jsPDF } from "jspdf";
import Modal from "../components/Modal";

export default function Home() {
    const { API_URL, modify, setModify, setPropDoc, document, fetchData, modal } = useContext(GlobalContext)



    useEffect(() => {
        fetchData()
    }, [])
    function onModify(el) {
        setPropDoc(el)
        setModify(true)
    }
    function onPdf(d) {
        const docTest = new jsPDF();
        docTest.text("Hello world!", 10, 10);
        docTest.text(`Nome documento : ${d.nome_documento}`, 10, 20);
        docTest.text(`Descrizione : ${d.descrizione_documento}`, 10, 30);
        docTest.text(`Importo : ${d.importo}`, 10, 40);
        docTest.text(`Quantita : ${d.quantita}`, 10, 50);

        docTest.save(`${d.nome_documento}.pdf`);
    }
    return (
        <main>
            {modal && <Modal />}
            {modify && <Form />}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Data</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrizione</th>
                            <th scope="col">Importo</th>
                            <th scope="col">Quantita</th>
                            <th scope="col">Definitivo</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {document.length > 0 && document.map((doc, i) => (
                            <tr key={i}>
                                <th scope="row">{i}</th>
                                <td>{doc.data_documento}</td>
                                <td>{doc.nome_documento}</td>
                                <td>{doc.descrizione_documento}</td>
                                <td>{doc.importo}</td>
                                <td>{doc.quantita}</td>
                                <td>{doc.definitivo ? 'S' : 'N'}</td>
                                <td>
                                    <div className="modal-footer">
                                        {doc.definitivo ? <button disabled type="button" className="btn btn-secondary mx-3">Modifica</button> : <button onClick={() => onModify(doc)} type="button" className="btn btn-secondary mx-3">Modifica</button>}
                                        <button type="button" className="btn btn-primary mx-3" onClick={() => onPdf(doc)}>Scarica PDF</button>
                                    </div>
                                </td>

                            </tr>

                        ))}


                    </tbody>
                </table>
            </div>


        </main >
    )
}