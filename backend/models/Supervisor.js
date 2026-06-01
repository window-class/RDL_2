import mongoose from 'mongoose';

const supervisorSchema = new mongoose.Schema({
    SupervisorId: { type: String, unique: true, required: true },
    SupervisorName: { type: String, required: true },
    TitleOfSupervisor: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Adress: { type: String, required: true },
    CNI:{type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true}
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);
export default Supervisor;