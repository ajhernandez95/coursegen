import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../util/supabase";
import handleSupabaseResponse from "../../../util/handleSupabaseResponse";
import { useSupabase } from "../../../context/SupabaseContext";

const useMyCourses = () => {
  const { user } = useSupabase();
  const { id: userId } = user || {};
  const { data, isLoading, isError } = useQuery(["myCourses"], () =>
    handleFetchMyCourses()
  );

  const handleFetchMyCourses = async () => {
    await supabase
      .from("course")
      .select("*")
      .eq("user_id", userId)
      .then((response) => {
        const res = handleSupabaseResponse(response);
      });
  };
  return {
    data,
    isLoading,
    isError,
  };
};

export default useMyCourses;
