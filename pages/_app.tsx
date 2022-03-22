import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ChakraProvider } from "@chakra-ui/react";
import { Main } from "../client/components/layout/Main";

import firebase from "firebase/app";
import { config } from "../config/firebase.web";
import { defaultTheme } from "../client/theme";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

function PremiumRecipesApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider theme={defaultTheme}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </ChakraProvider>
    </ClerkProvider>
  );
}

export default PremiumRecipesApp;
