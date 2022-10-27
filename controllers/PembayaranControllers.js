import pembayaran from "../models/Pembayaran.js"
import path from "path";
import fs from "fs";


export const getGambar = async (req, res) => {
  try {
    const response = await pembayaran.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getgambarById = async (req, res) => {
  try {
    const response = await pembayaran.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const savegambar = (req, res)=>{
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const username=req.body.username;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name );
  const fileName = file.md5 + ext;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(2100).json({ msg: err.message });
    try {
      await pembayaran.create({ username:username, gambar: fileName });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updategambar = async (req, res) => {
  const responeguru= await pembayaran.findOne({
    where:{
        id : req.params.id
    }
});
if(!responeguru) return res.status(404).json({msg: "No Data Found"});

let fileName = "";
if(req.files === null){
    fileName = responeguru.gambar;
}else{
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    const filepath = `./public/images/${responeguru.gambar}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err)=>{
        if(err) return res.status(500).json({msg: err.message});
    });
}
const username=req.body.username;
try {
    await pembayaran.update({username:username, gambar: fileName},{
        where:{
            id: req.params.id
        }
    });
    res.status(200).json({msg: "Product Updated Successfuly"});
} catch (error) {
    console.log(error.message);
}
}

export const deletegambar = async (req, res) => {
  const gurumodel = await pembayaran.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!gurumodel) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${gurumodel.gambar}`;
    fs.unlinkSync(filepath);
    await pembayaran.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
    
  }
};