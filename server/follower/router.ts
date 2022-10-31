import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import FollowerCollection from './collection';
import * as userValidator from '../user/middleware';
import * as followerValidator from '../follower/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Add a follower
 *
 * @name PUT /api/users
 *
 * @param {string} username - The user's new username
 * @param {string} password - The user's new password
 * @return {UserResponse} - The updated user
 * @throws {403} - If user is not logged in
 * @throws {409} - If username already taken
 * @throws {400} - If username or password are not of the correct format
 */
router.put(
  '/:followingId',
  [
    userValidator.isUserLoggedIn,
    followerValidator.isAlreadyFollowing
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const user = await FollowerCollection.addOne(userId, req.params.followingId);
    res.status(201).json({
      message: `You have succesfully followed ${req.params.followingId}`
    });
  }
);

/**
 * Delete a follow
 *
 * @name DELETE /api/users
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 */
router.delete(
  '/:followingId',
  [
    userValidator.isUserLoggedIn,
    followerValidator.isNotFollowing
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    await FollowerCollection.deleteOne(userId, req.params.followingId);
    res.status(200).json({
      message: `You have succesfully unfollowed ${req.params.followingId}`
    });
  }
);

export {router as followerRouter};