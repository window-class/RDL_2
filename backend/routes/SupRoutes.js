import express from "express";

import {
   addSupervisor,
    getAllSupervisors,
    getSupervisorById,
    deleteSupervisor,
    updateSupervisor
} from "../controllers/SupervisorCont.js";

const SupRouter = express.Router();

SupRouter.post("/sup", addSupervisor);
SupRouter.get("/sup", getAllSupervisors);
SupRouter.get("/sup/:id", getSupervisorById);
SupRouter.delete("/sup/:id", deleteSupervisor);
SupRouter.put("/sup/:id", updateSupervisor);

export default SupRouter;