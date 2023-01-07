const express = require('express');
const cors = require('cors');
const books = require('./books');
const users = require('./users');

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

const armanToken = "asdffdaasdf5478asdfasdfasdfasdfasdfasdf";

app.post('/auth/login', (req, res) => {

    const { username, password } = req.body;
    setTimeout(() => {
        if (!username || !password) {
            const validationErros = {
                hasError: true,
                message: "Validatoin Error",
                errors: {
                    username: !username ? "Username is required" : null,
                    password: !password ? "Password is required" : null
                },
                statusCode:400
            }
            res.status(400).send(validationErros);
        } else {
            const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
            if (!user) {
                res.status(404).send({
                    hasError: true,
                    message: "User not found",
                    statusCode:404
                });
            }
            if (user) {
                if (user.password === password) {
                    const {password,...rest} = user;
                    res.status(200).send({
                        hasError: false,
                        message: "Successful",
                        payload:{
                            user:rest,
                            token:armanToken
                        },
                        statusCode:200
                    });
                }else{
                    res.status(401).send({
                        hasError: true,
                        message: "Password is wrong",
                        statusCode:401
                    });
                }
            }
        }
    }, 500);
});

app.get("/books",(req,res)=>{
    setTimeout(()=>{
        res.status(200).send({
            hasError:false,
            payload:books
        })
    },600)
})

app.listen(9000);
