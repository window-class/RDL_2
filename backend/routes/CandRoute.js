import express from 'express'
import {
    addCandidate,
    getAllCandidates,
    getCandidateById,
    deleteCandidate,
    updateCandidate
} from '../controllers/CandidateCont.js'

const route1 = express.Router();

route1.post("/addCandidate", addCandidate);
route1.get("/getAllCandidates", getAllCandidates);
route1.get("/getCandidateById/:id", getCandidateById);
route1.delete("/deleteCandidate/:id", deleteCandidate);
route1.put("/updateCandidate/:id", updateCandidate);

export default route1;