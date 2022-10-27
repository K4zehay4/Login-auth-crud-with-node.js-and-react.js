import KalenderAkademic from "../models/KalenderAkademic.js";
import path from "path";
import fs from "fs";
import  Express  from "express";
import bodyparser from "body-parser";

export const getAkademic = async (req, res) => {
  try {
    const response = await KalenderAkademic.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAkademicById = async (req, res) => {
  try {
    const response = await KalenderAkademic.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveAkademic = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const judul = req.body.judul;
  const gambar = req.files.gambar;
  const deskripsi = req.body.deskripsi;
  const fileSize = gambar.data.length;
  const ext = path.extname(gambar.name);
  const fileName = gambar.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  gambar.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(2100).json({ msg: err.message });
    try {
      await KalenderAkademic.create({ judul: judul, gambar: fileName, deskripsi:deskripsi, url:url });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};


