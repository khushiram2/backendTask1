import express from "express"
import { createNewEntry, deleteSingleEntry, getAllEntriesForLineChart, getAllEntriesForListView, getAllEntriesForPieChart, updateSingleEntry } from "../controller/entryController.js"

const router = express.Router()

router.post("/register", createNewEntry)
router.get("/all/list", getAllEntriesForListView)
router.get("/all/line", getAllEntriesForLineChart)
router.get("/all/pie", getAllEntriesForPieChart)
router.put("/update", updateSingleEntry)
router.delete("/delete", deleteSingleEntry)







const entryRouter = router

export default entryRouter;
