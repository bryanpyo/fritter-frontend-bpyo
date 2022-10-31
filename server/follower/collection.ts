import type {HydratedDocument, Types} from 'mongoose';
import type {Follower} from './model';
import FollowerModel from './model';

/**
 * This file contains a class with functionality to interact with users stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<User> is the output of the UserModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
class FollowerCollection {
  /**
   * Add a new user
   *
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @return {Promise<HydratedDocument<User>>} - The newly created user
   */
  static async addOne(followerId: string, followingId: string): Promise<HydratedDocument<Follower>> {
    const dateFollowed = new Date();

    const follower = new FollowerModel({followerId, followingId, dateFollowed});
    await follower.save(); // Saves user to MongoDB
    return follower;
  }

  // /**
  //  * Find a user by userId.
  //  *
  //  * @param {string} userId - The userId of the user to find
  //  * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
  //  */
  // static async findAllFollows(userId: Types.ObjectId | string): Promise<HydratedDocument<Follower>> {
  //   return FollowerModel.findOne({_id: userId});
  // }

  /**
   * Delete a follow from the collection.
   *
   * @param {string} userId - The userId of user to delete
   * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
   */
  static async deleteOne(followerId: Types.ObjectId | string, followingId :Types.ObjectId | string): Promise<boolean> {
    const user = await FollowerModel.deleteOne({followerId: followerId, followingId: followingId});
    return user !== null;
  }


  static async findOne(followerId: Types.ObjectId | string, followingId: Types.ObjectId | string): Promise<HydratedDocument<Follower>> {
    return FollowerModel.findOne({follwerId: followerId, followingId: followingId}).populate('followerId');
  }
}

export default FollowerCollection;