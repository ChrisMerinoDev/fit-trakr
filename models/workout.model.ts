import { Schema, Document, models, model, Types } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
  }[];
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const workoutSchema: Schema<IWorkout> = new Schema(
  {
    title: { type: String, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: String, required: true },
        reps: { type: String, required: true },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Workout = models.Workout || model<IWorkout>('Workout', workoutSchema);

export default Workout;
