import UserdModel from "../models/UsersModel.js";

export const verifyUser=async(req,res, next)=>{
    if(!req.session.Username){
        return res.status(400).json({msg:'mohon login di akun anda'})
    }
    const User= UserdModel.findOne({
        where:{
            username:req.session.Username
        }
    });
    if(!User) return res.status(400).json({msg:'user tidak ditemukan....'})
    req.Username=User.username;
    req.role=User.role
    next();
}


export const AdminOnly=async(req,res, next)=>{
    
    const User=await UserdModel.findOne({
        where:{
            username:req.session.Username
        }
    });
    if(!User) return res.status(400).json({msg:'user tidak ditemukan....'})
    if(User.role !=="admin") return res.status(400).json({msg:'acces dilarang...'})
      next();
}
