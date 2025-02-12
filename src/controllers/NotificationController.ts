import { Request, Response } from "express";
import Notification from "../models/Notification";
import { send_error_response, send_response } from "../helpers/response";

const NotificationController = {
    get_all : async function (req : Request, res : Response) {
        try {
            const { receiver_id } = req.params;
            const notifications = await Notification.find({ receiver_id }).sort({ updatedAt : -1 });
            send_response(res, 200, notifications, 'notifications found');
        } catch (e) {
            console.log(e);
            send_error_response(res, 404, 'error fetching notifications');
        }
    }
}

export default NotificationController;