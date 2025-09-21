// src/components/Carousel.jsx
import {
  Box,
  HStack,
  IconButton,
  Image,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Carousel({
  images = [],   // can be array of { src, caption, subCaption }
  height = "300px",
  borderRadius = "md",
  autoplay = true,
  interval = 3000,
  effect = "slide",          
  duration = 400,            
  easing = "ease",           
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const count = safeImages.length;

  const dotActive = useColorModeValue("blackAlpha.700", "whiteAlpha.800");
  const dotInactive = useColorModeValue("blackAlpha.300", "whiteAlpha.400");

  const go = dir => setIndex(i => (i + dir + count) % count);
  const goTo = i => setIndex(((i % count) + count) % count);

  // autoplay
  useEffect(() => {
    if (!autoplay || count <= 1) return;
    timerRef.current = setInterval(() => go(1), interval);
    return () => clearInterval(timerRef.current);
  }, [autoplay, interval, count]);

  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    if (!autoplay || count <= 1) return;
    timerRef.current = setInterval(() => go(1), interval);
  };

  // keyboard arrows
  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  if (!count) return null;

  const commonWrapperProps = {
    position: "relative",
    overflow: "hidden",
    onMouseEnter: pause,
    onMouseLeave: resume,
    h: height,
    borderRadius,
  };

  return (
    <Box {...commonWrapperProps}>
      {/* SLIDE effect */}
      {effect === "slide" && (
        <Box
          display="flex"
          w="100%"
          h="100%"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: `transform ${duration}ms ${easing}`,
          }}
        >
          {safeImages.map((item, i) => (
            <Box key={i} flex="0 0 100%" position="relative">
              <Image
                src={item.src || item}
                alt={`slide-${i + 1}`}
                objectFit="cover"
                w="100%"
                h="100%"
                filter="brightness(1.2)" // brighten stars
              />
              {/* Caption overlay */}
              {(item.caption || item.subCaption) && (
                <Box
                  position="absolute"
                  bottom="20%"
                  left="50%"
                  transform="translateX(-50%)"
                  textAlign="center"
                  color="white"
                >
                  {item.caption && (
                    <Text fontSize="5xl" fontWeight="bold">
                      {item.caption}
                    </Text>
                  )}
                  {item.subCaption && (
                    <Text fontSize="2xl" mt={2}>
                      {item.subCaption}
                    </Text>
                  )}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* (fade effect remains same, can also include captions similarly) */}

      {/* Arrows */}
      {count > 1 && (
        <>
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon boxSize={7} />}
            onClick={() => go(-1)}
            position="absolute"
            top="50%"
            left="2"
            transform="translateY(-50%)"
            variant="solid"
            colorScheme="blackAlpha"
            _dark={{ colorScheme: "whiteAlpha" }}
          />
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon boxSize={7} />}
            onClick={() => go(1)}
            position="absolute"
            top="50%"
            right="2"
            transform="translateY(-50%)"
            variant="solid"
            colorScheme="blackAlpha"
            _dark={{ colorScheme: "whiteAlpha" }}
          />
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <HStack spacing={2} position="absolute" bottom="3" left="50%" transform="translateX(-50%)">
          {safeImages.map((_, i) => (
            <Button
              key={i}
              onClick={() => goTo(i)}
              minW="10px"
              h="10px"
              p={0}
              borderRadius="full"
              bg={i === index ? dotActive : dotInactive}
              _hover={{ bg: dotActive }}
            />
          ))}
        </HStack>
      )}
    </Box>
  );
}
