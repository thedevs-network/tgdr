import Review from "../models/Review";
import { IReviewQuery } from "../types";

export const create = (body: IReviewQuery) => Review.add(body);