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
var ImageNetNode_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageNetNode = void 0;
const typeorm_1 = require("typeorm");
let ImageNetNode = ImageNetNode_1 = class ImageNetNode {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ImageNetNode.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "integer" }),
    __metadata("design:type", Number)
], ImageNetNode.prototype, "parent_fk_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], ImageNetNode.prototype, "wnid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], ImageNetNode.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], ImageNetNode.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ImageNetNode_1, (node) => node.children),
    __metadata("design:type", ImageNetNode)
], ImageNetNode.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImageNetNode_1, (node) => node.parent),
    __metadata("design:type", Array)
], ImageNetNode.prototype, "children", void 0);
ImageNetNode = ImageNetNode_1 = __decorate([
    (0, typeorm_1.Entity)("imagenet_hierarchy")
], ImageNetNode);
exports.ImageNetNode = ImageNetNode;
