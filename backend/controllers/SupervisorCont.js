import Supervisor from "../models/Supervisor.js";

export const addSupervisor = async (req, res) => {
    try {
        const savedOne = await Supervisor.insertMany(req.body);
        res.status(201).json(savedOne);
    } catch (error) {
       res.status(500).json({msg:"Server Error"}) 
    }
}

export const getAllSupervisors = async (req, res) => {
    try {
        const foundList = await Supervisor.find().populate('CNI', 'CNI').lean();
        res.status(200).json(foundList);
    } catch (error) {
        res.status(500).json({msg:"Server Error"});
    }
}

export const getSupervisorById = async (req, res) => {
    try {
        const {id} = req.params;
        const foundId = await Supervisor.findById(id);
        if(!foundId){
            return res.status(404).json({msg:"Id not found"});
        }
        res.status(200).json(foundId);
    }
        catch (error) {
        res.status(500).json({msg:"Server Error"});
     }
    }

export const deleteSupervisor = async (req, res) => {
    try {
      const {id} = req.params;
        const deleteOne = await Supervisor.findByIdAndDelete(id);
        if(!deleteOne){
        return res.status(404).json({msg:"Nothing to delete"});
      }  
      res.status(200).json({msg:"delete well"});
    } catch (error) {
        res.status(500).json({msg:"Server Error"});
     }
    }
 
export const updateSupervisor =async (req, res) => {
    try {
        const {id} = req.params;
        const updateOne = await Supervisor.findByIdAndUpdate(id, req.body,{new: true});
        if(!updateOne){
          return res.status(404).json({msg:"Nothing to update"});
        }
        res.status(201).json(updateOne);        
    } catch (error) {
        res.status(500).json({msg:"Server Error"});
     }
    }

