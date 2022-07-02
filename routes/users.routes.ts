import express, { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken";

const router: Router = express.Router();

router.get("/:id", getUser);
router.get("/", getUsers);

router.put("/:id", [verifyToken, verifyUser], updateUser);

router.delete("/:id", [verifyToken, verifyAdmin], deleteUser);

export default router;
