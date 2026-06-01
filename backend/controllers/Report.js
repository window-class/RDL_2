import Grade from '../models/Grade.js';
import Supervisor from '../models/Supervisor.js';

export const report = async (req, res) => {
    try {
        const result = await Grade.find()
              .populate("CNI","CNI Fname Lname Gender ExamDate DOB Pnumber");
        
        const supervisorMap = {};
        const supervisors = await Supervisor.find().populate("CNI", "_id");
        supervisors.forEach(sup => {
            supervisorMap[sup.CNI._id] = {
                SupervisorName: sup.SupervisorName,
                TitleOfSupervisor: sup.TitleOfSupervisor,
                Email: sup.Email
            };
        });

        const finalResult = result.map(item => {
            const supervisor = supervisorMap[item.CNI?._id] || {};
            return {
                CNI: item.CNI?.CNI,
                Fname: item.CNI?.Fname,
                Lname: item.CNI?.Lname,
                Gender: item.CNI?.Gender,
                DOB: item.CNI?.DOB,
                ExamDate: item.CNI?.ExamDate,
                Pnumber: item.CNI?.Pnumber,
                LEC: item.LEC,
                Marks: item.Marks,
                Status: item.Marks >= 12 ? 'Passed' : 'Failed',
                SupervisorName: supervisor.SupervisorName || 'Unassigned',
                TitleOfSupervisor: supervisor.TitleOfSupervisor || 'N/A',
                SupervisorEmail: supervisor.Email || 'N/A'
            };
        });

        // Calculate statistics
        const totalCandidates = finalResult.length;
        const passedCandidates = finalResult.filter(c => c.Marks >= 12).length;
        const failedCandidates = totalCandidates - passedCandidates;
        const passPercentage = totalCandidates > 0 ? ((passedCandidates / totalCandidates) * 100).toFixed(2) : 0;
        const avgMarks = totalCandidates > 0 
            ? (finalResult.reduce((sum, c) => sum + (c.Marks || 0), 0) / totalCandidates).toFixed(2) 
            : 0;

        const statistics = {
            totalCandidates,
            passedCandidates,
            failedCandidates,
            passPercentage,
            avgMarks
        };

        res.status(200).json({
            data: finalResult,
            statistics
        });
    } catch (error) {
        res.status(500).json({msg: error.message});    
    }
}
