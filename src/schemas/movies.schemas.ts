import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().positive().int(),
  price: z.number().positive().int(),
});

const movieSchemaRequest = movieSchema.omit({ id: true });

const movieSchemaResponse = movieSchema.extend({});

const moviesSchemaResponse = z.array(movieSchemaResponse);

export {
  movieSchema,
  movieSchemaRequest,
  movieSchemaResponse,
  moviesSchemaResponse,
};
