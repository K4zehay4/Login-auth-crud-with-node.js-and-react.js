import express from "express";
import{getAkademic,getAkademicById,saveAkademic
} from "../controllers/AkademicControllers.js"



const routerm = express.Router();

routerm.get('/akademic', getAkademic);
routerm.get('/akademic/:id', getAkademicById);
routerm.post('/akademic', saveAkademic);



export default routerm;