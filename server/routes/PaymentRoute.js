import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = new Router()

router.get('/', IndexController.PaymentController.getAllPayment )
router.get('/:id',IndexController.PaymentController.getPaymentById)
router.post('/:id', IndexController.PaymentController.createPayment)
router.put('/:id',IndexController.PaymentController.editPayment)
router.delete('/:id', IndexController.PaymentController.deletePayment)

export default router