import { Stack, Tag, Spinner, ToastPosition } from "@chakra-ui/react";
import endpoints from "../../../services/endpoints";
import { getReq } from "../../../services/httpClient";

const useGenerationStatus = () => {
  const toastId = "generation-status";

  const handleGetGenerationStatus = async () => {
    return await getReq(endpoints.v1.generationLogs.get).then((res) => {
      return res;
    });
  };

  const pollGenrationStatus = (refetchFn: () => void) => {
    setTimeout(() => {
      refetchFn();
    }, 30000);
  };

  const getToastVariant = (item: any) => {
    switch (item.generation_status) {
      case "in_progress":
        return "blue";
      case "success":
        return "green";
      case "timeout":
        return "red";
      default:
        return "gray";
    }
  };

  const handleToastClick = (item: any) => {
    if (item.generation_status === "success") {
      console.log("go to item");
    }
  };

  const buildToastContent = (items: any) => (
    <Stack>
      {items?.map((item: any) => (
        <Tag
          key={item.id}
          colorScheme={getToastVariant(item)}
          cursor="pointer"
          onClick={() => handleToastClick(item)}
        >
          {item.reference_name}: {item.generation_status}{" "}
          {item.generation_status === "in_progress" && (
            <Spinner marginLeft="5px" size="xs" />
          )}
        </Tag>
      ))}
    </Stack>
  );

  const toastConfig = (items: any[]) => ({
    id: toastId,
    variant: "subtle",
    description: buildToastContent(items),
    status: "info" as "info",
    position: "bottom-left" as ToastPosition,
    duration: null,
    isClosable: true,
    containerStyle: {
      backgroundColor: "#1A1C1E",
    },
  });

  return {
    handleGetGenerationStatus,
    pollGenrationStatus,
    buildToastContent,
    toastConfig,
    toastId,
  };
};

export default useGenerationStatus;
