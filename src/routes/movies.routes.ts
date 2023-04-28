import { Router } from "express";
import {
  createMoviesControllers,
  listAllMoviesControllers,
} from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { movieSchemaRequest } from "../schemas/movies.schemas";
import ensureNameExistsMiddlewares from "../middlewares/ensureNameExists.middlewares";

const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  ensureDataIsValidMiddleware(movieSchemaRequest),
  ensureNameExistsMiddlewares,
  createMoviesControllers
);

movieRoutes.get("", listAllMoviesControllers);
export default movieRoutes;
