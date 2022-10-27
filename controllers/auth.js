import UserModel from "../models/UsersModel.js";
import argon2 from "argon2";


export const Login=async(req,res)=>{
    const user = await UserModel.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.Username = user.username;
    const username = user.username;
    const email = user.email;
    const role = user.role;
    res.status(200).json({username, email, role});
}

export const me= async(req,res)=>{
    
    if(!req.session.Username){
        return res.status(400).json({msg:'mohon login di akun anda'})
    }
    const User= await UserModel.findOne({
        
        attributes:['username','email','role'],
        where:{
            username:req.session.Username
        }
    });
    if(!User) return res.status(400).json({msg:'email tidak ditemukan...'})
    res.status(200).json(User)
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}