import { response } from "express";
import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(errorHandler(403, "Not authorized to create comment"));
    }
    const comment = new Comment({ content, postId, userId });
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
