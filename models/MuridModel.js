import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes}=Sequelize;

const MuridModel= db.define('murid',{
    name:DataTypes.STRING,
    nis:DataTypes.STRING,
    jk:DataTypes.STRING,
    alamat:DataTypes.STRING

},{
    freezeTableName:true
})

export default MuridModel;

// (async()=> {
//     await db.sync();
// }) ();
