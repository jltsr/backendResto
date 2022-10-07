import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = new Router()

router.get('/:id_user',IndexController.CartController.getCart)
router.get('/:id_user/:id_cart', IndexController.CartController.getCartId)
router.post('/:id_user',IndexController.CartController.insertCart)
router.put('/:id_user/:id_cart',IndexController.CartController.updateCart)
router.delete('/:id_user/:id_cart',IndexController.CartController.deleteCart)
export default router