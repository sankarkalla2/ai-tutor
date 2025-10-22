import { coursesParams } from "@/config/courses-params";
import { useQueryStates } from "nuqs";

export const useCoursesParams = (pageCount?: number) => {
  return useQueryStates({
    ...coursesParams,
  });
};
