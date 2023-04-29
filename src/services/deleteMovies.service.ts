import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { TMovie } from "../interfaces/movies.interfaces";

const deleteMoviesService = async (idMovie: number): Promise<TMovie | void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieRemove: TMovie | null = await movieRepository.findOneBy({
    id: idMovie,
  });

  if (movieRemove) {
    await movieRepository.delete(movieRemove?.id);
  }

  return;
};

export default deleteMoviesService;
