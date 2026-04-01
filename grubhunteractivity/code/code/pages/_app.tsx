import "@/styles/globals.css";
import "@/styles/layout.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const { session, ...rest } = pageProps;
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...rest} />
      </Layout>
    </SessionProvider>
  );
}
