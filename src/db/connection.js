import mysql from 'mysql';

let db = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: 'root',
    password: 'root',
    port: process.env.DB_PORT || 3306,
}



const pool = mysql.createPool(db)


async function connection() {
    try {
        pool.getConnection((err, connect) => {
            if (err) {
                console.log('ERROR in Connection-->', err)
            }
            else {
                connect.release()
            }
        })

        pool.on('connection', (connection) => {
            console.log('Connected to MySQL server');
        });

        pool.on('error', (err) => {
            console.error('MySQL Pool Error:', err);
        });

        // Continue with your app initialization...

    } catch (error) {
        console.error('ERROR:', error)
        throw error
    }


}



export { connection, pool }


