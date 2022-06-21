"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.default.Router();
// router.get('/checkauthentication', verifyToken, ( _req: Request, res: Response ) => {
//    res.send('hello user, you are logged in');
// })
// router.get('/checkuser/:id', verifyUser, ( _req: Request, res: Response ) => {
//    res.send('Hello, user, you are logged in and you can delete you account');
// })
// router.get('/checkadmin/:id', verifyAdmin, ( _req: Request, res: Response ) => {
//    res.send('Hello, admin, you are logged in and you can delete all accounts');
// })
router.put('/:id', [
    verifyToken_1.verifyToken,
    verifyToken_1.verifyUser
], controllers_1.updateUser);
router.delete('/:id', [
    verifyToken_1.verifyToken,
    verifyToken_1.verifyAdmin
], controllers_1.deleteUser);
router.get('/:id', [
    verifyToken_1.verifyToken,
    verifyToken_1.verifyUser
], controllers_1.getUser);
router.get('/', [
    verifyToken_1.verifyToken,
    verifyToken_1.verifyAdmin
], controllers_1.getUsers);
exports.default = router;
