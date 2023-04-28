import { z } from "zod";
import {
  movieSchema,
  movieSchemaRequest,
  movieSchemaResponse,
  moviesSchemaResponse,
} from "../schemas/movies.schemas";

type TMovie = z.infer<typeof movieSchema>;

type TMoviesRequest = z.infer<typeof movieSchemaRequest>;

type TMovieResponse = z.infer<typeof movieSchemaResponse>;

type TMoviesResponse = z.infer<typeof moviesSchemaResponse>;

type TMoviesPagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMoviesResponse;
};

export {
  TMovie,
  TMoviesRequest,
  TMovieResponse,
  TMoviesResponse,
  TMoviesPagination,
};
