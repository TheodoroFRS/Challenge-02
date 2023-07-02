const Tutor = require("../models/Tutor");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";

const login = async (req: express.Request, res: express.Response) => {

  const {email, password} = req.body;
  
  const tutor = await Tutor.findOne({email}).select("+password");

  if (!tutor) {
    return res.status(404).json({ error: true, code: 404, message: "Invalid email or password"});
  }
  if (!password || !tutor.password) {
    return res.status(400).json({ error: true, code: 400, message: "Invalid email or password" });
  }

  const passwordValid = await bcrypt.compare(password, tutor.password);

  if (!passwordValid) {
    return res.status(401).json({ error: true, code: 401, message: "Invalid email or password"});
  }

  const secret = `${process.env.JWT_SECRET }`;
  const token = jwt.sign({ id: tutor._id },secret,{expiresIn:process.env.JWT_EXPIRATION});

  return res.status(200).json({ access_token:token });
};


module.exports = {
  login,
};
