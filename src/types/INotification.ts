import mongoose from "mongoose";

interface INotification {
    id? : mongoose.Types.ObjectId;
    sender_id : string; 
    receiver_id : string; 
    title : string; 
    body : string; 
    is_read? : boolean;
    createdAt? : Date; 
    updatedAt? : Date;
}

export default INotification;