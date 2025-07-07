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
// Para poder trabajar con la tabla de la BD en el cod.
const sequelize_typescript_1 = require("sequelize-typescript");
let Arriendo = class Arriendo extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement // Hacerlo autoincrementarse
    ,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, allowNull: false }),
    __metadata("design:type", Number)
], Arriendo.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: false, field: 'fecha_inicio' }),
    __metadata("design:type", Date)
], Arriendo.prototype, "fechaInicio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true, field: 'fecha_fin' }),
    __metadata("design:type", Date)
], Arriendo.prototype, "fechaFin", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(6), allowNull: false, field: 'patente_vehiculo' }),
    __metadata("design:type", String)
], Arriendo.prototype, "patenteVehiculo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: false, field: 'tipo_vehiculo' }),
    __metadata("design:type", String)
], Arriendo.prototype, "tipoVehiculo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(10), allowNull: false, field: 'rut_cliente' }),
    __metadata("design:type", String)
], Arriendo.prototype, "rutCliente", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false, field: 'nombre_cliente' }),
    __metadata("design:type", String)
], Arriendo.prototype, "nombreCliente", void 0);
Arriendo = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'arriendos' })
], Arriendo);
exports.default = Arriendo;
//# sourceMappingURL=Arriendo.js.map