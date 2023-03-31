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
} from "@chakra-ui/react";
import React from "react";
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
      {sections?.map(({ title, dates, description }, i) => {
        return (
          <Card>
            <CardHeader>
              <Heading size="md">
                {title} {dates && "(" + dates + ")"}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>{description}</Text>
            </CardBody>
            <CardFooter>
              <Button variant="outline" leftIcon={<DeleteIcon />}>
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
