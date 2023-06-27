"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readJson = (filename) => {
    let arquivo = (0, fs_1.readFileSync)(filename, {
        encoding: "utf8",
    });
    return JSON.parse(arquivo);
};
const saveJson = (filename, dados) => {
    (0, fs_1.writeFileSync)(filename, dados, {
        encoding: "utf8",
    });
};
const filename = "src/bdjson/tutors.json";
const json = readJson(filename);
class Bdjson {
}
Bdjson.minhaLista = () => {
    let ultimoTutor = json[json.length - 1];
    if (ultimoTutor === undefined) {
        ultimoTutor = 0;
        return ultimoTutor;
    }
    return ultimoTutor.id;
};
Bdjson.minhaListaPet = (tutorId) => {
    const tutor = json.find((tutor) => tutor.id == tutorId);
    let ultimoPet = tutor.pets[tutor.pets.length - 1];
    if (ultimoPet === undefined) {
        ultimoPet = 0;
        return ultimoPet;
    }
    return ultimoPet.id;
};
Bdjson.findTutors = () => {
    return json;
};
Bdjson.findTutorId = (id) => {
    const tutor = json.find((tutor) => tutor.id == id);
    return tutor;
};
Bdjson.findPetId = (tutorId, petId) => {
    const tutor = json.find((tutor) => tutor.id == tutorId);
    const pet = tutor.pets.find((pet) => pet.id == petId);
    return pet;
};
Bdjson.createTutor = (tutor) => {
    json.push(tutor);
    saveJson(filename, JSON.stringify(json));
};
Bdjson.createPet = (tutorId, pet) => {
    const tutor = json.find((tutor) => tutor.id == tutorId);
    tutor.pets.push(pet);
    saveJson(filename, JSON.stringify(json));
};
Bdjson.updateTutor = (id, tutor) => {
    const index = json.findIndex((tutor) => tutor.id == id);
    json[index] = tutor;
    saveJson(filename, JSON.stringify(json));
};
Bdjson.updatePet = (tutorId, petId, pet) => {
    const tutor = json.find((tutor) => tutor.id == tutorId);
    const index = tutor.pets.findIndex((pet) => pet.id == petId);
    tutor.pets[index] = pet;
    saveJson(filename, JSON.stringify(json));
};
Bdjson.deleteTutor = (id) => {
    const index = json.findIndex((tutor) => tutor.id == id);
    json.splice(index, 1);
    saveJson(filename, JSON.stringify(json));
};
Bdjson.deletePet = (tutorId, petId) => {
    const tutor = json.find((tutor) => tutor.id == tutorId);
    const index = tutor.pets.findIndex((pet) => pet.id == petId);
    tutor.pets.splice(index, 1);
    saveJson(filename, JSON.stringify(json));
};
exports.default = Bdjson;
