const express = require("express")
const path = require("path")
const method_override = require('method-override')
const sqlite3 = require("sqlite3").verbose()
const { execute, insert, get_all, _delete } = require("./sql.js")
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE);


const PORT = 7878;
const app = express();


const createTable = async() => {
    try {
        await execute(
            db,
            `CREATE TABLE IF NOT EXISTS test_data (
                id INTEGER PRIMARY KEY,
                data TEXT
            )`
        );
    } catch (err) {
        console.log(err)
    } 
}
createTable();
let datas = []

// middlewares
app.use(method_override('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")

// routes
app.get('/', async (req, res) => {
    try {
        const rows = await get_all(db, "test_data");
        res.render('index', { rows });
    } catch(err) {
        res.status(500).send({ error: err.message || "Something went wrongl."})
    }

})

app.post('/data/store', async (req, res) => {
    try {
        const { data } = req.body;

        if (data.trim() == '') {
            return res.status(201).redirect('/');

        }

        const sql = `INSERT INTO test_data(data) VALUES(?)`;
        const params = [data];
        await insert(db, sql, params);
    } catch (err) { 
        console.log(err)
    }

    return res.status(201).redirect('/');
})

app.delete('/delete/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);

        await _delete(db, id);

        res.status(200).redirect('/');
    } catch(err) {
        console.log(err)
    }

    

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})