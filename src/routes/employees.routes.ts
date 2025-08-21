import { Router } from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../db";
import { success } from "zod/v4/index.cjs";
import { error } from "console";

const router = Router();
const Employees = () => getCollection("Employees");
//ss

router.post("/", async (req, res) => {
    const result = await Employees().insertOne(req.body);
    res.json(result);
});


router.get("/", async (_req, res) => {
    const employees = await Employees().find().toArray();
    res.json(employees);
});
router.get("/:id", async (req, res) => {
    const employee = await Employees().findOne({ _id: new ObjectId(req.params.id) });
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.json(employee);
});

router.put("/:id", async (req, res) => {
    const result = await Employees().findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnDocument: "after" }
    );
    if (!result) {
        return res.status(404).json([{ error: "Not Found" }])
    }
    if(result)
    {
          return res.status(200).json([{success:"Succefully Updated"}]) 
    }
     res.json(result);
});



router.delete("/:id", async (req, res) => {
    console.log("Deleting ID:", req.params.id);
    
    const result = await Employees().findOneAndDelete({ _id: new ObjectId(req.params.id) });
    if (result)
         {
        return res.status(200).json({ success: "Deleted successfully" });
    }
});

export default router;
