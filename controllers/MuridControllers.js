import MuridModel from "../models/MuridModel.js";

export const getMurid = async (req, res) => {
  try {
    const response = await MuridModel.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMuridById = async (req, res) => {
  try {
    const response = await MuridModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveMurid=async(req,res) =>{
  const name = req.body.name;
  const nis = req.body.nis;
  const jk = req.body.jk;
  const alamat = req.body.alamat;
  
  try {
    await MuridModel.create({name:name, nis:nis, jk:jk, alamat:alamat })
    res.status(201).json({msg:"guruCreated"});
  } catch (error) {
    console.log(error.message);
  }
}

export const updateMurid= async (req, res) => {
  const name = req.body.name;
  const nis = req.body.nis;
  const jk = req.body.jk;
  const alamat = req.body.alamat;
  try {
    await MuridModel.update({name:name, nis:nis, jk:jk, alamat:alamat},{
      where:{
          id: req.params.id
      }
  });
    res.status(201).json({msg:"update sukses .........."});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMurid = async (req, res) => {
  try {
     await MuridModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({msg:"delete sukses......"});
  } catch (error) {
    console.log(error.message);
  }
};

