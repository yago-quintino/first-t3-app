import { type AppType } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Emojis T3 App</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
