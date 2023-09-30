import express from "express"
import { addTask, getTask, removeTask,editTask} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();



router.post("/addTask", requireAuth, addTask)
router.get("/getTask",requireAuth, getTask)
router.post("/removeTask",requireAuth, removeTask)
router.post("/editTask",requireAuth, editTask)

export default router;