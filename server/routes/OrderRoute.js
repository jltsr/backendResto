import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = new Router()

router.get('/',IndexController.OrderController.getAllOrder)
router.get('/:id_order',IndexController.OrderController.getOrderById)
router.post('/:id_user',IndexController.OrderController.createOrder)
router.put('/:id_order/:id_menu',IndexController.OrderController.updateOrder)
router.delete('/:id_order',IndexController.OrderController.deleteOrder)

export default router