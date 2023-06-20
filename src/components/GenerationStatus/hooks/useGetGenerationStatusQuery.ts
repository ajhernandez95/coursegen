import { useQuery } from "@tanstack/react-query";
import useGenerationStatus from "./useGenerationStatus";

const useGetGenerationStatusQuery = () => {
  const { handleGetGenerationStatus } = useGenerationStatus();

  return useQuery({
    queryKey: ["generationStatus"],
    queryFn: handleGetGenerationStatus,
    enabled: true,
  });
};

export default useGetGenerationStatusQuery;
