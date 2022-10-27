import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes}=Sequelize;

const PembayaranModel= db.define('pembayaran',{
    username:DataTypes.STRING,
    gambar:DataTypes.STRING,  

},{
    freezeTableName:true
})

export default PembayaranModel;

// (async()=> {
//     await db.sync();
// }) ();
