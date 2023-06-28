import { Stack, Tag, Spinner, ToastPosition, Badge } from "@chakra-ui/react";
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
      case "failure":
        return "red";
      default:
        return "gray";
    }
  };

  const getFormattedStatus = (status: any) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      case "success":
        return "Success";
      case "timeout":
        return "Timeout";
      default:
        return "Failure";
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
          {item.reference_type.charAt(0).toUpperCase() +
            item.reference_type.slice(1)}{" "}
          - {item.reference_name}{" "}
          <Badge colorScheme={getToastVariant(item)} marginLeft="10px">
            {getFormattedStatus(item.generation_status)}
          </Badge>
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
      maxHeight: "100px",
      overflow: "auto",
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
