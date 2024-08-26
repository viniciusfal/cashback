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

// src/transaction/http/controllers/list-transactions.ts
var list_transactions_exports = {};
__export(list_transactions_exports, {
  listTransactions: () => listTransactions
});
module.exports = __toCommonJS(list_transactions_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listTransactions
});
