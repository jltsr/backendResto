import { Router } from "express";
import IndexController from "../controller/IndexController";
import uploadDownload from "../helpers/UploadDownloadHelper";
const router = new Router()

router.get('/',IndexController.MenuController.getAllMenu)
router.get('/appetizer',IndexController.MenuController.getAllAppetizer)
router.get('/maincourse',IndexController.MenuController.getAllMainCourse)
router.get('/desserts',IndexController.MenuController.getAllDesert)
router.get('/drinks',IndexController.MenuController.getAllDrink)
router.post('/',uploadDownload.uploadSingleFile,IndexController.MenuController.createMenu)
router.get('/:id',IndexController.MenuController.findOneMenu)
router.put('/:id',uploadDownload.uploadSingleFile,IndexController.MenuController.updateMenu)
router.delete('/:id',IndexController.MenuController.deleteMenu)
router.get('/file/:filename',uploadDownload.showMenuImage)

export default router