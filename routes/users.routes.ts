
import express, { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken";

const router: Router = express.Router();

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
   verifyToken,
   verifyUser
], updateUser );

router.delete('/:id', [
   verifyToken,
   verifyAdmin
], deleteUser );

router.get('/:id', [
   verifyToken,
   verifyUser
], getUser );

router.get('/', [
   verifyToken,
   verifyAdmin
], getUsers );

export default router;

