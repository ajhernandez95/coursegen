import useMyCourses from "./hooks/useMyCourses";

const MyCourses = () => {
  const { data, isLoading, isError } = useMyCourses();
  console.log(data, isLoading, isError);
  return <div>MyCourses</div>;
};

export default MyCourses;
