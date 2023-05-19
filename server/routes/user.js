import  express  from "express";
import { addFiles, deleteFile, getFiles, userDetails, userLogin, userSignUp } from "../controller/userController.js";
const router=express.Router();


router.post('/userSignUp',userSignUp)
router.post('/userLogin',userLogin)
router.get('/userDetails',userDetails)
router.post('/addFiles',addFiles)
router.get('/getFiles/:token',getFiles)
router.get('/fileDelete/:fileId',deleteFile)


export default router 
