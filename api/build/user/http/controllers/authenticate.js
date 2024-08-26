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

// src/user/http/controllers/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  authenticate: () => authenticate
});
module.exports = __toCommonJS(authenticate_exports);

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

// src/user/use-cases/authenticate.ts
var import_bcryptjs = require("bcryptjs");
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
    const doesPasswordMatches = await (0, import_bcryptjs.compare)(password, user.password);
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
var import_zod = require("zod");
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod.z.object({
    name: import_zod.z.string(),
    password: import_zod.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticate
});
