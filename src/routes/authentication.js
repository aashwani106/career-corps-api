import express from 'express'
import { pool } from '../db/connection.js';
import cors from 'cors'

const app = express()
app.use(cors())

const router = express.Router()


// API For Login 
router.get('/login:dtls', function (req, res) {
    let objectToSend = {}
    let obj = JSON.parse(req.params.dtls)
    let sql = `SELECT * FROM local_db.authentication_info where phone_no = ${obj.phone_no}`;
    pool.query(sql, function (error, result) {
        if (error) {
            objectToSend['error'] = true;
            objectToSend['data'] = 'Server side error!';
            res.send(objectToSend);
        } else {
            if (result.length > 0) {
                if (result[0].password == obj.password) {
                    objectToSend['error'] = false;
                    objectToSend['data'] = 'Login Successfully';
                    res.send(objectToSend);
                } else {
                    objectToSend['error'] = true;
                    objectToSend['data'] = 'Password does not match!';
                    res.send(objectToSend);
                }
            } else {
                objectToSend['error'] = true;
                objectToSend['data'] = 'Email does not exists!';
                res.send(objectToSend);
            }
        }
    })
})


// API For Register
router.post('/signup', (req, res) => {

    let obj = req.body
    // console.log(obj);
    let objectToSend = {}
    let query = `SELECT MAX(id) as id FROM system_data.auth_data`
    pool.query(query, (err1, result) => {
        if (err1) {
            objectToSend['error'] = true;
            objectToSend['data'] = 'Server Side Error!'
            res.send(objectToSend)
            return;
        } else {

            let id = 1;
            if (result.length > 0) {
                id = result[0]['id'] + 1
            }
            let role_cd = 'USER';
            let user_id = role_cd + '_' + id;

            let query1 = `Insert into system_data.auth_data (id,user_id,name,email,password,role_cd,phone_no,status) 
                VALUE (${id},'${user_id}','${obj.name}','${obj.email}','${obj.password}','${role_cd}',${obj.phone_no},'ACTIVE')`

            pool.query(query1, (error2, result2) => {
                if (error2) {
                    console.log(query1);
                    objectToSend['error'] = true;
                    objectToSend['data'] = 'Server Side Error...'
                    res.send(objectToSend)
                } else {
                    objectToSend['error'] = false;
                    objectToSend['data'] = 'Sign-Up Successfully!'
                    res.send(objectToSend)
                    return;
                }
            })
        }

    });

})




export default router 