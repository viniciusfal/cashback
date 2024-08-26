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

// src/user/repositories/in-memory/in-memory-user-repository.ts
var in_memory_user_repository_exports = {};
__export(in_memory_user_repository_exports, {
  InMemoryUserRepository: () => InMemoryUserRepository
});
module.exports = __toCommonJS(in_memory_user_repository_exports);
var import_crypto = require("crypto");
var InMemoryUserRepository = class {
  constructor() {
    this.items = [];
  }
  async create(data) {
    const user = {
      id: (0, import_crypto.randomUUID)(),
      name: data.name,
      password: data.password
    };
    this.items.push(user);
    return user;
  }
  async findByName(username) {
    const user = this.items.find((item) => item.name === username);
    if (!user) {
      return null;
    }
    return user;
  }
  async list() {
    const users = this.items.map((item) => {
      return item;
    });
    return users;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryUserRepository
});
