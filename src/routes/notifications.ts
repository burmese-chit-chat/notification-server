import express from 'express';
import NotificationController from '../controllers/NotificationController';

const notification_routes = express.Router();
notification_routes.get('/:receiver_id', NotificationController.get_all);
notification_routes.put('/is-read/:_id', NotificationController.is_read);
notification_routes.get('/:receiver_id/count-unread', NotificationController.count_unread);
export default notification_routes;