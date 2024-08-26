"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/passenger/use-cases/register-passenger.ts
var register_passenger_exports = {};
__export(register_passenger_exports, {
  RegisterPassengerUseCase: () => RegisterPassengerUseCase
});
module.exports = __toCommonJS(register_passenger_exports);
var RegisterPassengerUseCase = class {
  constructor(passengerRepository) {
    this.passengerRepository = passengerRepository;
  }
  async execute({
    code,
    name
  }) {
    const alreadyExists = await this.passengerRepository.findByCode(code);
    if (alreadyExists) {
      throw new Error("Passenger Already Exists");
    }
    const passenger = await this.passengerRepository.create({
      name,
      code
    });
    return { passenger };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterPassengerUseCase
});
