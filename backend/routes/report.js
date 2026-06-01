import express from 'express'

import { report } from '../controllers/Report.js'

const route3 = express.Router();
      
     route3.get("/report", report);
     export default route3;