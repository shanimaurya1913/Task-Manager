import mongoose, { Document, Schema, Types } from "mongoose";

export type TaskStatus = "pending" | "completed";

export interface ITask extends Document {
  userId: Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
