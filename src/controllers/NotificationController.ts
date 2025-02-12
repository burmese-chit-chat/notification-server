import { Request, Response } from "express";
import Notification from "../models/Notification";
import { send_error_response, send_response } from "../helpers/response";

const NotificationController = {
    get_all: async function (req: Request, res: Response) {
        try {
            const { receiver_id } = req.params;
            const notifications = await Notification.find({ receiver_id }).sort({ updatedAt: -1 });
            send_response(res, 200, notifications, "notifications found");
        } catch (e) {
            console.log(e);
            send_error_response(res, 404, "error fetching notifications");
        }
    },
    is_read: async function (req: Request, res: Response) {
        try {
            const { _id } = req.params;
            if (!_id) throw new Error("identifier must be provided");
            const notification = await Notification.findByIdAndUpdate(_id, { is_read: true });
            send_response(res, 200, notification, "notification updated");
        } catch (e) {
            console.log(e);
            send_error_response(res, 500, (e as Error).message);
        }
    },
    count_unread: async function (req: Request, res: Response) {
        try {
            const { receiver_id } = req.params;
            const counts = await Notification.countDocuments({ receiver_id, is_read: false });
            send_response(res, 200, counts, "unread notifications count");
        } catch (e) {
            console.log(e);
            send_error_response(res, 500, (e as Error).message);
        }
    },
};

export default NotificationController;
