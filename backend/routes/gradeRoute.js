import express from 'express'
import {
    addGrade,
    getAllGrades,
    getGradeById,
    deleteGrade,
    updateGrade
} from '../controllers/GradeCont.js'

const route2 = express.Router();

route2.post("/addGrade", addGrade);
route2.get("/getAllGrades", getAllGrades);
route2.get("/getGradeById/:id", getGradeById);
route2.delete("/deleteGrade/:id", deleteGrade);
route2.put("/updateGrade/:id", updateGrade);

export default route2;