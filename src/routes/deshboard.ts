import express, { request, Request, Response, } from 'express';
export const dashboardRouter = express.Router();
import Notification from "../model/errorHelper";
import user from '../mongo-models/user-schema';
import multer = require('multer');

dashboardRouter.get("/", async (req, res) => {
    try {
        const totalRecords = await user.count({})
        const activeUser = await user.find({ Status: { $ne: "0" } }).count();
        const inactiveUser = await user.find({ Status: { $ne: "1" } }).count();

        res.json({ totalRecords,  activeUser, inactiveUser });
        console.log(totalRecords, activeUser, inactiveUser );


    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});



export default dashboardRouter;