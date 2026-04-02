import "@/styles/globals.css";
import "@/styles/layout.css";

import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";
import { SessionProvider } from "next-auth/react";
export default function App({ Component, pageProps }: AppProps) {
  const { session, ...rest } = pageProps;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <SessionProvider session={(pageProps as any).session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
