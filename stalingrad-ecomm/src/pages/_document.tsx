import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta
          name="keywords"
          content="1/35, 1:35, масштаб, фигурки, солдатики, Stalingrad, Сталинград, resin, figures, смола, моделизм, диорама, РККА, Красная армия, Вермахт, немцы, пехотинец, танкист, офицер, ВОВ, Вторая мировая, 1941, 1942, 1943, 1944, 1945"
        />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
        <meta name="theme-color" content="#383838" />
        <meta property="og:image" content="/og-image.webp"/>
        <meta property="og:type" content="website"/>
        <link rel="icon" href="/favicon.svg"></link>
        <link rel="mask-icon" href="/mask-icon.svg" color="#000000"></link>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <link rel="manifest" href="/manifest.json"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
