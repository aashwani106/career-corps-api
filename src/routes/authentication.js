import express from 'express'
import { pool } from '../db/connection.js';
import cors from 'cors'

const app = express()
app.use(cors())

const router = express.Router()


// API For Login 
router.get('/login', function (req, res) {
    // let obj = JSON.parse(req.body)
    let sql = `SELECT * FROM local_db.authentication_info `;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.send(result)
        }
    })
})


// API For Login 
router.get('/loginTest', function (req, res) {
    let objectToSend = {}
    let obj = req.body
    let sql = `SELECT * FROM local_db.authentication_info where email = ${obj.email}`;
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
                    objectToSend['error'] = false;
                    objectToSend['data'] = 'Password does not match!';
                    res.send(objectToSend);
                }
            } else {
                objectToSend['error'] = false;
                objectToSend['data'] = 'Email does not exists!';
                res.send(objectToSend);
            }
        }
    })
})



// API For Register
router.post('/signup', (req, res) => {

    let obj = req.body
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    let objectToSend = {}

    let query = `Select max(id) from user.login`
    pool.query(query, (result1, error1) => {
        if (error1) {
            objectToSend['error'] = true;
            objectToSend['data'] = 'Server Side Error...'
            res.send(objectToSend)
        } else {

            let id = 1;
            if (result1.length > 0) {
                id = result1[0]['id'] + 1
            }
            let role_cd = 'USER';
            let le_id = role_cd + '_' + id;

            let query1 = `Insert into User.login (id,le_id,name,email,password,role_cd,phone_no,status) 
            VALUE (${id},${le_id},${obj.name},${obj.email},${obj.password},${role_cd},${obj.phone_number},'ACTIVE')`

            db.query(query1, (error2, result2) => {
                if (error2) {
                    objectToSend['error'] = true;
                    objectToSend['data'] = 'Server Side Error...'
                    res.send(objectToSend)
                } else {
                    objectToSend['error'] = false;
                    objectToSend['data'] = 'Sign-Up Successfully!'
                    res.send(objectToSend)
                }
            })
        }



    })

})




export default router 