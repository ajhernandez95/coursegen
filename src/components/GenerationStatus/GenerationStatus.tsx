import { useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import useGenerationStatus from "./hooks/useGenerationStatus";
import useGetGenerationStatusQuery from "./hooks/useGetGenerationStatusQuery";
/**
 * Checks if a user is generating any content
 * and if so continues to poll for generation status updates till no more content is generating
 * @name GenerationStatus
 * @description This component is used to display a notification when a user has content generating.
 * @returns null
 */
const GenerationStatus = () => {
  const { data, refetch } = useGetGenerationStatusQuery();
  const { pollGenrationStatus, buildToastContent, toastConfig, toastId } =
    useGenerationStatus();
  const statusList: any[] = data?.data;
  const toast = useToast();
  const toastIdRef = useRef<any>();

  useEffect(() => {
    if (data?.data?.length || toast.isActive(toastId)) {
      if (toastIdRef.current) {
        toast.update(toastIdRef.current, toastConfig(data?.data));
      }

      if (
        statusList?.some((item) => item.generation_status === "in_progress")
      ) {
        pollGenrationStatus(refetch);
      }
      if (!toast.isActive(toastId)) {
        toastIdRef.current = toast(toastConfig(data?.data));
      }
    }
  }, [statusList, data]);

  return null;
};

export default GenerationStatus;
