import express, { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken";

const router: Router = express.Router();

router.get("/", [verifyToken, verifyAdmin], getUsers);
router.get("/:id", [verifyToken, verifyUser], getUser);

router.put("/:id", [verifyToken, verifyUser], updateUser);

router.delete("/:id", [verifyToken, verifyAdmin], deleteUser);

export default router;
