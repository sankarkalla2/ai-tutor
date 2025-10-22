import CoursesView from "@/modules/courses/views/courses-view";
import { SearchParams } from "nuqs/server";

type Props = {
  searchParams: Promise<SearchParams>;
};
const YourCoursesPage = ({ searchParams }: Props) => {
  return <CoursesView searchParams={searchParams} />;
};

export default YourCoursesPage;
