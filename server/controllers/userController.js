const connection = require('../database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = 'segreto-super-sicuro'
// function login(req, res) {
//     const username = req.params.key;
//     console.log(username);

//     const sql = `SELECT * FROM user WHERE username = ?`;

//     connection.query(sql, [username], (err, results) => {
//         if (err) {
//             return res.status(500).json({
//                 message: err.message,
//                 message2: "Utente non trovato"
//             });
//         }

//         res.json(results);
//     });
// }
exports.store = (req, res) => {
    const { username, password } = req.body;

    const checkUserSql = `SELECT * FROM user WHERE username = ?`;
    connection.query(checkUserSql, [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            // Username già usato, esci subito
            return res.status(400).json({ message: "Username già utilizzato" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const insertUserSql = 'INSERT INTO user (username, password) VALUES (?, ?)';

            connection.query(insertUserSql, [username, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });

                res.status(201).json({ message: 'Utente creato con successo' });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};
// function store(req, res) {

//     const {
//         username,
//         password
//     } = req.body

//     if (
//         !username ||
//         !password
//     ) {
//         return res.status(400).json({ message: 'Invalid data' })
//     }

//     let sql = `SELECT * FROM user WHERE username = ?`;

//     connection.query(sql, [username], (err, results) => {
//         if (results.length > 0) {
//             return res.status(500).json({
//                 message: "Username gia utilizzato"
//             });
//         }})

//         sql = `INSERT INTO user (username, password) VALUES (?, ?)`

//         connection.query(sql, [username, password], (err, results) => {
//             if (err) return res.status(500).json({ message: err.message })
//             res.status(201).json({ message: 'User created' })
//         })
//     });


// }

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM user WHERE username = ?';

    connection.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: 'Password errata' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
            expiresIn: '1d'
        });

        res.json({ token });
    });
};


// module.exports = { login, store }