import CoursesView from "@/modules/courses/views/courses-view";
import { redirectUnauthrizedUser } from "@/server/user";
import { SearchParams } from "nuqs/server";

type Props = {
  searchParams: Promise<SearchParams>;
};
const YourCoursesPage = async ({ searchParams }: Props) => {
  await redirectUnauthrizedUser();
  return <CoursesView searchParams={searchParams} />;
};

export default YourCoursesPage;
