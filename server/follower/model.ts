import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Follower = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  followerId: string;
  followingId: string;
  dateFollowed: Date;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowerSchema = new Schema({
  // The user's username
  followerId: {
    type: String,
    required: true
  },
  // The user's password
  followingId: {
    type: String,
    required: true
  },
  dateFollowed: {
    type: Date,
    required: true
  }
});

const FollowerModel = model<Follower>('Follower', FollowerSchema);
export default FollowerModel;