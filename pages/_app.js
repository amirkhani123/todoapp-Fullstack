import "../styles/globals.css";
import "../styles/font.css";
import Layout from "../components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
