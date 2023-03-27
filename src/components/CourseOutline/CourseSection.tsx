import { Box, Text } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";
import { CourseSection as Section } from "./types";

interface CourseSectionProps {
  section: Section;
}

const CourseSection = ({ section }: CourseSectionProps) => {
  const { title, description, dates } = section;

  return (
    <Box>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {title} {dates && "(" + dates + ")"}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>{description} </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default CourseSection;
