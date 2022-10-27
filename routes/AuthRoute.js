import express from "express";
import{Login, logOut, me
} from "../controllers/auth.js"



const routerA = express.Router();

routerA.get('/me', me);
routerA.post('/login', Login);
routerA.delete('/logout', logOut);


export default routerA;