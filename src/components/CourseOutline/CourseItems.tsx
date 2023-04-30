import { Text } from "@chakra-ui/layout";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CourseItem } from "../../types/course";

const CourseItems = ({ items }: { items: CourseItem[] }) => {
  const templateColumns = useBreakpointValue({
    base: "repeat(auto-fill, minmax(200px, 1fr))",
    sm: "repeat(auto-fill, minmax(300px, 1fr))",
  });

  return Number(items?.length) > 0 ? (
    <SimpleGrid spacing={4} templateColumns={templateColumns}>
      {items?.map(({ title, dates, description }, i) => {
        return (
          <Card variant="outline" key={i}>
            <CardHeader>
              <Heading size="md">
                {title} {dates && "(" + dates + ")"}
              </Heading>
            </CardHeader>
            <CardBody pt="0">
              <Text textAlign="left">{description}</Text>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  ) : null;
};

export default CourseItems;
