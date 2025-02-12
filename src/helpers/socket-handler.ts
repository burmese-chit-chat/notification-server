// socketHandler.ts
import { Server, Socket } from "socket.io";
import Notification from "../models/Notification";
import INotification from "../types/INotification";

export const setupSocket = (io: Server) => {
    const userSocketMap = new Map<string, string>();
    io.on("connection", (socket: Socket) => {
        console.log("a user connected : ", socket.id);

        socket.on("set_user_id", (userId: string) => {
            console.log(`User ${userId} connected with socket ID: ${socket.id}`);
            userSocketMap.set(userId, socket.id); // Store the mapping
        });

        socket.on("send_notification", async (data : INotification) => {
            try {
                const receiver_user_id = data.receiver_id;
                const receiver_socket_id = userSocketMap.get(receiver_user_id);
                const notification = new Notification({
                    sender_id : data.sender_id, 
                    receiver_id : data.receiver_id, 
                    title : data.title, 
                    body : data.body
                })
                await notification.save();
                if (receiver_socket_id) io.to(receiver_socket_id).emit("received_notification", { title : data.title, body : data.body });
            } catch (e) {
                console.log(e);
            }
        });

        socket.on("disconnect", () => {
            console.log("a client disconnected");
            // Clean up the user-socket mapping
            for (const [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    break;
                }
            }
        });
    });
};
