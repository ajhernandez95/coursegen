import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import { RiBook2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CourseItemType, ICourse } from "../../types/course";

const CourseItem = ({
  course,
}: {
  course: ICourse<CourseItemType.LESSON | CourseItemType.MODULE>;
}) => {
  return (
    <Card variant="outline" border="solid 1px" m="0px 0px 20px 0px" w="500px">
      <CardBody>
        <Stack spacing="3">
          <RiBook2Line size="40" /> <Heading size="md">{course.title}</Heading>
          <Text>{course.description}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link to={"/course/" + course.id}>
            <Button variant="solid">View</Button>
          </Link>
          {/* TODO */}
          {/* <Button variant="ghost" colorScheme="red">
            Delete
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CourseItem;
