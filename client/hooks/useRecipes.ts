import firebase from "firebase";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { Recipe } from "../types";

export const useRecipes = () => {
  const clerkUser = useUser();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState(null);

  const db = firebase.firestore();

  useEffect(() => {
    const retrieveRecipes = async function () {
      try {
        const firebaseToken = await clerkUser.getToken("firebase");
        await firebase.auth().signInWithCustomToken(firebaseToken);

        const tempRecipes: Recipe[] = [];
        const recipesSnapshot = await db.collection("recipes").get();
        recipesSnapshot.forEach((recipe) => {
          tempRecipes.push(recipe.data() as Recipe);
        });
        setRecipes(tempRecipes);
      } catch (err) {
        setError(err);
      }
    };

    retrieveRecipes();
  }, []);

  return {
    recipes,
    error,
  };
};
