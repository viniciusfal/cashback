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

// src/transaction/use-cases/factories/make-register-transaction.ts
var make_register_transaction_exports = {};
__export(make_register_transaction_exports, {
  makeRegisterTransaction: () => makeRegisterTransaction
});
module.exports = __toCommonJS(make_register_transaction_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/transaction/repositories/prisma-repository/prisma-transaction-repository.ts
var PrismaTransactionRepository = class {
  async list() {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  }
  async create(data) {
    const transaction = await prisma.transaction.create({
      data
    });
    return transaction;
  }
};

// src/transaction/use-cases/register-transaction.ts
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

// src/passenger/repositories/prisma-repository/prisma-passenger-repository.ts
var PrismaPassengerRepository = class {
  async list() {
    const passengers = await prisma.passenger.findMany();
    return passengers;
  }
  async create(data) {
    const passenger = await prisma.passenger.create({
      data
    });
    return passenger;
  }
  async findByCode(code) {
    const passenger = await prisma.passenger.findUnique({
      where: {
        code
      }
    });
    return passenger;
  }
  async findById(id) {
    const passenger = await prisma.passenger.findUnique({
      where: {
        id
      }
    });
    return passenger;
  }
  async setCashback(passenger_id) {
    const passenger = await prisma.passenger.findUnique({
      where: {
        id: passenger_id
      }
    });
    const newCashbackvalue = !passenger?.cashBack;
    const passengerUpdate = await prisma.passenger.update({
      where: {
        id: passenger_id
      },
      data: {
        cashBack: newCashbackvalue
      }
    });
    return passengerUpdate.cashBack;
  }
};

// src/transaction/use-cases/factories/make-register-transaction.ts
function makeRegisterTransaction() {
  const transactionsRepository = new PrismaTransactionRepository();
  const passengersRepository = new PrismaPassengerRepository();
  const registerTransactionUseCase = new RegisterTransaction(
    transactionsRepository,
    passengersRepository
  );
  return registerTransactionUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeRegisterTransaction
});
