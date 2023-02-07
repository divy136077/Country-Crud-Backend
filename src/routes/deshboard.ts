import express, { request, Request, Response, } from 'express';
export const dashboardRouter = express.Router();
import Notification from "../model/errorHelper";
import user from '../mongo-models/user-schema';
import multer = require('multer');

dashboardRouter.get("/", async (req, res) => {
    try {
        const totalRecords = await user.count({ Status: { $in: ["0", "1"] } })
        const activeUser = await user.count({ Status: { $in: "1" } });
        const inactiveUser = await user.count({ Status: { $in: "0" } });

        res.json({ totalRecords,  activeUser, inactiveUser });

    } catch (error) {
    
        res.status(500).send("Internal Server Error");
    }
});



export default dashboardRouter;