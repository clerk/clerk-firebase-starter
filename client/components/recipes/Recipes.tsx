import { SimpleGrid } from "@chakra-ui/react";
import { RecipeCard } from "./RecipeCard";
import { useRecipes } from "../../hooks/useRecipes";

export function Recipes() {
  const { recipes, error } = useRecipes();

  if (error) {
    return <span>Something went wrong loading your recipes!</span>;
  }

  return (
    <div>
      <SimpleGrid columns={{ sm: 2, md: 3 }} gap={4}>
        {recipes.map((recipe, idx) => (
          <RecipeCard key={idx} recipe={recipe} />
        ))}
      </SimpleGrid>
    </div>
  );
}
