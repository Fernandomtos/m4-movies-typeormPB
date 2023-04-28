import { Request, Response } from "express";
import {
  TMoviesPagination,
  TMoviesRequest,
} from "../interfaces/movies.interfaces";
import createMoviesService from "../services/createMovies.service";
import listAllMoviesService from "../services/listAllMovies.service";

const createMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMoviesRequest = req.body;

  const newMovie = await createMoviesService(movieData);

  return res.status(201).json(newMovie);
};

const listAllMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number = Number(req.query.page);
  const perPage: number = Number(req.query.perPage);
  const sort: any = req.query.sort;
  const order: any = req.query.order;

  const movies: TMoviesPagination = await listAllMoviesService(
    page,
    perPage,
    sort,
    order
  );
  return res.json(movies);
};

export { createMoviesControllers, listAllMoviesControllers };
