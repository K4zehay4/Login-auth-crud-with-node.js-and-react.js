import express from "express";
import{getUser,SaveUser,getByUserId, DeleteUser, updateUser
} from "../controllers/UserControllers.js";

import { verifyUser, AdminOnly } from "../middleware/AuthUser.js";


const routerms = express.Router();

routerms.get('/users',verifyUser , AdminOnly, getUser);
routerms.post('/users',verifyUser , AdminOnly,SaveUser);
routerms.get('/users/:id',verifyUser , AdminOnly, getByUserId);
routerms.delete('/users/:id',verifyUser , AdminOnly,DeleteUser);
routerms.patch('/users/:id',verifyUser , AdminOnly,updateUser);


export default routerms;