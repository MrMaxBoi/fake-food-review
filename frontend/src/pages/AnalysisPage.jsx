// src/pages/AnalysisPage.jsx
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Progress,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";

export default function AnalysisPage() {
  const location = useLocation();
  const restaurant = location.state?.restaurant || "Unknown";
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`/api/restaurant/${encodeURIComponent(restaurant)}`);
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurant]);

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!analysis) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Text>Failed to load analysis</Text>
      </Box>
    );
  }

  // Helper to render stars
  const renderStars = (count) => {
    return (
      <Text fontSize="2xl" fontWeight="extrabold" color="yellow.400">
        {"★".repeat(count)}
        <Text as="span" color="gray.300">
          {"☆".repeat(5 - count)}
        </Text>
      </Text>
    );
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="4xl" py={10} textAlign="center">
        {/* Top Heading */}
        <Heading fontSize="7xl" fontWeight="black" mb={2}>
          {analysis.reviews?.filter(r => r.isAI).length || 0}
        </Heading>
        <Text fontSize="3xl" fontWeight="semibold" mb={10}>
          Potential AI comments
        </Text>

        {/* Reviews */}
        <VStack spacing={6} mb={12}>
          {analysis.reviews?.map((r, i) => (
            <Box
              key={i}
              bg="white"
              p={6}
              borderRadius="lg"
              shadow="lg"
              maxW="3xl"
              textAlign="left"
              borderLeft={r.isAI ? "6px solid red" : "6px solid green"}
            >
              {renderStars(r.stars)}
              <Text fontSize="md" mt={2}>
                "{r.text}"
              </Text>
              {r.isAI && (
                <Badge colorScheme="red" mt={2}>
                  AI Score: {r.aiScore}%
                </Badge>
              )}
            </Box>
          )) || []}
        </VStack>

        {/* NEW Section: AI Images */}
        <Box mt={32}>
          <Text fontSize="3xl" fontWeight="semibold" mb={10}>
            Potential AI images within reviews
          </Text>

          <Box
            bg="white"
            p={6}
            borderRadius="2xl"
            shadow="xl"
            maxW="4xl"
            mx="auto"
          >
            <Carousel
              images={analysis.images || []}
              height="500px"
              borderRadius="lg"
              autoplay={true}
              interval={4000}
              effect="slide"
              duration={700}
              easing="ease-in-out"
            />
          </Box>

          {/* Verdict Section */}
          <Box
            mt={24}
            bg="white"
            p={8}
            borderRadius="xl"
            shadow="lg"
            maxW="4xl"
            mx="auto"
            textAlign="left"
            borderLeft="6px solid black"
          >
            <Heading as="h3" fontSize="2xl" mb={4}>
              Verdict
            </Heading>
            <Text fontSize="lg" color="gray.700">
              "{analysis.verdict}"
            </Text>
          </Box>

          {/* AI Content Index Section */}
          <Box
            mt={24}
            bg="white"
            p={10}
            borderRadius="xl"
            shadow="lg"
            maxW="4xl"
            mx="auto"
            textAlign="center"
          >
            <Heading as="h3" fontSize="2xl" mb={6}>
              AI Content Index
            </Heading>

            {/* Progress Bar */}
            <Progress
              value={analysis.aiContentIndex || 0}
              size="lg"
              colorScheme={analysis.aiContentIndex > 50 ? "red" : "green"}
              borderRadius="md"
              mb={4}
            />
            <Text fontSize="xl" fontWeight="bold" mb={6}>
              {analysis.aiContentIndex || 0}% AI Detected
            </Text>

            {/* Badge */}
            <Badge
              colorScheme={analysis.aiContentIndex > 50 ? "red" : "green"}
              px={6}
              py={3}
              borderRadius="full"
              fontSize="lg"
              mb={4}
            >
              {analysis.verdict}
            </Badge>

            {/* Footnote */}
            <Text fontSize="sm" color="gray.600" mt={2}>
              (Based on language style & repetition patterns)
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}