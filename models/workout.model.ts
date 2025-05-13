import { Schema, Document, models, model } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  exercises: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const workoutSchema: Schema<IWorkout> = new Schema(
  {
    title: { type: String, required: true },
    exercises: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Workout = models.Workout || model<IWorkout>('Workout', workoutSchema);

export default Workout;
