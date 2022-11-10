import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import LikeCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as likeValidator from '../like/middleware';
import * as util from './util';

const router = express.Router();

router.put(
  '/:freetId',
  [
    likeValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    likeValidator.isAlreadyLiked
  ],
  async (req: Request, res: Response) => {
    await LikeCollection.addOne(req.session.userId, req.params.freetId)
    res.status(200).json({
      message: 'You have liked the freet'
    });
  }
);

router.get(
  '/:freetId',
  [],
  async (req: Request, res: Response) => {
    // const user = await UserCollection.findOneByUserId(req.params.userId as string); 
    const response = await LikeCollection.getNumLikes(req.params.freetId);
    res.status(200).json({
      message: `The number of likes is ${response}.`,
      numLikes: response
    });
  }
);
export {router as likeRouter};
