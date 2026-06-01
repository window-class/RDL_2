//(CandidateNationalId (PK), FirstName, LastName, Gender, DOB, ExamDate, PhoneNumber (UniqueKey)) 
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    CNI: {type: String, unique: true, required: true},
    Fname:{type: String, required: true},
    Lname:{type: String, required: true},
    Gender:{type: String, required: true},
    DOB:{type: String, required: true},
    ExamDate:{type: String, required: true},
    Pnumber:{type: String, required: true, unique: true}
})

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;