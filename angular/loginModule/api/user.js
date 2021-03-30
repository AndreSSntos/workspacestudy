const express = require("express");

const router = express.Router();

const UserModel = require("../model/UserModel");

const bcrypt = require("bcrypt");

const webToken = require("jsonwebtoken");

require("dotenv").config()


router.post("/register", (req,res)=>{
    const{username, password, email} = req.body;
    if(username == undefined || username == '' 
    || password == undefined || password == '' 
    || email == undefined || email == '' ){
        res.status(401).json({
            message: "Fill al fields",
            status: res.statusCode
        });
    }else{
        UserModel.findOne({
            attributes: ["user_name"],
            where: {
                email
            }
        }).then((value)=>{
            if(value === null){
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(password, salt, (err, hash)=>{
                        UserModel.create({
                            user_name: username,
                            email: email,
                            password: hash
                        }).then((value)=> {
                            res.status(201).json({
                                message: "Account has Created Sucessfully",
                                status: res.statusCode
                            })
                        }).catch(err=> res.status(404).json({
                            message: "something went wrong"
                        }))
                        
                    })
                })
            }else{
                res.status(401).json({
                    message: "Email already Taken",
                    statu: res.statusCode
                })
            }
        })
    }
})


router.post("login", (req,res)=> {
    const{password, email} = req.body;
    if(password == undefined || password == '' 
    || email == undefined || email == '' ){
        res.status(401).json({
            message: "Fill al fields",
            status: res.statusCode
        });
    }else{
        UserModel.findOne({
            where: {
                email
            }
        }).then((value)=>{
            if(value === null){
                res.status(401).json({
                    message: "Email is not Registered Please SignUP",
                    status: res.statusCode,
                    token: ""
                })
            }else{
               const dbUserPassword = value.getDataValue("password");
               bcrypt.compare(password, dbUserPassword, function(err, result){
                   if(result){
                       const userdetail = {
                           name:value.getDataValue("user_name"),
                           id:value.getDataValue("id")
                       }

                       const token =
                        webtoken.sign(userdetail,process.env.secret_key,
                       {expiresIn: "60s"})

                       res.status(200).json({
                           message: "Logged in Sucessfully",
                           status:res.statusCode,
                           token
                       })
                   }else{
                       res.status(401).json({
                           message: "Invalid Credential Given",
                           status: res.statusCode,
                           token
                       })
                   }
               })
            }
        })
    }
})

router.get("/profile",(req,res)=>{
    const authHeader = req.headers["authorization"];

    if(authHeader){
        const token = authHeader.substr("Bearer".length, +1);
        webToken.verify(token, process.env.secret_key, (err, user)=>{
            if(user){
                res.status(401).json({
                    message: "sucess",
                    status: res.statusCode,
                    data:user
                })
            }else{
                res.status(401).json({
                    message: "Please Login",
                    status: res.statusCode
                })
            }
        })
    }else{
        res.status(401).json({
            message: "Please Login",
            status: res.statusCode,
        })
    }
})

module.exports = router;

