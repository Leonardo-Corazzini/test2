const connection = require('../database/db');

//index documenti
function index(req, res) {
    let sql = 'SELECT * FROM test_db.data;'


    // if (req.query.city) {
    //     sql += ` WHERE city LIKE '%${req.query.city}%' `
    // }


    // sql += ' GROUP BY properties.id ORDER BY properties.heart DESC'

    connection.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({ message: err.message })
            return
        }





        res.json(data)
    })


}
//show data
function show(req, res) {

    let id = req.params.id

    if (isNaN(id)) {
        id = id.trim().replaceAll('-', ' ')
    }

    const sql = `SELECT *
		FROM  test_db.data
		WHERE id = ?
	
    `

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Data not found',
            })



        res.json(results)

    })
}
// store data
function store(req, res) {

    const {
        nome_documento,
        definitivo,
        descrizione_documento,
        importo,
        quantita,
        pdf
    } = req.body

    if (
        !nome_documento ||
        isNaN(definitivo) ||
        isNaN(importo) ||
        isNaN(quantita)
    ) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    const sql = `INSERT INTO data (nome_documento, definitivo, descrizione_documento, importo, quantita, pdf) VALUES (?, ?, ?, ?, ?, ?)`

    connection.query(sql, [
        nome_documento,
        definitivo,
        descrizione_documento,
        importo,
        quantita,
        pdf], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })
            res.status(201).json({ message: 'Date created' })
        })

}
function modify(req, res) {

    const id = req.params.id

    const {
        nome_documento,
        definitivo,
        descrizione_documento,
        importo,
        quantita,
        pdf
    } = req.body

    if (
        !nome_documento ||
        isNaN(definitivo) ||
        isNaN(importo) ||
        isNaN(quantita)
    ) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    let sql = `SELECT * FROM data WHERE id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })

        sql = `UPDATE data SET nome_documento = ? , definitivo = ? , descrizione_documento = ?, importo = ?, quantita = ?, pdf = ?  WHERE  id = ?`
        connection.query(sql, [
            nome_documento,
            definitivo,
            descrizione_documento,
            importo,
            quantita,
            pdf,
            id], (err, results) => {
                if (err) return res.status(500).json({ message: err.message })
                res.status(203).json({ message: 'Update data' })
            })


    })
}

module.exports = { index, show, store, modify }
