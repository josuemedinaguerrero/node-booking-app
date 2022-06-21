"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = exports.roomsRoute = exports.hotelsRoute = exports.authRoute = void 0;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.authRoute = auth_routes_1.default;
const hotels_routes_1 = __importDefault(require("./hotels.routes"));
exports.hotelsRoute = hotels_routes_1.default;
const rooms_routes_1 = __importDefault(require("./rooms.routes"));
exports.roomsRoute = rooms_routes_1.default;
const users_routes_1 = __importDefault(require("./users.routes"));
exports.usersRoute = users_routes_1.default;
