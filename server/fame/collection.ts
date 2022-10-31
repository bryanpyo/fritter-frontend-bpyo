import type {HydratedDocument, Types} from 'mongoose';
import type {Fame} from './model';
import FameModel from './model';
import UserCollection from '../user/collection';


class FameCollection {
  // static async updateOne(userId: Types.ObjectId | string, newFame: number): Promise<HydratedDocument<Fame>> {
  //   const fame = await FameModel.findOne({_id: fameId});
  //   fame.fame_num = newFame;
  //   await fame.save();
  //   return fame.populate('authorId');
  // }

  static async addOne(userId: Types.ObjectId | string): Promise<void> {
    const fame = new FameModel({
      user: userId,
      fame_num: 0
    });
    await fame.save(); // Saves freet to MongoDB
  }

  static async updateOne(userId: Types.ObjectId | string, newFame: number): Promise<void> {
    const fame = await FameModel.findOne({user: userId});
    fame.fame_num = newFame;
    await fame.save();
  }

  static async findOne(userId: Types.ObjectId | string): Promise<HydratedDocument<Fame>> {
    return FameModel.findOne({user: userId}).populate('user');
  }

  

  // static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<Fame>> {
  //   const fame = await FameCollection.updateOneByUserId(userId); //update first
  //   return fame.populate('user');
  // }

  // /**
  //  * Add a fame to the collection
  //  *
  //  * @param {string} authorId - The id of the author of the freet
  //  * @param {string} content - The id of the content of the freet
  //  * @return {Promise<HydratedDocument<Freet>>} - The newly created freet
  //  */
  // static async addOne(authorId: Types.ObjectId | string): Promise<HydratedDocument<Fame>> {
  //   const user = await UserCollection.findOneByUserId(authorId);
  //   const fame = new FameModel({
  //     user: user,
  //     fame_num: 0
  //   });
  //   await fame.save(); // Saves freet to MongoDB
  //   return fame.populate('authorId');
  // }

  // /**
  //  * Get all the freets in the database
  //  *
  //  * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
  //  */
  // static async findAll(): Promise<Array<HydratedDocument<Fame>>> {
  //   // Retrieves freets and sorts them from most to least recent
  //   return FameModel.find({}).sort({dateModified: -1}).populate('authorId');
  // }

  // /**
  //  * Get all the freets in by given author
  //  *
  //  * @param {string} username - The username of author of the freets
  //  * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
  //  */
  // static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Fame>>> {
  //   const author = await UserCollection.findOneByUsername(username);
  //   return FameModel.find({authorId: author._id}).populate('authorId');
  // }

  // /**
  //  * Update a fame
  //  *
  //  * @param {string} freetId - The id of the freet to be updated
  //  * @param {string} content - The new content of the freet
  //  * @return {Promise<HydratedDocument<Freet>>} - The newly updated freet
  //  */
  // static async updateOne(freetId: Types.ObjectId | string, newFame: number): Promise<HydratedDocument<Fame>> {
  //   const fame = await FameModel.findOne({_id: freetId});
  //   fame.fame_num += 1;
  //   await fame.save();
  //   return fame.populate('authorId');
  // }

  // /**
  //  * Delete a freet with given freetId.
  //  *
  //  * @param {string} freetId - The freetId of freet to delete
  //  * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
  //  */
  // static async deleteOne(freetId: Types.ObjectId | string): Promise<boolean> {
  //   const freet = await FameModel.deleteOne({_id: freetId});
  //   return freet !== null;
  // }
}

export default FameCollection;
