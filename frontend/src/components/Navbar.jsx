// src/components/Navbar.jsx
import {
  Box,
  Flex,
  HStack,
  Link as CLink,
  IconButton,
  useDisclosure,
  useColorMode, 
  useColorModeValue,          
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Spacer,
  Text,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"; // <-- add icons
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <CLink
      as={Link}
      to={to}
      px={5}
      py={3}
      rounded="lg"
      fontWeight="semibold"
      fontSize="lg"
      transition="all 0.2s ease"
      _hover={{ bg: "yellow.300", boxShadow: "sm", transform: "scale(1.05)" }}
      _active={{ bg: "yellow.500", transform: "scale(0.92)", boxShadow: "md" }}
      bg={isActive ? "yellow.300" : "transparent"}
    >
      {children}
    </CLink>
  );
};

const AnchorItem = ({ href, children }) => {
  const location = useLocation();
  const anchor = href.includes("#") ? `#${href.split("#")[1]}` : "";
  const isActive =
    location.pathname === "/home" &&
    (anchor ? location.hash === anchor : location.hash === "");
  return (
    <CLink
      as="a"
      href={href}
      px={5}
      py={3}
      rounded="lg"
      fontWeight="semibold"
      fontSize="lg"
      transition="all 0.2s ease"
      _hover={{ bg: "yellow.300", boxShadow: "sm", transform: "scale(1.05)" }}
      _active={{ bg: "yellow.500", transform: "scale(0.92)", boxShadow: "md" }}
      bg={isActive ? "yellow.300" : "transparent"}
    >
      {children}
    </CLink>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode(); // <-- hook

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="yellow.400"
      borderBottom="1px solid"
      borderColor="yellow.500"
      boxShadow="md"
      px={6}
      py={4}
    >
      <Flex align="center" minH="80px">
        {/* Logo + Name left */}
        <CLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
          <HStack spacing={3}>
            <Image 
              src="/images/logo.svg" 
              alt="Logo" 
              h={10} 
              w={10}
              fallback={<Box h={10} w={10} bg="blue.500" borderRadius="full" />}
            />
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              letterSpacing="wide"
              color={useColorModeValue("black", "white")}   
            >
              Fake Food Review Detector
            </Text>
          </HStack>
        </CLink>

        <Spacer />

        {/* Desktop nav + color toggle */}
        <HStack spacing={2} display={{ base: "none", md: "flex" }}>
          <NavItem to="/">Home</NavItem>
          <AnchorItem href="/home">Search</AnchorItem>
          <AnchorItem href="/home#about">About Us</AnchorItem>
          <AnchorItem href="/home#team">Team</AnchorItem>
          <AnchorItem href="/home#contact">Contact Us</AnchorItem>

          {/* Color mode toggle button */}
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="lg"
          />
        </HStack>

        {/* Mobile hamburger */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon boxSize={7} />}
          size="lg"
          variant="ghost"
          display={{ base: "inline-flex", md: "none" }}
          onClick={onOpen}
          ml={2}
        />
      </Flex>

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="xl">Menu</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={2}>
              <Button as={Link} to="/" onClick={onClose} variant="ghost" size="lg">
                Home
              </Button>
              <Button as="a" href="/home" onClick={onClose} variant="ghost" size="lg">
                Search
              </Button>
              <Button as="a" href="/home#about" onClick={onClose} variant="ghost" size="lg">
                About Us
              </Button>
              <Button as="a" href="/home#team" onClick={onClose} variant="ghost" size="lg">
                Team
              </Button>
              <Button as="a" href="/home#contact" onClick={onClose} variant="ghost" size="lg">
                Contact Us
              </Button>

              {/* Mobile color mode toggle */}
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="lg"
                mt={2}
                alignSelf="flex-start"
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
