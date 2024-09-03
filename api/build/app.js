"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));

// src/user/http/controllers/register.ts
var import_zod = require("zod");
var import_bcryptjs = require("bcryptjs");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/user/repositories/prisma-repository/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async create(data) {
    const user = await prisma.user.create({
      data
    });
    return user;
  }
  async list() {
    const users = await prisma.user.findMany();
    return users;
  }
  async findByName(userName) {
    const user = await prisma.user.findUnique({
      where: {
        name: userName
      }
    });
    return user;
  }
};

// src/user/use-cases/register.ts
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    password
  }) {
    const alreadyExists = await this.usersRepository.findByName(name);
    if (alreadyExists) {
      throw new Error("Username already exists");
    }
    const user = await this.usersRepository.create({
      name,
      password
    });
    return { user };
  }
};

// src/user/use-cases/factories/make-register.ts
function makeRegister() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);
  return registerUseCase;
}

// src/user/http/controllers/register.ts
async function register(request, reply) {
  const registerBodySchema = import_zod.z.object({
    name: import_zod.z.string().min(4),
    password: import_zod.z.string().min(6)
  });
  const { name, password } = registerBodySchema.parse(request.body);
  const password_hash = await (0, import_bcryptjs.hash)(password, 6);
  try {
    const registerUseCase = makeRegister();
    await registerUseCase.execute({
      name,
      password: password_hash
    });
  } catch (err) {
    return reply.status(409).send({ message: err });
  }
  return reply.status(201).send();
}

// src/user/use-cases/authenticate.ts
var import_bcryptjs2 = require("bcryptjs");
var AuthenticateUSeCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    password
  }) {
    const user = await this.usersRepository.findByName(name);
    if (!user) {
      throw new Error("Invalid credentials errors");
    }
    const doesPasswordMatches = await (0, import_bcryptjs2.compare)(password, user.password);
    if (!doesPasswordMatches) {
      throw new Error("Invalid credentials errors");
    }
    return { user };
  }
};

// src/user/use-cases/factories/make-authenticate.ts
function makeAuthenticate() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUsecase = new AuthenticateUSeCase(usersRepository);
  return authenticateUsecase;
}

// src/user/http/controllers/authenticate.ts
var import_zod2 = require("zod");
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod2.z.object({
    name: import_zod2.z.string(),
    password: import_zod2.z.string()
  });
  const { name, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUseCase = makeAuthenticate();
    const { user } = await authenticateUseCase.execute({
      name,
      password
    });
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id
        }
      }
    );
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d"
        }
      }
    );
    return reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true
    }).status(200).send({
      token
    });
  } catch (err) {
    return reply.status(400).send({ message: err });
  }
}

// src/user/http/controllers/refresh.ts
async function refresh(request, reply) {
  await request.jwtVerify({ onlyCookie: true });
  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub
      }
    }
  );
  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d"
      }
    }
  );
  return reply.setCookie("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true
  }).status(200).send({
    token
  });
}

// src/user/http/routes/user.routes.ts
async function usersRoutes(app2) {
  app2.post("/users", register);
  app2.post("/session", authenticate);
  app2.patch("/token/refresh", refresh);
}

// src/app.ts
var import_jwt = __toESM(require("@fastify/jwt"));
var import_cookie = __toESM(require("@fastify/cookie"));
var import_multipart = __toESM(require("@fastify/multipart"));

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
var import_zod3 = require("zod");
async function registerPassenger(request, reply) {
  const registerBodySchema = import_zod3.z.object({
    name: import_zod3.z.string().min(4),
    code: import_zod3.z.string().min(2)
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
var import_zod4 = require("zod");
async function setCashBack(request, reply) {
  const registerParams = import_zod4.z.object({
    passenger_id: import_zod4.z.string().uuid()
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
async function passengerRoutes(app2) {
  app2.post("/passenger", { onRequest: [verifyJWT] }, registerPassenger);
  app2.patch("/passenger/:passenger_id", { onRequest: [verifyJWT] }, setCashBack);
  app2.get("/passenger", { onRequest: [verifyJWT] }, listPassengers);
}

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
var import_zod5 = require("zod");
async function registerTransaction(request, reply) {
  const registerBodySchema = import_zod5.z.object({
    ticketPrice: import_zod5.z.number(),
    passenger_code: import_zod5.z.string(),
    local: import_zod5.z.string(),
    point: import_zod5.z.string()
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
async function transactionRoutes(app2) {
  app2.post("/transaction", { onRequest: [verifyJWT] }, registerTransaction);
  app2.get("/transaction", { onRequest: [verifyJWT] }, listTransactions);
}

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod6 = require("zod");
var envSchema = import_zod6.z.object({
  NODE_ENV: import_zod6.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: import_zod6.z.string(),
  PORT: import_zod6.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.log("Invalid environment variables", _env.error.format());
  throw new Error("Inv\xE1lid environment variables.");
}
var env = _env.data;

// src/app.ts
var import_cors = __toESM(require("@fastify/cors"));

// src/passenger/http/controllers/import-passengers.ts
var import_fastify_multer = __toESM(require("fastify-multer"));
var import_csv_parse = require("csv-parse");
var import_stream = require("stream");
var storage = import_fastify_multer.default.memoryStorage();
var upload = (0, import_fastify_multer.default)({ storage });
async function importPassengers() {
  app.register(import_fastify_multer.default.contentParser);
  app.post(
    "/upload",
    { onRequest: [verifyJWT], preHandler: upload.single("file") },
    async (request, reply) => {
      const file = request.file;
      if (!file) {
        return reply.status(400).send({ error: "No file uploaded" });
      }
      const passengers = [];
      const parser = (0, import_csv_parse.parse)({
        columns: true,
        skip_empty_lines: true
      });
      const stream = import_stream.Readable.from(file.buffer.toString());
      stream.pipe(parser);
      parser.on("readable", () => {
        let record;
        while (record = parser.read()) {
          passengers.push(record);
        }
      });
      parser.on("error", (err) => {
        app.log.error(err.message);
        return reply.status(500).send({ error: "Failed to parse CSV file" });
      });
      parser.on("end", async () => {
        try {
          for (const passenger of passengers) {
            const registerPassengerUseCase = makeRegisterPassenger();
            await registerPassengerUseCase.execute({
              name: passenger.name,
              code: passenger.code
            });
          }
          return reply.send({
            status: "success",
            passengers: passengers.length
          });
        } catch (err) {
          app.log.error(err);
          return reply.status(500).send({ error: "Failed to save passengers to database" });
        }
      });
    }
  );
}

// src/transaction/http/controllers/import-transactions.ts
var import_fastify_multer2 = __toESM(require("fastify-multer"));
var import_csv_parse2 = require("csv-parse");
var import_stream2 = require("stream");
var storage2 = import_fastify_multer2.default.memoryStorage();
var upload2 = (0, import_fastify_multer2.default)({ storage: storage2 });
async function importTransactions() {
  app.register(import_fastify_multer2.default.contentParser);
  app.post(
    "/upload-credits",
    { onRequest: [verifyJWT], preHandler: upload2.single("file") },
    async (request, reply) => {
      const file = request.file;
      if (!file) {
        return reply.status(400).send({ error: "No file uploaded" });
      }
      const transactions = [];
      const parser = (0, import_csv_parse2.parse)({
        columns: true,
        skip_empty_lines: true
      });
      const stream = import_stream2.Readable.from(file.buffer.toString());
      stream.pipe(parser);
      parser.on("readable", () => {
        let record;
        while (record = parser.read()) {
          transactions.push(record);
        }
      });
      parser.on("error", (err) => {
        app.log.error(err.message);
        return reply.status(500).send({ error: "Failed to parse CSV file" });
      });
      parser.on("end", async () => {
        try {
          console.log("Transactions:", transactions);
          for (const transaction of transactions) {
            const registerTransactionUseCase = makeRegisterTransaction();
            await registerTransactionUseCase.execute({
              passenger_code: transaction.passenger_code,
              ticketPrice: parseInt(transaction.ticketPrice.toString()),
              local: transaction.local,
              point: transaction.point
            });
            console.log(transactions);
          }
          return reply.send({
            status: "success",
            transactions: transactions.length
          });
        } catch (err) {
          app.log.error(err);
          return reply.status(500).send({ error: "Failed to save transactions to database" });
        }
      });
    }
  );
}

// src/app.ts
var app = (0, import_fastify.default)();
var allowedOrigins = ["http://localhost:3333", "http://localhost:5173"];
app.register(import_cors.default, {
  credentials: true,
  allowedHeaders: ["content-type"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  origin: (origin, cb) => {
    if (!origin) {
      cb(null, true);
      return;
    }
    if (allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed"), false);
    }
  }
});
app.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: "10m"
  }
});
app.register(import_multipart.default);
app.register(import_cookie.default);
app.register(importPassengers);
app.register(importTransactions);
app.register(usersRoutes);
app.register(passengerRoutes);
app.register(transactionRoutes);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
