import { Router } from "express";
import {
  createMoviesControllers,
  deleteMovieControllers,
  listAllMoviesControllers,
  updateMovieControllers,
} from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import {
  movieSchemaRequest,
  movieSchemaUpdateRequest,
} from "../schemas/movies.schemas";
import ensureNameExistsMiddlewares from "../middlewares/ensureNameExists.middlewares";
import ensureIdExistsMiddlewares from "../middlewares/ensureIdExists.middlewares";

const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  ensureDataIsValidMiddleware(movieSchemaRequest),
  ensureNameExistsMiddlewares,
  createMoviesControllers
);

movieRoutes.get("", listAllMoviesControllers);

movieRoutes.patch(
  "/:id",
  ensureIdExistsMiddlewares,
  ensureDataIsValidMiddleware(movieSchemaUpdateRequest),
  ensureNameExistsMiddlewares,
  updateMovieControllers
);

movieRoutes.delete("/:id", ensureIdExistsMiddlewares, deleteMovieControllers);

export default movieRoutes;
