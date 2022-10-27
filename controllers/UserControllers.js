import UserdModel from "../models/UsersModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
  try {
    const response = await UserdModel.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getByUserId= async(req,res)=>{
  try {
    const response = await UserdModel.findOne({
      attributes:['username', 'email', 'role'],
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const SaveUser = async (req, res) => {
  const {username, email, password,confPassword, role}=req.body;
  if(password !== confPassword) return req.status(400).json({msg:'password dan cofPassword tidak benar....'})
  const hashPassword= await argon2.hash(password);
  try {
   await UserdModel.create({
    username:username,
    email:email,
    password: hashPassword,
    role:role
   });
    res.json(200).json({msg:'data dibuat.......'});
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser= async (req, res) => {
  const user = await UserdModel.findOne({
  
    where: {
      id: req.params.id,
    }
  });
  if(!user) return res.status(404).json({msg:'user tidak ditemukan'})
  const {username, email, password,confPassword, role}=req.body;
  let hashPassword="";
  if(password ===""|| password === null ){
  hashPassword=user.password
  }else{
    hashPassword=await argon2.hash(password)
  }
  if(password !== confPassword) return req.status(400).json({msg:'password dan conf password tidak benar....'})
  try {
    await UserdModel.update({
     username:username,
     email:email,
     password: hashPassword,
     role:role
    },{
      where:{
        id:user.id
      }
    });
     res.json(200).json({msg:'update berhasil.......'});
   } catch (error) {
     console.log(error.message);
   }
};

export const DeleteUser=async(req,res)=>{
  const user = await UserdModel.findOne({
  
    where: {
      id: req.params.id,
    }
  });
  if(!user) return res.status(404).json({msg:'user tidak ditemukan'})
  
  
  try {
    await UserdModel.destroy({    
      where:{
        id:user.id
      }
    });
     res.json(200).json({msg:'delete  berhasil.......'});
   } catch (error) {
     console.log(error.message);
   }
}