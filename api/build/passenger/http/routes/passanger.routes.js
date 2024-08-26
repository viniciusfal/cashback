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

// src/passenger/http/routes/passanger.routes.ts
var passanger_routes_exports = {};
__export(passanger_routes_exports, {
  passengerRoutes: () => passengerRoutes
});
module.exports = __toCommonJS(passanger_routes_exports);

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

// src/passenger/use-cases/register-passenger.ts
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

// src/passenger/use-cases/factories/make-register-passenger.ts
function makeRegisterPassenger() {
  const passengerRepository = new PrismaPassengerRepository();
  const registerPassengerUseCase = new RegisterPassengerUseCase(
    passengerRepository
  );
  return registerPassengerUseCase;
}

// src/passenger/http/controllers/registerPassenger.ts
var import_zod = require("zod");
async function registerPassenger(request, reply) {
  const registerBodySchema = import_zod.z.object({
    name: import_zod.z.string().min(4),
    code: import_zod.z.string().min(2)
  });
  const { name, code } = registerBodySchema.parse(request.body);
  try {
    const registerPassengerUseCase = makeRegisterPassenger();
    await registerPassengerUseCase.execute({
      name,
      code
    });
  } catch (err) {
    return reply.status(409).send({ message: err });
  }
  return reply.status(201).send();
}

// src/passenger/use-cases/list-passenger.ts
var ListPassenger = class {
  constructor(passengerRepository) {
    this.passengerRepository = passengerRepository;
  }
  async execute() {
    const passengers = await this.passengerRepository.list();
    return passengers;
  }
};

// src/passenger/use-cases/factories/make-list-passengers.ts
function makeListPassenger() {
  const passengerRepository = new PrismaPassengerRepository();
  const registerPassengerUseCase = new ListPassenger(passengerRepository);
  return registerPassengerUseCase;
}

// src/passenger/http/controllers/list-passengers.ts
async function listPassengers(_, reply) {
  try {
    const listPassengersUseCase = makeListPassenger();
    const response = await listPassengersUseCase.execute();
    return reply.status(200).send(response);
  } catch (err) {
    return reply.status(404).send({ message: err });
  }
}

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
var import_zod2 = require("zod");
async function setCashBack(request, reply) {
  const registerParams = import_zod2.z.object({
    passenger_id: import_zod2.z.string().uuid()
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

// src/middleware/verify.jws.ts
async function verifyJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unautorized." });
  }
}

// src/passenger/http/routes/passanger.routes.ts
async function passengerRoutes(app) {
  app.post("/passenger", { onRequest: [verifyJWT] }, registerPassenger);
  app.patch("/passenger/:passenger_id", { onRequest: [verifyJWT] }, setCashBack);
  app.get("/passenger", { onRequest: [verifyJWT] }, listPassengers);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  passengerRoutes
});
