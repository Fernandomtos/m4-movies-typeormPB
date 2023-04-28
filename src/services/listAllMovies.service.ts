import { Repository } from "typeorm";
import {
  TMoviesPagination,
  TMoviesResponse,
} from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { moviesSchemaResponse } from "../schemas/movies.schemas";
import { Movie } from "../entities";

const listAllMoviesService = async (
  page: number,
  perPage: number,
  sort: any,
  order: any
): Promise<TMoviesPagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let movies: Movie[] | undefined;

  movies = await movieRepository.find();
  const count: number = movies.length;

  let typeOrder = {};

  if (order === undefined || sort === undefined) {
    order = "asc";
  }

  if (sort === "price") {
    typeOrder = {
      price: order,
    };
  } else if (sort === "duration") {
    typeOrder = {
      duration: order,
    };
  } else {
    typeOrder = {
      id: order,
    };
  }

  if (!Number.isInteger(page) || page <= 0) {
    page = 1;
  }

  if (!Number.isInteger(perPage) || perPage <= 0 || perPage >= 5) {
    perPage = 5;
  }

  if (!page || !perPage) {
    movies = await movieRepository.find();
  } else {
    movies = await movieRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      order: typeOrder,
    });
  }

  let prevPage: string | null;
  let nextPage: string | null;

  const totalPages: number = Math.ceil(count / perPage);

  if (page <= 1) {
    prevPage = null;
  } else {
    prevPage = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`;
  }

  if (page > totalPages) {
    nextPage = null;
  } else {
    nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${perPage}`;
  }

  if (page === totalPages) {
    nextPage = null;
    prevPage = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`;
  }

  const returnMovies: TMoviesResponse = moviesSchemaResponse.parse(movies);

  return {
    prevPage: prevPage || null,
    nextPage: nextPage || null,
    count: count,
    data: returnMovies,
  };
};

export default listAllMoviesService;
