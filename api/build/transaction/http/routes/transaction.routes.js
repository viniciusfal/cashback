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

// src/transaction/http/routes/transaction.routes.ts
var transaction_routes_exports = {};
__export(transaction_routes_exports, {
  transactionRoutes: () => transactionRoutes
});
module.exports = __toCommonJS(transaction_routes_exports);

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

// src/transaction/http/controllers/register-transaction.ts
var import_zod = require("zod");
async function registerTransaction(request, reply) {
  const registerBodySchema = import_zod.z.object({
    ticketPrice: import_zod.z.number(),
    passenger_code: import_zod.z.string(),
    local: import_zod.z.string(),
    point: import_zod.z.string()
  });
  const { ticketPrice, passenger_code, local, point } = registerBodySchema.parse(request.body);
  try {
    const registerTransactionUseCase = makeRegisterTransaction();
    await registerTransactionUseCase.execute({
      ticketPrice,
      passenger_code,
      local,
      point
    });
  } catch (err) {
    return reply.status(400).send();
  }
  return reply.status(200).send();
}

// src/middleware/verify.jws.ts
async function verifyJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unautorized." });
  }
}

// src/transaction/use-cases/list-transactions.ts
var ListTransaction = class {
  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }
  async execute() {
    const transactions = this.transactionsRepository.list();
    return transactions;
  }
};

// src/transaction/use-cases/factories/make-list-transactions.ts
function makeListTransactions() {
  const transactionsRepository = new PrismaTransactionRepository();
  const listTransactions2 = new ListTransaction(transactionsRepository);
  return listTransactions2;
}

// src/transaction/http/controllers/list-transactions.ts
async function listTransactions(_, reply) {
  try {
    const listTransactionsUseCase = makeListTransactions();
    const response = await listTransactionsUseCase.execute();
    return reply.status(200).send(response);
  } catch (err) {
    return reply.status(404).send();
  }
}

// src/transaction/http/routes/transaction.routes.ts
async function transactionRoutes(app) {
  app.post("/transaction", { onRequest: [verifyJWT] }, registerTransaction);
  app.get("/transaction", { onRequest: [verifyJWT] }, listTransactions);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transactionRoutes
});
