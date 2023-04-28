import { NextFunction, Request, Response } from "express";
import {
  TMovieResponse,
  TMoviesRequest,
} from "../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

const ensureNameExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<TMovieResponse | void> => {
  const movieName: string = req.body.name;

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie: Movie | null = await movieRepository.findOne({
    where: {
      name: movieName,
    },
  });

  if (findMovie) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export default ensureNameExistsMiddlewares;
