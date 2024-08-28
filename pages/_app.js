import "../styles/globals.css";
import "../styles/font.css";
import Layout from "../components/layout/Layout";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Toaster />
      <Head>
        <title>مدریت کارهای روزانه</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
