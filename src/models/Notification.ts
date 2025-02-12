import mongoose from "mongoose";
import INotification from "../types/INotification";

const NotificationSchema = new mongoose.Schema<INotification>({
    sender_id : {
        type : String, 
        required : true, 
    }, 
    receiver_id : {
        type : String, 
        required : true, 
    }, 
    title : {
        type : String, 
        required : true
    }, 
    body : {
        type : String, 
        required : true
    }, 
    is_read : {
        type : Boolean, 
        required : false, 
        default : false
    }
}, { timestamps : true });

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
export default Notification;