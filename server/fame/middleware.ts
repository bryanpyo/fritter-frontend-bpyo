import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import FameCollection from '../fame/collection';

/**
 * Checks if fame exists for the user
 */
 const isFameExistsAlready = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.userId);
  const user = validFormat ? await FameCollection.findOne(req.params.userId) : '';
  if (user) {
    res.status(404).json({
      error: {
        userAlreadyExists: `Fame for user with ID ${req.params.userId} already exist.`
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
 const isFameExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.userId);
  const user = validFormat ? await FameCollection.findOne(req.params.userId) : '';
  if (user) {
    next();
  } else {
    res.status(404).json({
      error: {

        userAlreadyExists: `Fame for user with ID ${req.params.userId} does not exist.`
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

        userAlreadyExists: `User with ID ${req.params.userId} does not exist.`
      }
    });
    return;
  }
};


export {
  isFameExistsAlready,
  isFameExists,
  isUserExists
};
