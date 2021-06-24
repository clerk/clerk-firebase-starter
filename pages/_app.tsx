import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/clerk-react";
import { useRouter } from "next/router";
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

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

function PremiumRecipesApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider
      frontendApi={clerkFrontendApi}
      navigate={(to) => router.push(to)}
    >
      <ChakraProvider theme={defaultTheme}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </ChakraProvider>
    </ClerkProvider>
  );
}

export default PremiumRecipesApp;
