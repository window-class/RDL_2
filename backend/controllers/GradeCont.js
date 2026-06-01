import Grade from '../models/Grade.js'

export const addGrade = async (req, res) => {
    try {
        const savedOne = await Grade.insertMany(req.body);
        res.status(201).json(savedOne);
    } catch (error) {
       res.status(500).json({msg:"Server Error"}) 
    }
}

export const getAllGrades = async (req, res) => {
    try {
        const foundList = await Grade.find().populate("CNI","CNI").lean().sort({Marks: -1});
        if(!foundList || foundList.length==0){
            return res.status(404).json({msg: "No Grade found"});
        }
        res.status(200).json(foundList);
    } catch (error) {
        res.status(500).json({msg:"Server Error"}) 
     }
}

export const getGradeById = async (req, res) => {
    try {
        const {id} = req.params;
        const foundId = await Grade.findById(id);
        if(!foundId){
            return res.status(404).json({msg:"Id not found"});
        }
        res.status(200).json(foundId);
    } catch (error) {
        res.status(500).json({msg:"Server Error"}) 
     }
}

export const deleteGrade = async (req, res) => {
    try {
      const {id} = req.params;
      const deleteOne = await Grade.findByIdAndDelete(id);
      if(!deleteOne){
        return res.status(404).json({msg:"Nothing to delete"});
      }  
      res.status(200).json({msg:"delete well"});
    } catch (error) {
        res.status(500).json({msg:"Server Error"}) 
     }
}

export const updateGrade =async (req, res) => {
    try {
        const {id} = req.params;
        const updateOne = await Grade.findByIdAndUpdate(id, req.body,{new: true});
        if(!updateOne){
          return res.status(404).json({msg:"Nothing to update"});
        }  
        res.status(201).json(updateOne);        
    } catch (error) {
        res.status(500).json({msg:"Server Error"}) 
     }
}