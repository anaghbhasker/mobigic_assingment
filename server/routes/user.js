import  express  from "express";
import { addFiles, userDetails, userLogin, userSignUp } from "../controller/userController.js";
const router=express.Router();


router.post('/userSignUp',userSignUp)
router.post('/userLogin',userLogin)
router.get('/userDetails',userDetails)
router.post('/addFiles',addFiles)


export default router 
