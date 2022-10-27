import express from "express";
import{getMurid, getMuridById, saveMurid,updateMurid, deleteMurid
} from "../controllers/MuridControllers.js";



const routerm = express.Router();

routerm.get('/murid', getMurid);
routerm.get('/murid/:id', getMuridById);
routerm.post('/murid', saveMurid);
routerm.patch('/murid/:id', updateMurid);
routerm.delete('/murid/:id', deleteMurid);


export default routerm;