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

// src/passenger/use-cases/set-cashback.ts
var set_cashback_exports = {};
__export(set_cashback_exports, {
  SetCashBackUseCase: () => SetCashBackUseCase
});
module.exports = __toCommonJS(set_cashback_exports);
var SetCashBackUseCase = class {
  constructor(passengerRepository) {
    this.passengerRepository = passengerRepository;
  }
  async execute({ passenger_id }) {
    const passenger = await this.passengerRepository.findById(passenger_id);
    if (!passenger) {
      throw new Error("This passenger is not exists");
    }
    const passengerUpdate = await this.passengerRepository.setCashback(passenger_id);
    return passengerUpdate;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SetCashBackUseCase
});
