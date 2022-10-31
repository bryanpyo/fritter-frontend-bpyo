import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {PopulatedFreet} from '../freet/model';

export type Like = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  liked_freet: Types.ObjectId;
};

const LikeSchema = new Schema<Like>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  liked_freet: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const LikeModel = model<Like>('Like', LikeSchema);
export default LikeModel;
