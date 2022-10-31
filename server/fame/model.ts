import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

export type Fame = {
  _id: Types.ObjectId; 
  user: User;
  fame_num: number;
};

const FameSchema = new Schema<Fame>({
  // The author userId
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  fame_num: {
    type: Schema.Types.Number,
    required: true
  }
});

const FameModel = model<Fame>('Fame', FameSchema);
export default FameModel;
