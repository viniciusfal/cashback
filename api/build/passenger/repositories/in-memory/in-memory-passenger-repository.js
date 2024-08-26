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

// src/passenger/repositories/in-memory/in-memory-passenger-repository.ts
var in_memory_passenger_repository_exports = {};
__export(in_memory_passenger_repository_exports, {
  InMemoryPassengerRepository: () => InMemoryPassengerRepository
});
module.exports = __toCommonJS(in_memory_passenger_repository_exports);
var import_crypto = require("crypto");
var InMemoryPassengerRepository = class {
  constructor() {
    this.items = [];
  }
  async list() {
    const passengers = this.items.map((passenger) => passenger);
    return passengers;
  }
  async create(data) {
    const passenger = {
      id: (0, import_crypto.randomUUID)(),
      name: data.name,
      code: data.code,
      cashBack: false
    };
    this.items.push(passenger);
    return passenger;
  }
  async findByCode(code) {
    const passenger = this.items.find((item) => item.code === code);
    if (!passenger) {
      return null;
    }
    return passenger;
  }
  async findById(id) {
    const passenger = this.items.find((item) => item.id === id);
    if (!passenger) {
      return null;
    }
    return passenger;
  }
  async setCashback(passenger_id) {
    const passengerIndex = this.items.findIndex(
      (item) => item.id === passenger_id
    );
    const currentCashback = this.items[passengerIndex].cashBack;
    this.items[passengerIndex].cashBack = !currentCashback;
    return this.items[passengerIndex].cashBack;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryPassengerRepository
});
