// src/pages/BaitPage.jsx
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function BaitPage() {
  const spotPanelBg = useColorModeValue("white", "gray.800");
  const infoPanelBg = useColorModeValue("gray.100", "gray.700");
  const textDim = useColorModeValue("gray.700", "gray.200");
  const subtext = useColorModeValue("gray.600", "gray.300");
  const benefitHeadingColor = useColorModeValue("black", "white");

  return (
    <Container maxW="container.lg" py={20} textAlign="center">
      {/* Headline */}
      <Heading size="xl" mb={10}>
        Can You Spot the Fake?
      </Heading>

      {/* Spot-the-Fake panel with two carousels + button */}
      <Box bg={spotPanelBg} p={10} borderRadius="lg" shadow="md" mb={16}>
        <VStack spacing={10}>
          <HStack spacing={8} justify="center" align="start" w="full" flexWrap="wrap">
            {/* Real carousel */}
            <Box w={{ base: "100%", md: "45%" }}>
              <Heading size="md" mb={3}>
                Real
              </Heading>
              <Carousel
                images={[
                  "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop",
                ]}
                height="300px"
                borderRadius="md"
                autoplay
                interval={3500}
              />
            </Box>

            {/* Fake carousel */}
            <Box w={{ base: "100%", md: "45%" }}>
              <Heading size="md" mb={3}>
                Fake
              </Heading>
              <Carousel
                images={[
                  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&h=300&fit=crop",
                ]}
                height="300px"
                borderRadius="md"
                autoplay
                interval={3500}
              />
            </Box>
          </HStack>

          <Link to="/home">
            <Button colorScheme="orange" size="lg">
              Scan Review Now
            </Button>
          </Link>
        </VStack>
      </Box>

      {/* Paragraph panel */}
      <Box bg={infoPanelBg} p={10} borderRadius="lg" shadow="md" maxW="3xl" mx="auto">
        <Text fontSize="lg" color={textDim} mb={6}>
          <b>Fake reviews</b> are everywhere — influencing where you eat and how much
          you spend. Many of them are even written by AI. Our detector helps you
          separate fact from fiction, so you can make <b>dining choices with confidence</b>.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={10}>
          <Box>
            <Heading size="md" mb={2} color={benefitHeadingColor}>
              ✅ Authenticity
            </Heading>
            <Text color={subtext}>
              Identify <b>fake or suspicious reviews</b> before they mislead you.
            </Text>
          </Box>
          <Box>
            <Heading size="md" mb={2} color={benefitHeadingColor}>
              ⚡ Speed
            </Heading>
            <Text color={subtext}>
              Get <b>quick results</b> with AI-powered analysis in seconds.
            </Text>
          </Box>
          <Box>
            <Heading size="md" mb={2} color={benefitHeadingColor}>
              🍴 Smarter Dining
            </Heading>
            <Text color={subtext}>
              Make <b>confident decisions</b> about where and what to eat.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  );
}