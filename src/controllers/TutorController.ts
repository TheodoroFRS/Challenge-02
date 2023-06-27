import express from "express";
import Bdjson from "../bdjson/bdjson";

export default class TutorController {

  static findTutors = async (req: express.Request, res: express.Response) => {
    return res.status(200).json(Bdjson.findTutors());
  };

  static findTutorId = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const tutor = Bdjson.findTutorId(id);

      if (!tutor) {
        return res.status(404).json({ error: true, code: 404, message: "Tutor não encontrado" });
      }
      return res.status(200).json(tutor);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };

  static createTutor = async (req: express.Request, res: express.Response) => {
    try {
      const { name, phone, email, date_of_birth, zip_code } = req.body;

      const erros = [];

      if (!name) {
        erros.push({ name: "error", message: "Nome não informado" });
      }

      if (!phone) {
        erros.push({phone: "error", message: "Telefone não informado" });
      }

      if (!email) {
        erros.push({email: "error", message: "Email não informado" });
      }

      if (!date_of_birth) {
        erros.push({email: "error", message: "Data de nascimento não informado" });
      }

      if (!zip_code) {
        erros.push({zip_code: "error", message: "CEP não informado" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
        
      const newTutor = {
        id: Bdjson.minhaLista() + 1,
        name: name,
        phone: phone,
        email: email,
        date_of_birth: date_of_birth,
        zip_code: zip_code,
        pets: [],
      };

      Bdjson.createTutor(newTutor);

      return res.status(201).json(newTutor);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };

  static updateTutor = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { name, phone, email, date_of_birth, zip_code } = req.body;

      const tutor = Bdjson.findTutorId(id);

      if (!tutor) {
        return res.status(404).json({ error: true, code: 404, message: "Tutor não encontrado" });
      }

      const erros = [];

      if (!name) {
        erros.push({ name: "error", message: "Nome não informado" });
      }

      if (!phone) {
        erros.push({phone: "error", message: "Telefone não informado" });
      }

      if (!email) {
        erros.push({email: "error", message: "Email não informado" });
      }

      if (!date_of_birth) {
        erros.push({email: "error", message: "Data de nascimento não informado" });
      }

      if (!zip_code) {
        erros.push({zip_code: "error", message: "CEP não informado" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }


      const updateTutor = {
        id: tutor.id,
        name: name,
        phone: phone,
        email: email,
        date_of_birth: date_of_birth,
        zip_code: zip_code,
        pets: tutor.pets,
      };

      Bdjson.updateTutor(id, updateTutor);

      return res.status(200).json(Bdjson.findTutorId(id));

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };

  static deleteTutor = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      const tutor = Bdjson.findTutorId(id);

      if (!tutor) {
        return res.status(404).json({ error: true, code: 404, message: "Tutor não encontrado" });
      }

      Bdjson.deleteTutor(id);

      return res.status(200).json({message: `Tutor id:${id} foi deletado com sucesso`});
    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };

}
