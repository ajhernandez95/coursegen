import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Input,
  Button,
  Heading,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useCourseContext } from "../../context/CourseContext";
import useCourseSearchQuery from "./hooks/useCourseSearchQuery";
import { BsFillInfoCircleFill } from "react-icons/bs";

const CourseSearch = () => {
  const { setSearch, setIsSearching } = useCourseContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const search = watch("search");
  const { isFetching, refetch } = useCourseSearchQuery(search);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const onSubmit = () => {
    if (!isFetching) {
      refetch({ throwOnError: true });
      setIsSearching(true);
    }
  };

  useEffect(() => {
    setSearch(search);
  }, [search]);

  return (
    <>
      <Box display="flex" justifyContent="center" mb={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size={["lg", "2xl", "3xl"]} mb="40px" textAlign="center">
            I'm CourseGen, an AI powered course generator.
          </Heading>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Input
              size={["sm", "md", "lg"]}
              w="100%"
              mb="20px"
              maxW={900}
              placeholder="e.g., Introduction to Programming, History of Human Civilization"
              {...register("search")}
            ></Input>
            <Button size={["md", "md", "lg"]} type="submit">
              Search
            </Button>
            <Text>
              Disclaimer: This is a prototype. The results are not guaranteed to
              be accurate.
            </Text>
          </Box>
        </form>
      </Box>
      <Box position="absolute" right="20px" bottom="20px">
        <BsFillInfoCircleFill cursor="pointer" size="25px" onClick={onOpen} />
      </Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={closeRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Disclaimer</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            This is a prototype. The results are not guaranteed to be accurate.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={closeRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CourseSearch;
