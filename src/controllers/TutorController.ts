import express from "express";
const Tutors = require("../models/Tutor");

export default class TutorController {
  static findTutors = async (req: express.Request, res: express.Response) => {
    try {
      const tutors = await Tutors.find({}).select('-password');
      return res.status(200).json({ tutors });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

  static findTutorId = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const tutor = await Tutors.findById(id).select('-password');

      if (!tutor) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `No tutor with id ${id}` });
      }
      return res.status(200).json(tutor);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

  static createTutor = async (req: express.Request, res: express.Response) => {
    try {
      const { name,password, phone, email, date_of_birth, zip_code } = req.body;

      const erros = [];

      if (!name) {
        erros.push({ name: "error", message: "Not informed the name" });
      }

      if (!password) {
        erros.push({ name: "error", message: "Not informed the password" });
      }

      if (!phone) {
        erros.push({ phone: "error", message: "Not informed the phone" });
      }

      if (!email) {
        erros.push({ email: "error", message: "Not informed the email" });
      }

      if (!date_of_birth) {
        erros.push({
          email: "error",
          message: "Not informed the date of birth",
        });
      }

      if (!zip_code) {
        erros.push({ zip_code: "error", message: "Not informed the zip code" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      if (await Tutors.findOne({ email })) {
        return res
          .status(400)
          .json({ error: true, code: 400, message: "already existing email" });
      }

      const tutorSave = new Tutors({
        name,
        password,
        phone,
        email,
        date_of_birth,
        zip_code,
      });

      const newTutor = await tutorSave.save();

      return res.status(201).json(newTutor);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

  static updateTutor = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { name, phone, email, date_of_birth, zip_code } = req.body;

      const erros = [];

      if (!name) {
        erros.push({ name: "error", message: "Not informed the name" });
      }

      if (!phone) {
        erros.push({ phone: "error", message: "Not informed the phone" });
      }

      if (!email) {
        erros.push({ email: "error", message: "Not informed the email" });
      }

      if (!date_of_birth) {
        erros.push({
          email: "error",
          message: "Not informed the date of birth",
        });
      }

      if (!zip_code) {
        erros.push({ zip_code: "error", message: "Not informed the zip code" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      const updateTutor = await Tutors.findByIdAndUpdate(
        id,
        {
          name,
          phone,
          email,
          date_of_birth,
          zip_code,
        },
        { new: true }
      );

      if (!updateTutor) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `No tutor with id ${id}` });
      }

      return res.status(200).json(updateTutor);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

  static deleteTutor = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      const tutor = await Tutors.findById(id);
      if (!tutor) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `No tutor with id ${id}` });
      }

      if (tutor.pets.length === 0) {

          //continia pro resto do código 

      } else {
        return res.json({ message: `It is not possible to delete the tutor with one or more pets associated with it.` });
      }
      
      const tutorRemovido = await Tutors.findByIdAndRemove(id);

      if (!tutorRemovido) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `No tutor with id ${id}` });
      }

      return res.status(200).json({
        message: `status code 204 / Tutor with id:${id} was success deleted`,
      });

    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

}
