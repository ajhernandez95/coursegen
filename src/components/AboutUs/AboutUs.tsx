import { Box, Heading, Text } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Box p={["1rem 2rem", "1rem 5rem", "1rem 10rem"]}>
      <Heading>About Us</Heading>
      <Text>
        Welcome to CourseGen, the future of personalized learning. We're an
        innovative AI-driven platform committed to revolutionizing the learning
        landscape. We empower you to generate an infinite array of highly
        customized courses, delivering an unrivaled breadth of content tailored
        perfectly to your unique learning journey. Simply provide your desired
        course topic, and within moments, you'll be presented with a
        meticulously crafted course outline, featuring a diverse mix of lessons
        and modules. This intuitive outline is designed to meet your unique
        learning objectives and adapt seamlessly to your educational needs.
      </Text>
      <br />
      <Text>
        Stay tuned with CourseGen. We're not just providing a learning platform;
        we're crafting a unique adventure, designed to cater to your personal
        educational journey. We invite you to join us and discover the joy of
        personalized learning, tailored for you, by you.
      </Text>
      <Heading mt="20px">Connect With Us</Heading>
      <Text>
        Alexander Hernandez -{" "}
        <a href="https://twitter.com/pseudoaluxander">@pseudoaluxander</a> |
        alex@coursegen.ai
      </Text>
      <Text>
        Cole Gottdank -{" "}
        <a href="https://twitter.com/coleywoleyyy">@coleywoleyyy</a> |
        cole@coursegen.ai
      </Text>
    </Box>
  );
};

export default AboutUs;
