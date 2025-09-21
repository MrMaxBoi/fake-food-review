// src/pages/HomePage.jsx
import {
  Box, Button, Container, Heading, Input, Text, VStack,
  SimpleGrid, useToast, useColorModeValue, IconButton,
  InputGroup, InputLeftElement, HStack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdLocationOn, MdMap } from "react-icons/md"; // Icons
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // new state
  const toast = useToast();

  const panelBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.600");
  const textDim = useColorModeValue("gray.700", "gray.200");
  const subtext = useColorModeValue("gray.600", "gray.300");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  // demo restaurant list
  const restaurantList = [
    "Super Kitchen Chilli Pan Mee Sri Petaling",
    "Burger King Sri Petaling",
    "Burgerstack",
    "Burger Guy Petaling Jaya",
    "McDonald's Bukit Jalil",
  ];

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 1) {
      const filtered = restaurantList.filter((r) =>
        r.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (value) => {
    setQuery(value);
    setSuggestions([]); // close dropdown
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // navigate to analysis page with restaurant
    navigate("/analysis", { state: { restaurant: query } });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        as="section"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
        px={4}
        pt={0}
      >
        <Heading
          fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
          mb={6}
          bgGradient="linear(to-r, orange.400, pink.500)"
          bgClip="text"
          fontWeight="extrabold"
          lineHeight="shorter"
        >
          Fake Food Review Detector
        </Heading>

        <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="semibold" mb={4} color={subtext}>
          Our AI scans thousands of reviews to separate fact from fiction.
        </Text>

        <Text
          fontSize={{ base: "md", md: "xl" }}
          mb={10}
          color={subtext}
          maxW="2xl"
          lineHeight="taller"
        >
          Quickly detect <b>AI-generated</b> or <b>suspicious</b> restaurant reviews,
          so you can make <b>dining choices with confidence</b>.
        </Text>

        <Box as="form" onSubmit={handleSubmit} w="100%" maxW="xl" position="relative">
          <VStack spacing={6} align="stretch">
            <HStack spacing={3} align="stretch" position="relative">
              <InputGroup size="lg" flex="1">
                <InputLeftElement pointerEvents="none">
                  <MdLocationOn color="gray" size="22" />
                </InputLeftElement>
                <Input
                  placeholder="e.g., Sushi King Pavilion"
                  aria-label="Restaurant name"
                  size="lg"
                  fontSize="lg"
                  value={query}
                  onChange={handleChange}
                  pl="2.8rem"
                  autoComplete="off"
                />
              </InputGroup>

              <IconButton
                aria-label="Pick on map"
                icon={<MdMap size={22} />}
                size="lg"
                colorScheme="blue"
                onClick={onOpen}
              />

              {/* Dropdown suggestions */}
              {suggestions.length > 0 && (
                <Box
                  position="absolute"
                  top="100%"
                  left="0"
                  w="full"
                  bg={cardBg}
                  shadow="md"
                  borderRadius="md"
                  zIndex={10}
                  mt={1}
                >
                  {suggestions.map((s, i) => (
                    <Box
                      key={i}
                      px={4}
                      py={2}
                      _hover={{ bg: "orange.100", cursor: "pointer" }}
                      onClick={() => handleSelect(s)}
                    >
                      {s}
                    </Box>
                  ))}
                </Box>
              )}
            </HStack>

            <Button
              colorScheme="orange"
              size="lg"
              w={{ base: "100%", md: "260px" }}
              fontSize="xl"
              fontWeight="bold"
              type="submit"
              alignSelf={{ base: "stretch", md: "center" }}
            >
              Submit
            </Button>
          </VStack>
        </Box>

        <IconButton
          aria-label="Scroll down"
          icon={<ChevronDownIcon boxSize={14} />}
          mt={16}
          size="lg"
          variant="ghost"
          color={subtext}
          onClick={() =>
            document.getElementById("about").scrollIntoView({ behavior: "smooth" })
          }
        />
      </Box>

      {/* About / Team / Contact */}
      <Container maxW="container.lg" py={{ base: 12, md: 20 }} textAlign="center">
        <Box
          id="about"
          mb={20}
          p={{ base: 6, md: 10 }}
          bg={panelBg}
          borderRadius="lg"
          shadow="md"
          scrollMarginTop="110px"
          textAlign="left"
        >
          <Heading size="xl" mb={4} textAlign="center">
            About Us
          </Heading>
          <Text fontSize="lg" color={textDim} lineHeight="taller">
            We analyze restaurant reviews using language patterns, metadata, and model
            signals to flag content that looks automated or coordinated. You get a simple
            verdict and confidence score so you can dine without getting catfished by bots.
          </Text>
        </Box>

        <Box id="team" mb={20} scrollMarginTop="110px">
          <Heading size="xl" mb={8}>
            Our Team
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <TeamCard
              name="Alice"
              role="ML Engineer"
              blurb="Model training and eval."
              cardBg={cardBg}
              textDim={textDim}
              subtext={subtext}
            />
            <TeamCard
              name="Bob"
              role="Frontend Dev"
              blurb="UI/UX and integrations."
              cardBg={cardBg}
              textDim={textDim}
              subtext={subtext}
            />
            <TeamCard
              name="Charlie"
              role="Data Analyst"
              blurb="Labeling and drift watch."
              cardBg={cardBg}
              textDim={textDim}
              subtext={subtext}
            />
          </SimpleGrid>
        </Box>

        <Box
          id="contact"
          p={{ base: 6, md: 10 }}
          bg={panelBg}
          borderRadius="lg"
          shadow="md"
          scrollMarginTop="110px"
        >
          <Heading size="xl" mb={4}>
            Contact Us
          </Heading>
          <Text fontSize="lg">Email: support@fakefooddetector.com</Text>
          <Text fontSize="lg">Phone: +60 123 456 789</Text>
        </Box>
      </Container>

      {/* Map Picker Modal (iframe embed) */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Wrapper makes whole map area clickable */}
            <Box
              w="100%"
              h="60vh"
              borderRadius="md"
              overflow="hidden"
              cursor="pointer"
              onClick={() => {
                // When clicked, set the hardcoded restaurant name
                setQuery("Super Kitchen Chilli Pan Mee Sri Petaling");
                toast({
                  title: "Location selected",
                  description: "Using: Super Kitchen Chilli Pan Mee Sri Petaling",
                  status: "success",
                  isClosable: true,
                });
                onClose(); // close modal
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.091814487019!2d101.69503279999999!3d3.0701378999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4a884d83d3a9%3A0xfe7ea52cbfb40184!2sSuper%20Kitchen%20Chilli%20Pan%20Mee%20%7C%20Sri%20Petaling!5e0!3m2!1sen!2smy!4v1758433143610!5m2!1sen!2smy"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: "none" }} // disable iframe’s own clicks
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
            <Text fontSize="sm" color={subtext} mt={3}>
              Click on the map to drop a pin. We’ll grab the nearest restaurant name if possible.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function TeamCard({ name, role, blurb, cardBg, textDim, subtext }) {
  return (
    <Box p={8} shadow="md" borderRadius="lg" bg={cardBg} textAlign="left">
      <Heading size="lg" mb={3}>
        {name}
      </Heading>
      <Text fontWeight="medium" color={textDim} mb={3}>
        {role}
      </Text>
      <Text fontSize="md" color={subtext}>
        {blurb}
      </Text>
    </Box>
  );
}
