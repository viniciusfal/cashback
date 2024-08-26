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

// src/transaction/repositories/in-memory/in-memory-transaction-repository.ts
var in_memory_transaction_repository_exports = {};
__export(in_memory_transaction_repository_exports, {
  InMemoryTransactionRepository: () => InMemoryTransactionRepository
});
module.exports = __toCommonJS(in_memory_transaction_repository_exports);
var import_crypto = require("crypto");
var InMemoryTransactionRepository = class {
  constructor() {
    this.items = [];
  }
  async list() {
    const transactions = this.items.map((transaction) => transaction);
    return transactions;
  }
  async create(data) {
    const transaction = {
      id: (0, import_crypto.randomUUID)(),
      passenger_code: data.passenger_code,
      ticketPrice: data.ticketPrice,
      local: data.local,
      point: data.point,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.items.push(transaction);
    return transaction;
  }
  async setTotal() {
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryTransactionRepository
});
