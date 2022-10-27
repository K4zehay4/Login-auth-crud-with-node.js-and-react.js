import express from "express";
import{savegambar,updategambar,deletegambar,getGambar,getgambarById
} from "../controllers/PembayaranControllers.js"




const router = express.Router();

router.get('/pembayaran', getGambar);
router.get('/pembayaran/:id', getgambarById);
router.post('/pembayaran', savegambar);
router.patch('/pembayaran/:id', updategambar);
router.delete('/pembayaran/:id', deletegambar);


export default router;