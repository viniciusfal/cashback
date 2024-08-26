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

// src/transaction/use-cases/register-transaction.ts
var register_transaction_exports = {};
__export(register_transaction_exports, {
  RegisterTransaction: () => RegisterTransaction
});
module.exports = __toCommonJS(register_transaction_exports);
var RegisterTransaction = class {
  constructor(transactionRepository, passengerRepository) {
    this.transactionRepository = transactionRepository;
    this.passengerRepository = passengerRepository;
  }
  async execute({
    ticketPrice,
    passenger_code,
    local,
    point
  }) {
    const transaction = await this.transactionRepository.create({
      ticketPrice,
      passenger_code,
      local: local.toUpperCase(),
      point: point.toUpperCase()
    });
    return transaction;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterTransaction
});
