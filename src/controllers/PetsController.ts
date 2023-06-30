import express from "express";
const Tutors = require("../models/Tutor");
const Pets = require("../models/Pet");

export default class PetsController {
  static findPets = async (req: express.Request, res: express.Response) => {
    try {
      const pets = await Pets.find({});
      return res.status(200).json({ pets });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

  static findPetId = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const pets = await Pets.findById(id);

      if (!pets) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `No pet with id ${id}` });
      }
      return res.status(200).json(pets);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

  static createPet = async (req: express.Request, res: express.Response) => {
    try {
      const { tutorId } = req.params;

      const tutor = await Tutors.findById(tutorId);

      if (!tutor) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `No tutor with id ${tutorId}`,
        });
      }

      const { name, species, carry, weight, date_of_birth } = req.body;

      const errors = [];

      if (!name) {
        errors.push({ name: "error", message: "Not informed the name" });
      }

      if (!species) {
        errors.push({ species: "error", message: "Not informed the species" });
      }

      if (!carry) {
        errors.push({ carry: "error", message: "Not informed the carry" });
      }

      if (!weight) {
        errors.push({ weight: "error", message: "Not informed the weight" });
      }

      if (!date_of_birth) {
        errors.push({
          date_of_birth: "error",
          message: "Not informed the date of birth",
        });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const savePet = new Pets({
        name,
        species,
        carry,
        weight,
        date_of_birth,
      });

      const newPet = await savePet.save();

      const tutorAtualizado = await Tutors.findByIdAndUpdate(
        tutorId,
        { $push: { pets: newPet } },
        { new: true }        
      );

      if (!tutorAtualizado) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `error updating tutor with id ${tutorId}` });
      }

      return res.status(201).json(newPet);
      
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

  static updatePet = async (req: express.Request, res: express.Response) => {
    try {
      const { petId, tutorId } = req.params;

      const { name, species, carry, weight, date_of_birth } = req.body;
      
      const tutor = await Tutors.findById(tutorId);

      if (!tutor) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `No tutor with id ${tutorId}`,
        });
      }

      const pets = await Pets.findById(petId);

      if (!pets) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `No pet with id ${petId}` });
      }

      const errors = [];

      if (!name) {
        errors.push({ name: "error", message: "Not informed the name" });
      }

      if (!species) {
        errors.push({ species: "error", message: "Not informed the species" });
      }

      if (!carry) {
        errors.push({ carry: "error", message: "Not informed the carry" });
      }

      if (!weight) {
        errors.push({ weight: "error", message: "Not informed the weight" });
      }

      if (!date_of_birth) {
        errors.push({
          date_of_birth: "error",
          message: "Not informed the date of birth",
        });
      }

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const updatePet = await Pets.findByIdAndUpdate(
        petId,
        {
          name,
          species,
          carry,
          weight,
          date_of_birth,
        },
        { new: true }
      );

      if (!updatePet) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `error updating pet with id ${tutorId}`,
        });
      }

      return res.status(200).json(updatePet);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };

  static deletePet = async (req: express.Request, res: express.Response) => {
    try {
      const { petId, tutorId } = req.params;

      const tutor = await Tutors.findById(tutorId);

      if (!tutor) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `No tutor with id ${tutorId}`,
        });
      }

      const tutorAtualizado = await Tutors.findByIdAndUpdate(
        tutorId,
        { $pull: { pets: petId } },
        { new: true }        
      );

      if (!tutorAtualizado) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `error updating tutor with id ${tutorId}` });
      }

      const petRemovido = await Pets.findByIdAndRemove(petId);

      if (!petRemovido) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: `No pet with id ${petId}` });
      }

      return res.status(200).json({
       message: `status code 204 / Pet with id:${petId} , from tutor with id:${tutorId}, was success deleted`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Internal server error" });
    }
  };
}
