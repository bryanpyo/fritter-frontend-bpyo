import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import TierCollection from './collection';
import UserCollection from '../user/collection'
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as fameValidator from '../fame/middleware';
import * as tierValidator from '../tier/middleware'; 
import * as util from './util';

const router = express.Router();

/**
 * Get all the freets
 *
 * @name GET /api/freets
 *
 * @return {FreetResponse[]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
/**
 * Get freets by author.
 *
 * @name GET /api/freets?authorId=id
 *
 * @return {FreetResponse[]} - An array of freets created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
router.get(
  '/:userId',
  [
    tierValidator.isTierExists,
    tierValidator.isUserExists
  ],
  async (req: Request, res: Response) => {
    const user = await UserCollection.findOneByUserId(req.params.userId as string); 
    const response = await TierCollection.findOne(req.params.userId);
    res.status(200).json({
      message: `The tier for ${user.username} is ${response.tier}.`,
    });
  }
);

/**
 * Create
 *
 * @name POST /api/tiers
 *
 * @param {string} content - The content of the freet
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.post(
  '/:userId',
  [tierValidator.isTierExistsAlready,
  tierValidator.isValidTier],
  async (req: Request, res: Response) => {
    await TierCollection.addOne(req.params.userId, req.body.newTier as unknown as string);
    res.status(201).json({
      message: `Your tier was properly initialized to ${req.body.newTier}.`
    });
  }
);

/**
 * Modify a freet
 *
 * @name PUT /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {FreetResponse} - the updated freet
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - If the freetId is not valid
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.put(
  '/:userId',
  [tierValidator.isTierExists,
  tierValidator.isValidTier],
  async (req: Request, res: Response) => {
    const user = await UserCollection.findOneByUserId(req.params.userId as string); 
    await TierCollection.updateOne(req.params.userId, req.body.newTier as unknown as string);
    res.status(200).json({
      message: `The tier for ${user.username} was updated successfully to ${req.body.newTier}.`,
    });
  }
);

export {router as tierRouter};
