import { Router } from "express";
import authJWT from "../helpers/authJWT";
import IndexController from "../controller/IndexController";

const router = new Router()

router.get('/',IndexController.UserController.getAllUser)
router.get('/:id',IndexController.UserController.findUserById)
router.put('/:id',IndexController.UserController.updateUser)
router.post('/',IndexController.UserController.createUser)
router.delete('/:id',IndexController.UserController.deleteUser)
router.post('/signin', authJWT.authenticate,authJWT.login)
router.post("/refreshToken", authJWT.refreshToken);
router.delete("/logout", authJWT.logout);

//protect data
router.get("/pro", authJWT.verify, IndexController.UserController.getAllUser);

export default router;