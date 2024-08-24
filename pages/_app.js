import "../styles/globals.css";
import "../styles/font.css";
import Layout from "../components/layout/Layout";
import { Toaster } from "react-hot-toast";


function MyApp({ Component, pageProps }) {
  return (
    
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
   
  );
}

export default MyApp;
