"use client";
import { Search } from "lucide-react";
import { parseAsIndex, parseAsInteger, useQueryState } from "nuqs";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useCoursesParams } from "@/hooks/use-courses-params";
import { useEffect, useState } from "react";
import { PAGINATION } from "@/config/constants";

interface SearchInCoursesProps {
  totalCourses: number;
}
export const SearchInCourses = ({ totalCourses }: SearchInCoursesProps) => {
  const [params, setParams] = useCoursesParams();
  const [localSearch, setLocalSearch] = useState(params.search);

  useEffect(() => {
    if (localSearch === "" && params.search !== "") {
      setParams({
        ...params,
        search: "",
        page: PAGINATION.DEFAULT_PAGE,
      });
    }

    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({
          ...params,
          search: localSearch,
          page: PAGINATION.DEFAULT_PAGE,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, params, setParams]);

  useEffect(() => {
    setLocalSearch(params.search);
  }, [params.search]);
  return (
    <div>
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {totalCourses} {totalCourses === 1 ? "course" : "courses"}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
