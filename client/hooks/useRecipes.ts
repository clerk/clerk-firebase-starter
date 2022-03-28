import firebase from "firebase/app";
import "firebase/firestore";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { Recipe } from "../types";

export const useRecipes = () => {
  const { getToken } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState(null);

  const db = firebase.firestore();

  useEffect(() => {
    const retrieveRecipes = async function () {
      try {
        const firebaseToken = await getToken({ template: "integration_firebase" });

        if (!firebaseToken) {
          return;
        }

        await firebase.auth().signInWithCustomToken(firebaseToken);
        const tempRecipes: Recipe[] = [];
        const recipesSnapshot = await db.collection("recipes").get();
        recipesSnapshot.forEach((recipe) => {
          tempRecipes.push(recipe.data() as Recipe);
        });
        setRecipes(tempRecipes);
      } catch (err: any) {
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
