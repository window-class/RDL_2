import Candidate from "../models/Candidate.js";

export const addCandidate = async (req, res) => {
    try {
        const newCandidate = new Candidate(req.body);
        const {CNI} = newCandidate;
        const candExist = await Candidate.findOne({CNI});
        if(candExist){
            return res.status(400).json({msg:"Candidate already exist"});
        }
        const savedOne = await newCandidate.save();
        res.status(201).json(savedOne);
    } catch (error) {
       res.status(500).json({msg:"Server Error"}) 
    }
}

export const getAllCandidates = async (req, res) => {
    try {
        const foundList = await Candidate.find();
        if(!foundList || foundList.length==0){
            return res.status(404).json({msg: "No candidate found"});
        }
        res.status(200).json(foundList);
    } catch (error) {
        res.status(500).json({msg:"Server Error"}) 
     }
}

export const getCandidateById = async (req, res) => {
    try {
        const {id} = req.params;
        const foundId = await Candidate.findById(id);
        if(!foundId){
            return res.status(404).json({msg:"Id not found"});
        }
        res.status(200).json(foundId);
    } catch (error) {
        res.status(500).json({msg:"Server Error"}) 
     }
}

export const deleteCandidate = async (req, res) => {
    try {
      const {id} = req.params;
      const deleteOne = await Candidate.findByIdAndDelete(id);
      if(!deleteOne){
        return res.status(404).json({msg:"Nothing to delete"});
      }  
      res.status(200).json({msg:"delete well"});
    } catch (error) {
        res.status(500).json({msg:"Server Error"}) 
     }
}

export const updateCandidate =async (req, res) => {
    try {
        const {id} = req.params;
        const updateOne = await Candidate.findByIdAndUpdate(id, req.body,{new: true});
        if(!updateOne){
          return res.status(404).json({msg:"Nothing to update"});
        }  
        res.status(201).json(updateOne);        
    } catch (error) {
        res.status(500).json({msg:"Server Error"}) 
     }
}