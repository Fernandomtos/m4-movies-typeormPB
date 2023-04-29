import { Repository } from "typeorm";
import {
  TMovie,
  TMovieResponse,
  TMovieUpdateRequest,
} from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { movieSchemaResponse } from "../schemas/movies.schemas";

const updateMoviesService = async (
  idMovie: number,
  movieData: TMovieUpdateRequest
): Promise<TMovieResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | null = await movieRepository.findOneBy({
    id: idMovie,
  });

  const newMovieData: Movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await movieRepository.save(newMovieData);

  const returnMovie: TMovie = movieSchemaResponse.parse(newMovieData);

  return returnMovie;
};

export default updateMoviesService;
