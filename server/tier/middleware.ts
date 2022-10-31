import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import TierCollection from '../tier/collection';
import { TIER_TYPE } from './model';

/**
 * Checks if fame exists for the user
 */
 const isTierExistsAlready = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.userId);
  const user = validFormat ? await TierCollection.findOne(req.params.userId) : '';
  if (user) {
    res.status(404).json({
      error: {
        tierAlreadyExists: `Tier for user with ID ${req.params.userId} already exist.`
      }
    });
    return;
    
  } else {
    next();
  }
};

/**
 * Checks if fame exists for the user
 */
 const isTierExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.userId);
  const user = validFormat ? await TierCollection.findOne(req.params.userId) : '';
  if (user) {
    next();
  } else {
    res.status(404).json({
      error: {

        tierDoesNotExist: `Tier for user with ID ${req.params.userId} does not exist.`
      }
    });
    return;
  }
};

/**
 * Checks if a user exists
 */
 const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.userId);
  const user = validFormat ? await UserCollection.findOneByUserId(req.params.userId) : '';
  if (user) {
    next();
  } else {
    res.status(404).json({
      error: {

        userDoesNotExist: `User with ID ${req.params.userId} does not exist.`
      }
    });
    return;
  }
};

/**
 * Checks if valid tier
 */
 const isValidTier = async (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(TIER_TYPE).includes(req.body.newTier)) {
    next();
  } else{
    res.status(400).json({
      error: {
        inputError: `The tier must be BLUE, SILVER or NONE. Your input was ${req.body.newTier}`
      }
    });
    return;
  }
};


export {
  isTierExistsAlready,
  isTierExists,
  isUserExists,
  isValidTier
};
