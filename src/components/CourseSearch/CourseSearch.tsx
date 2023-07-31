import { useEffect, useRef, useState } from "react";
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
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useCourseContext } from "../../context/CourseContext";
import useCourseSearchQuery from "./hooks/useCourseSearchQuery";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { postReq } from "../../services/httpClient";
import endpoints from "../../services/endpoints";
import { supabase } from "../../util/supabase";

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
  const {
    isOpen: isUpgradeOpen,
    onOpen: onOpenUpgrade,
    onClose: onCloseUpgrade,
  } = useDisclosure();

  const {
    isOpen: isDisclaimerOpen,
    onOpen: onOpenDisclaimer,
    onClose: onCloseDisclaimer,
  } = useDisclosure();

  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [courseCount, setCourseCount] = useState<number | null>(null);
  const [userTier, setUserTier] = useState(null);

  const onSubmit = () => {
    if (!isFetching) {
      if (userTier === "free" && courseCount && courseCount >= 2) {
        // If the user is on the free tier and they have already created 2 courses,
        // open the upgrade modal instead of initiating a search.
        onOpenUpgrade();
      } else {
        // If the user hasn't hit their limit, perform the search as usual
        refetch({ throwOnError: true });
        setIsSearching(true);
      }
    }
  };

  useEffect(() => {
    setSearch(search);
  }, [search]);

  useEffect(() => {
    const fetchUserProfileAndCourseCount = async () => {
      // Fetch the user's profile
      const session = await supabase.auth.getSession();
      console.log("here");
      if (session.error || !session.data.session?.user) {
        console.error("Error fetching user session:", session.error);
        return;
      }

      const { data: profile, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", session.data.session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }

      setUserTier(profile.subscription_tier);

      const { count, error: courseError } = await supabase
        .from("course")
        .select("*", { count: "exact", head: true })
        .eq("user_id", session.data.session.user.id);

      if (courseError) {
        console.error("Error fetching course count:", courseError);
        return;
      }

      // Update the course count
      setCourseCount(count ?? 0);
    };

    fetchUserProfileAndCourseCount();
  }, []);

  // Your frontend
  const initiateStripePurchase = async () => {
    try {
      console.log("here");
      const response = await postReq(
        endpoints.v1.stripeCreateCheckoutSession.post
      );

      console.log(response.data);
      // Extract the checkout URL from the response data and navigate to it
      const checkoutUrl = response.data.url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const displayCourseCount = () => {
    if (userTier === "free") {
      return (
        <>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Text fontSize="md">
              Free courses used:{" "}
              <Text
                as="span"
                fontWeight="bold"
                color={courseCount && courseCount >= 2 ? "red.500" : "green.500"}
              >
                {courseCount}/2
              </Text>
            </Text>
            <Button
              variant="link"
              color="blue.500"
              onClick={initiateStripePurchase}
              mb={2}
            >
              Upgrade to Pro
            </Button>
          </Box>
        </>
      );
    } else if (userTier === "pro") {
      return (
        <>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Text fontSize="md">
              Courses Created:{" "}
              <Text as="span" fontWeight="bold" color="green.500">
              {courseCount}/Unlimited
              </Text>
            </Text>
            <Button
              variant="link"
              color="blue.500"
              onClick={initiateStripePortal}
              mb={2}
            >
              Manage Membership
            </Button>
          </Box>
        </>
      );
    } else {
      return "";
    }
  };

  const initiateStripePortal = async () => {
    try {
      console.log("Creating portal session...");
      const response = await postReq(
        endpoints.v1.stripeCreatePortalSession.post
      );

      console.log(response.data);
      // Extract the portal URL from the response data and navigate to it
      const portalUrl = response.data.url;
      window.location.href = portalUrl;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="top" mb={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size={["2xl", "2xl", "3xl"]} mb="40px" textAlign="center">
            I'm CourseGen, an AI powered course generator.
          </Heading>
          <Text>{displayCourseCount()}</Text>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Input
              size={["md", "md", "lg"]}
              w="100%"
              mb="20px"
              maxW={900}
              placeholder="e.g., Introduction to Programming, History of Human Civilization"
              {...register("search")}
            ></Input>
            <Button size={["lg", "md", "lg"]} type="submit">
              Search
            </Button>
          </Box>
        </form>
      </Box>
      <Box position="absolute" right="20px" bottom="20px">
        <BsFillInfoCircleFill
          cursor="pointer"
          size="25px"
          onClick={onOpenDisclaimer}
        />
      </Box>
      <AlertDialog
        isOpen={isUpgradeOpen}
        leastDestructiveRef={closeRef}
        onClose={onCloseUpgrade}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Pro Upgrade Needed
            </AlertDialogHeader>

            <AlertDialogBody>
              You've reached your Free tier course limit. With Pro ($20/month),
              you get:
              <UnorderedList mt={2}>
                <ListItem>Unlimited course creation</ListItem>
                <ListItem>Early access to our Course Creation API</ListItem>
              </UnorderedList>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={closeRef} onClick={onCloseUpgrade}>
                Close
              </Button>
              <Button
                colorScheme="blue"
                onClick={initiateStripePurchase}
                ml={3}
              >
                Upgrade Now
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={closeRef}
        onClose={onCloseDisclaimer}
        isOpen={isDisclaimerOpen}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Disclaimer</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              This is a prototype. The results are not guaranteed to be
              accurate.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={closeRef} onClick={onCloseDisclaimer}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CourseSearch;
