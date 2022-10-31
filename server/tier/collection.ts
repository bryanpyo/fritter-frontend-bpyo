import type {HydratedDocument, Types} from 'mongoose';
import type {Tier} from './model';
import TierModel from './model';
import UserCollection from '../user/collection';


class TierCollection {
  static async addOne(userId: Types.ObjectId | string, newTier: string): Promise<HydratedDocument<Tier>> {
    const tier = new TierModel({
      userId,
      tier: newTier
    });
    await tier.save(); // Saves freet to MongoDB
    return tier.populate('userId');
  }

  /**
   * Find a freet by freetId
   *
   * @param {string} freetId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(userId: Types.ObjectId | string): Promise<HydratedDocument<Tier>> {
    return TierModel.findOne({userId: userId}).populate('userId');
  }

  /**
   * Get all the freets in the database
   *
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAll(): Promise<Array<HydratedDocument<Tier>>> {
    // Retrieves freets and sorts them from most to least recent
    return TierModel.find({}).populate('userId');
  }

  /**
   * Update a freet with the new content
   *
   * @param {string} freetId - The id of the freet to be updated
   * @param {string} content - The new content of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly updated freet
   */
  static async updateOne(userId: Types.ObjectId | string, newTier: string): Promise<HydratedDocument<Tier>> {
    const tier = await TierModel.findOne({userId: userId});
    tier.tier = newTier;
    await tier.save();
    return tier.populate('userId');
  }

}

export default TierCollection;
