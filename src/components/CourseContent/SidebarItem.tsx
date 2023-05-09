import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { ICourseItem, CourseItemType } from "../../types/course";
import useColorModePresets from "../../hooks/useColorModePresets";
import { useCourseContext } from "../../context/CourseContext";
import useCourseContent from "./hooks/useCourseContent";

const SidebarItem = ({
  item,
  showDescription = true,
}: {
  item: ICourseItem<CourseItemType.LESSON | CourseItemType.MODULE>;
  showDescription?: boolean;
}) => {
  const { title, dates, description, type, items } = item;
  const { activeBg } = useColorModePresets();
  const { course, activeLesson } = useCourseContext();
  const { handleSetActiveLesson } = useCourseContent();
  return (
    <Accordion
      defaultIndex={activeLesson.parent_id === item.id ? 0 : undefined}
      allowToggle
    >
      <AccordionItem>
        <h2>
          {type === CourseItemType.MODULE ? (
            <AccordionButton
              _hover={{
                bg: activeBg,
              }}
            >
              <Box as="span" flex="1" textAlign="left">
                {title} {dates && "(" + dates + ")"}
              </Box>
              {type === CourseItemType.MODULE && <AccordionIcon />}
            </AccordionButton>
          ) : (
            <UnorderedList>
              <ListItem
                _hover={{
                  bg: activeBg,
                }}
                bg={activeLesson?.id === item.id ? activeBg : ""}
                p="5px 0 5px 8px"
                cursor="pointer"
                onClick={() => handleSetActiveLesson(course.id, item)}
              >
                <Text mb={0}>
                  {title} {dates && "(" + dates + ")"}
                </Text>
              </ListItem>
            </UnorderedList>
          )}
        </h2>
        {type === CourseItemType.MODULE && (
          <AccordionPanel>
            {showDescription && <Text mb={2}>{description}</Text>}
            {items.map((childItem, i) => {
              return <SidebarItem key={i} item={childItem} />;
            })}
          </AccordionPanel>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarItem;
