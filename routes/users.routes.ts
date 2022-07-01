import express, { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken";

const router: Router = express.Router();

router.put("/:id", [verifyToken, verifyUser], updateUser);

router.delete("/:id", [verifyToken, verifyAdmin], deleteUser);

router.get("/:id", [verifyToken, verifyUser], getUser);

router.get("/", [verifyToken, verifyAdmin], getUsers);

export default router;
