import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  TMovieResponse,
  TMoviesRequest,
} from "../interfaces/movies.interfaces";
import { movieSchemaResponse } from "../schemas/movies.schemas";

const createMoviesService = async (
  movieData: TMoviesRequest
): Promise<TMovieResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);

  const returnMovie: TMovieResponse = movieSchemaResponse.parse(movie);

  return returnMovie;
};

export default createMoviesService;
