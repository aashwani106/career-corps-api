import express from 'express'
import { pool } from '../db/connection.js';
import cors from 'cors'

const app = express()
app.use(cors())

const router = express.Router()

router.post('/register', (req, res) => {

    let obj = req.body

    let objectToSend = {}
    let query = `SELECT * FROM system_data.auth_data`
    pool.query(query, (err1, result) => {
        if (err1) {
            objectToSend['error'] = true;
            objectToSend['data'] = 'Server Side Error!'
            res.send(objectToSend)
            return;
        } else {

            console.log(result);
            if (result.length > 0) {

                let auth_data = result[0];

                let maxID = `Select MAX(id) as id from `

                pool.query(maxID, (err2, result1) => {
                    if (err2) {
                        objectToSend['error'] = true;
                        objectToSend['data'] = 'Server Side Error!'
                        res.send(objectToSend)
                        return;
                    } else {
                        let id = 1;
                        if (result1.length > 0) {
                            id = result1[0]['id'] + 1
                        }
                        let std_cd = 'STUD';
                        let std_id = std_cd + '_' + id;

                        let query1 = `Insert into system_data.auth_data 
                        (student_id,user_name,full_name,le_id,email,phone_no,dob,start_date,end_date,status) 
                        VALUE (${std_id},'${auth_data.user_name}','${obj.full_name}','${auth_data.le_id}','${obj.password}','${role_cd}',${obj.phone_no},'ACTIVE')`

                        pool.query(query1, (error2, result2) => {
                            if (error2) {
                                objectToSend['error'] = true;
                                objectToSend['data'] = 'Server Side Error...'
                                res.send(objectToSend)
                                return;
                            } else {
                                objectToSend['error'] = false;
                                objectToSend['data'] = 'Register Successfully!'
                                res.send(objectToSend)
                                return;
                            }
                        })

                    }
                })
            }
        }
    });
    


})





export default router 