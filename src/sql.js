const execute = async(db, sql) => {
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    })

}

const insert = async(db, sql, params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) reject(err);
            resolve()
        })
    })

}


const get_all = async(db, table_name) => {
    return new Promise((resolve, reject) => {
        // db.run(`SELECT * FROM ${table_name}`, (err) => {
        //     if (err) reject (err);
        // });
        const sql = `SELECT * FROM ${table_name}`;
        db.all(sql, (err, rows) => {
            if (err) reject(err);

            resolve(rows)

        });
    })


}

const _delete = async(db, id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM test_data WHERE id = ?`, [id], (err) => {
            if (err) reject(err);
            resolve()
        })
    })
}

const get_single = async(db, id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * from test_data WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    })
}

const update = async(db, data, id) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE test_data SET data = ? WHERE id = ?`, [data, id], (err) => {
            if (err) reject(err);

            resolve();

        });      

    }) 
}

module.exports = { execute, insert, get_all, _delete, get_single, update }