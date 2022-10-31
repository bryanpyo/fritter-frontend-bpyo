import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Tier = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: Types.ObjectId;
  tier: String;
};

export const TIER_TYPE = {
  NONE: 1, 
  SILVER: 2,
  BLUE: 3
}

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const TierSchema = new Schema<Tier>({
  // The author userId
  userId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The tier of the user
  tier: {
    type: String,
    enum: ['BLUE', 'SILVER', 'NONE'],
    required: true
  }
});

const TierModel = model<Tier>('Tier', TierSchema);
export default TierModel;
