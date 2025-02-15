// scripts/delete-read-notifications.js
import Notification from "../models/Notification";
import mongoose from "mongoose";
require("dotenv").config();

async function deleteReadNotifications() {
    try {
        const mongo_url = process.env.MONGO_URL;
        if (!mongo_url) throw new Error("cannot find database connection string");
        await mongoose.connect(process.env.MONGO_URL!, {
            serverSelectionTimeoutMS: 5000, // Reduce timeout to 5 seconds
        });

        console.log("Connected to MongoDB");
        const result = await Notification.deleteMany({ is_read: true });
        console.log(`Deleted ${result.deletedCount} read notifications`);
    } catch (err) {
        console.error("Failed to delete read notifications:", err);
    } finally {
        // Close the connection
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

deleteReadNotifications();
