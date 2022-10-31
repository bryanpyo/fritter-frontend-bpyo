import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

export type ReFreet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: Types.ObjectId;
  originalId: Types.ObjectId;
  dateCreated: Date;
  content: string;
  dateModified: Date;
};

const ReFreetSchema = new Schema<ReFreet>({
  // The author userId
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  originalId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The date the freet was created
  dateCreated: {
    type: Date,
    required: true
  },
  // The content of the freet
  content: {
    type: String,
    required: true
  },
  // The date the freet was modified
  dateModified: {
    type: Date,
    required: true
  }
});

const ReFreetModel = model<ReFreet>('ReFreet', ReFreetSchema);
export default ReFreetModel;
