import  { Express, Request, Response } from 'express';

export const success = async(req:Request,res:Response,data:any)=>{
    res.status(200).json({
        status:true,
        result:data
    })
}

export const InternalError = async(req:Request,res:Response,data:any)=>{
    res.status(500).json({
        status:true,
        result:data
    })
}

export const NotFound = async(req:Request,res:Response,message:any)=>{
    res.status(404).json({

        status:"false",
        error:"not found",
        message:message,
    })
}

export const BadRequest = async(req:Request,res:Response,message:any)=>{
    res.status(400).json({
        status:"false",
        // error:"Bed request",
        message:message,
    })
}






// module.exports={success , InternalError , NotFound , BadRequest}

export default {success , InternalError , NotFound , BadRequest}