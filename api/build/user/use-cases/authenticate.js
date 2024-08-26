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

// src/user/use-cases/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticateUSeCase: () => AuthenticateUSeCase
});
module.exports = __toCommonJS(authenticate_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUSeCase
});
