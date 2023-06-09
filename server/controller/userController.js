import { generateRandomCode } from "../middleware/generateCode.js";
import { generateAuthToken, verifyToken, verifyUserId } from "../middleware/jwt.js";
import filemodel from "../model/fileSchema.js";
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

export async function addFiles(req,res,next){
    try {
        let obj=req.body
        const userId=await verifyUserId(obj.token)
        const code=await generateRandomCode()
        await filemodel.create({
            userId:userId,
            file:obj.file,
            generatedCode:code
        })
        res.json({"status":"success","message":"File upload successfully"})
    } catch (error) {
        res.json({"status":"failed","message":error.message})
    }
}

export async function getFiles(req,res,next){
    try {
        const token = req.params.token
        const userId=await verifyUserId(token)
        const allFiles=await filemodel.find({userId:userId})
        res.json({"status":"success","files":allFiles})
    } catch (error) {
        res.json({"status":"failed","message":error.message})
    }
}

export async function deleteFile(req,res,next){
    try {
        const fileId=req.params.fileId
        await filemodel.findByIdAndDelete(fileId)
        res.json({"status":"success"})
    } catch (error) {
        res.json({"status":"failed","message":error.message})
    }
}