import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  CardFooter,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CourseSection as Section } from "./types";

interface CourseSectionProps {
  sections: Section[] | undefined;
}

const CourseSections = ({ sections }: CourseSectionProps) => {
  const bg = useColorModeValue("white", "whiteAlpha.900");
  const color = useColorModeValue("black", "black");
  return Number(sections?.length) > 0 ? (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(500px, 1fr))"
    >
      {sections?.map(({ id, title, dates, description }, i) => {
        return (
          <Card key={i}>
            <CardHeader>
              <Box display="flex" justifyContent="space-between">
                <Heading size="md">
                  {title} {dates && "(" + dates + ")"}
                </Heading>
              </Box>
            </CardHeader>
            <CardBody>
              <Text>{description}</Text>
            </CardBody>
            <CardFooter>
              <Button
                variant="solid"
                // isDisabled={true}
                leftIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </SimpleGrid>
  ) : null;
};

export default CourseSections;
