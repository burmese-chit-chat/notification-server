import express from 'express';
import NotificationController from '../controllers/NotificationController';

const notification_routes = express.Router();
notification_routes.get('/:receiver_id', NotificationController.get_all);
export default notification_routes;