import express from "express";
import Bdjson from "../bdjson/bdjson";

export default class PetsController {
  static createPet = async (req: express.Request, res: express.Response) => {
    try {
      const { tutorId } = req.params;
      const tutor = Bdjson.findTutorId(tutorId);

      if (!tutor) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Tutor não encontrado" });
      }

      const { name, species, carry, weight, date_of_birth } = req.body;

      const errors = [];
      if (!name) {
        errors.push({ name: "error", message: "Nome não informado" });
      }

      if (!species) {
        errors.push({ species: "error", message: "Espécie não informada" });
      }

      if (!carry) {
        errors.push({ carry: "error", message: "Porte não informada" });
      }

      if (!weight) {
        errors.push({ weight: "error", message: "Peso não informado" });
      }

      if (!date_of_birth) {
        errors.push({ date_of_birth: "error", message: "Data de nascimento não informada" });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }


        const newPet = {
        id: Bdjson.minhaListaPet(tutorId) + 1,
        name: name,
        species: species,
        carry: carry,
        weight: weight,
        date_of_birth: date_of_birth,
      };

      Bdjson.createPet(tutorId, newPet);
      return res.status(201).json(newPet);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };

  static updatePet = async (req: express.Request, res: express.Response) => {
    try {
      const { petId, tutorId } = req.params;// o petId vem como string do corpo da requisição
      const petIdNumber: number = parseInt(petId); // fazendo isso corverto o "petId" para petIdNumber
      const { name, species, carry, weight, date_of_birth } = req.body;

      const tutor = Bdjson.findTutorId(tutorId);

      if (!tutor) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Tutor não encontrado" });
      }
      
      const pet = Bdjson.findPetId(tutorId, petId);
      if (!pet) {
        return res.status(404).json({ error: true, code: 404, message: "Pet não encontrado" });
      }

      const errors = [];
      if (!name) {
        errors.push({ name: "error", message: "Nome não informado" });
      }

      if (!species) {
        errors.push({ species: "error", message: "Espécie não informada" });
      }

      if (!carry) {
        errors.push({ carry: "error", message: "Raça não informada" });
      }

      if (!weight) {
        errors.push({ weight: "error", message: "Peso não informado" });
      }

      if (!date_of_birth) {
        errors.push({ date_of_birth: "error", message: "Data de nascimento não informada" });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const updatePet = {
        id: petIdNumber,
        name: name,
        species: species,
        carry: carry,
        weight: weight,
        date_of_birth: date_of_birth,
      };

      Bdjson.updatePet(tutorId, petId, updatePet);

      return res.status(200).json(updatePet);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };


  static deletePet = async (req: express.Request, res: express.Response) => {
    try {
      const { petId, tutorId } = req.params;

      const tutor = Bdjson.findTutorId(tutorId);

      if (!tutor) {
        return res.status(404).json({ error: true, code: 404, message: "Tutor não encontrado" });
      }

      const pet = Bdjson.findPetId(tutorId, petId);
      
      if (!pet) {
        return res.status(404).json({ error: true, code: 404, message: "Pet não encontrado" });
      }

      Bdjson.deletePet(tutorId, petId);

      return res.status(200).json({ message: `Pet id:${petId} do tutor id:${tutorId} foi deletado com sucesso` });

      } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

}