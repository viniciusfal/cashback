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

// src/passenger/http/controllers/set-chashback.ts
var set_chashback_exports = {};
__export(set_chashback_exports, {
  setCashBack: () => setCashBack
});
module.exports = __toCommonJS(set_chashback_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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

// src/passenger/use-cases/set-cashback.ts
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

// src/passenger/use-cases/factories/make-set-cashback.ts
function makeSetCashback() {
  const passengerRepository = new PrismaPassengerRepository();
  const setCashbackUseCase = new SetCashBackUseCase(passengerRepository);
  return setCashbackUseCase;
}

// src/passenger/http/controllers/set-chashback.ts
var import_zod = require("zod");
async function setCashBack(request, reply) {
  const registerParams = import_zod.z.object({
    passenger_id: import_zod.z.string().uuid()
  });
  const { passenger_id } = registerParams.parse(request.params);
  try {
    const setCashBackUseCase = makeSetCashback();
    await setCashBackUseCase.execute({
      passenger_id
    });
  } catch (err) {
    return reply.status(400).send({ message: err });
  }
  return reply.status(200).send();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setCashBack
});
