import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { CourseSection as Section } from "./types";

interface CourseSectionProps {
  sections: Section[] | undefined;
}

const CourseSections = ({ sections }: CourseSectionProps) => {
  return Number(sections?.length) > 0 ? (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {sections?.map(({ id, title, dates, description }, i) => {
        return (
          <Card variant="outline" key={i}>
            <CardHeader>
              <Box display="flex" justifyContent="space-between">
                <Heading size="md">
                  {title} {dates && "(" + dates + ")"}
                </Heading>
              </Box>
            </CardHeader>
            <CardBody pt="0">
              <Text>{description}</Text>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  ) : null;
};

export default CourseSections;
