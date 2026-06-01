//Grade (CandidateNationalId (FK), LicenseExamCategory, ObtainedMarks/20, Decision)
import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    CNI: {type: mongoose.Schema.Types.ObjectId, ref:'Candidate', required:true},
    LEC:{type: String, required: true},
    Marks: {type: String, required: true}
    //Decision will be on Get|Select
})
const Grade = mongoose.model("Grade", gradeSchema);
export default Grade;