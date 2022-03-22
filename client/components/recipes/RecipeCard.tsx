import { Flex, Box, Heading, Image, Text } from "@chakra-ui/react";
import type { Recipe } from "../../types";

type RecipeCardProps = { recipe: Recipe };

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Flex p={5} w="full" justifyContent="center">
      <Box maxW="xs" mx="auto" shadow="lg" rounded="lg">
        <Box px={4} py={2}>
          <Heading color={"text.dark"} fontWeight="bold" fontSize="3xl">
            {recipe.title}
          </Heading>
          <Text fontSize="sm" color={"text.dark"} opacity={0.5} noOfLines={3}>
            {recipe.description}
          </Text>
        </Box>

        <Image h={48} w="full" fit="cover" mt={2} src={recipe.imageUrl} alt={recipe.title} />

        <Flex alignItems="center" justifyContent="space-between" px={4} py={2} bg="gray.900" roundedBottom="lg">
          <Heading color="white" fontWeight="bold" fontSize="lg">
            Cooking time: {recipe.cookingTimeMin} min!
          </Heading>
        </Flex>
      </Box>
    </Flex>
  );
}
