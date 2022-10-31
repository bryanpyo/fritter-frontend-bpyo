import type {HydratedDocument, Types} from 'mongoose';
import type {Like} from './model';
import LikeModel from './model';
import UserCollection from '../user/collection';

class LikeCollection {
  static async addOne(user: Types.ObjectId | string, liked_freet: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    const like = new LikeModel({
      user: user,
      liked_freet: liked_freet
    });
    await like.save(); // Saves freet to MongoDB
    return like.populate('user');
  }

  static async findOne(user: Types.ObjectId | string, liked_freet: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    return LikeModel.findOne({user: user, liked_freet: liked_freet}).populate('user');
  }
}

export default LikeCollection;
