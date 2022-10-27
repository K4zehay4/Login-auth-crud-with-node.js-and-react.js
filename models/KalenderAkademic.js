import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes}=Sequelize;

const KalenderAkademic= db.define('akademic',{
   judul:DataTypes.STRING,
   gambar:DataTypes.STRING,
   deskripsi:DataTypes.STRING,
   url:DataTypes.STRING

},{
    freezeTableName:true
})

export default KalenderAkademic;

(async()=> {
    await db.sync();
}) ();
