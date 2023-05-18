import { generateAuthToken, verifyToken } from "../middleware/jwt.js";
import usermodel from "../model/userSchema.js";

export async function userSignUp(req,res,next){
    try {
        let obj=req.body
        if (obj.username&&obj.password) {
            const user=await usermodel.findOne({username:obj.username})
            if (!user) {
                await usermodel.create({
                    username:obj.username,
                    password:obj.password
                })
                res.json({"status":"success","message":"Registration Successfully"})
            } else {
                res.json({"status":"failed","message":"Username Already Registered"})
            }
        } else {
            res.json({"status":"failed","message":"All fields are required"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function userLogin(req,res,next){
    try {
        let obj=req.body
        const user=await usermodel.findOne({username:obj.username})
        if (user) {
            if (obj.password===user.password) {
                const token=await generateAuthToken(user)
                res.json({"status":"success","message":"Login Successfully","token":token})
            } else {
                res.json({"status":"failed","message":"Your password is wrong"})
            }
        } else {
            res.json({"status":"failed","message":"Username not registered"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function userDetails(req,res,next){
    try {
        const token = req.query.token;
        const username=await verifyToken(token)
        res.json({"username":username})
    } catch (error) {
        console.log(error.message);
    }
}