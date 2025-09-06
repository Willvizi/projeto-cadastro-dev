"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.desenvolvedor = void 0;
const typeorm_1 = require("typeorm");
const nivel_1 = require("./nivel");
let desenvolvedor = class desenvolvedor {
};
exports.desenvolvedor = desenvolvedor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], desenvolvedor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nivel_1.nivel, nivel => nivel.id),
    (0, typeorm_1.JoinColumn)({ name: "nivel_id" }),
    __metadata("design:type", nivel_1.nivel)
], desenvolvedor.prototype, "nivel", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], desenvolvedor.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 1 }),
    __metadata("design:type", String)
], desenvolvedor.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], desenvolvedor.prototype, "data_nascimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], desenvolvedor.prototype, "hobby", void 0);
exports.desenvolvedor = desenvolvedor = __decorate([
    (0, typeorm_1.Entity)("desenvolvedor")
], desenvolvedor);
