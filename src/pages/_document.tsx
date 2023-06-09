import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="57x57" href="/icon/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/icon/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/icon/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/icon/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/icon/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/icon/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/icon/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/icon/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/icon/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/icon/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/icon/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/>
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
