import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FameCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as util from './util';
import * as fameValidator from '../fame/middleware';

import UserCollection from '../user/collection';

const router = express.Router();

router.put(
  '/:userId',
  [fameValidator.isFameExists],
  async (req: Request, res: Response) => {
    const user = await UserCollection.findOneByUserId(req.params.userId as string); 
    await FameCollection.updateOne(req.params.userId, req.body.newFame as unknown as number);
    res.status(200).json({
      message: `The fame for ${user.username} was updated successfully to ${req.body.newFame}.`,
    });
  }
);

router.post(
  '/:userId',
  [fameValidator.isFameExistsAlready],
  async (req: Request, res: Response) => {
    await FameCollection.addOne(req.params.userId);
    res.status(201).json({
      message: `Your fame was created successfully.`
    });
  }
);

/**
 * Get the fame of user
 *
 * @name GET /api/fame/:userId
 *
 * @return {number} - fame of the user
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
router.get(
  '/:userId',
  [
    fameValidator.isFameExists,
    fameValidator.isUserExists
  ],
  async (req: Request, res: Response) => {
    const user = await UserCollection.findOneByUserId(req.params.userId as string); 
    const response = await FameCollection.findOne(req.params.userId);
    res.status(200).json({
      message: `The fame for ${user.username} is ${response.fame_num}.`,
    });
  }
);

export {router as fameRouter};
