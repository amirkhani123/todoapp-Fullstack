import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <link rel="icon" href="/icon.svg" type="image/x-icon" sizes="48x48" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
