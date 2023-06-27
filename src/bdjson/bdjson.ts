import { readFileSync, writeFileSync } from "fs";

type Tutor = {
  id: string;
};

const readJson = (filename: string) => {
  let arquivo = readFileSync(filename, {
    encoding: "utf8",
  });

  return JSON.parse(arquivo);
};

const saveJson = (filename: string, dados: string) => {
  writeFileSync(filename, dados, {
    encoding: "utf8",
  });
};

const filename = "src/bdjson/tutors.json";
const json = readJson(filename);

export default class Bdjson {
  static minhaLista = () => {
    let ultimoTutor = json[json.length - 1];
    if (ultimoTutor === undefined) {
      ultimoTutor = 0;
      return ultimoTutor;
    }
    return ultimoTutor.id;
  };

  static minhaListaPet = (tutorId: string) => {
    const tutor = json.find((tutor: Tutor) => tutor.id == tutorId);
    let ultimoPet = tutor.pets[tutor.pets.length - 1];
    if (ultimoPet === undefined) {
      ultimoPet = 0;
      return ultimoPet;
    }
    return ultimoPet.id;
  };

  static findTutors = () => {
    return json;
  };

  static findTutorId = (id: string) => {
    const tutor = json.find((tutor: Tutor) => tutor.id == id);
    return tutor;
  };

  static findPetId = (tutorId: string, petId: string) => {
    const tutor = json.find((tutor: Tutor) => tutor.id == tutorId);
    const pet = tutor.pets.find((pet: any) => pet.id == petId);
    return pet;
  };

  static createTutor = (tutor: any) => {
    json.push(tutor);
    saveJson(filename, JSON.stringify(json));
  };

  static createPet = (tutorId: string, pet: any) => {
    const tutor = json.find((tutor: Tutor) => tutor.id == tutorId);
    tutor.pets.push(pet);
    saveJson(filename, JSON.stringify(json));
  };

  static updateTutor = (id: string, tutor: any) => {
    const index = json.findIndex((tutor: Tutor) => tutor.id == id);
    json[index] = tutor;
    saveJson(filename, JSON.stringify(json));
  };

  static updatePet = (tutorId: string, petId: string, pet: any) => {
    const tutor = json.find((tutor: Tutor) => tutor.id == tutorId);
    const index = tutor.pets.findIndex((pet: any) => pet.id == petId);
    tutor.pets[index] = pet;
    saveJson(filename, JSON.stringify(json));
  };

  static deleteTutor = (id: string) => {
    const index = json.findIndex((tutor: Tutor) => tutor.id == id);
    json.splice(index, 1);
    saveJson(filename, JSON.stringify(json));
  };

  static deletePet = (tutorId: string, petId: string) => {
    const tutor = json.find((tutor: Tutor) => tutor.id == tutorId);
    const index = tutor.pets.findIndex((pet: any) => pet.id == petId);
    tutor.pets.splice(index, 1);
    saveJson(filename, JSON.stringify(json));
  };
}