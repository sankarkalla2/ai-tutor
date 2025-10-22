import { PAGINATION } from "@/config/constants";
import z from "zod";

export const getCoursesSearchParamsSchema = z.object({
  pageSize: z.number().default(PAGINATION.DEFAULT_PAGE_SIZE),
  page: z
    .number()
    .min(PAGINATION.MIN_PAGE_SIZE)
    .max(PAGINATION.MAX_PAGE_SIZE)
    .default(PAGINATION.DEFAULT_PAGE),
  search: z.string().default(""),
});
