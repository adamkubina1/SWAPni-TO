import Head from 'next/head';

const TITLE = 'Aplikace pro knižní výměnu';
const DESCRIPTION =
  'Webová aplikace SWAPni TO propojující čtenáře za účelem výměny knih.';
const SITE_NAME = 'SWAPni TO';
const DOMAIN = 'https://swapni-to.vercel.app/';
const DEFAULT_OG_IMAGE = 'https://swapni-to.vercel.app/imgs/swap-logo.svg';
const OG_TYPE = 'website';

const Seo = ({
  title = TITLE,
  description = DESCRIPTION,
  siteName = SITE_NAME,
  canonical = DOMAIN,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = OG_TYPE,
}) => {
  return (
    <Head>
      <title key='title'>{`${siteName} – ${title}`}</title>
      <meta name='description' content={description} />
      <meta key='og_type' property='og:type' content={ogType} />
      <meta key='og_title' property='og:title' content={title} />
      <meta
        key='og_description'
        property='og:description'
        content={description}
      />
      <meta key='og_locale' property='og:locale' content='cs_cz' />
      <meta key='og_site_name' property='og:site_name' content={siteName} />
      <meta key='og_url' property='og:url' content={canonical ?? DOMAIN} />
      <meta key='og_site_name' property='og:site_name' content={siteName} />
      <meta
        key='og_image'
        property='og:image'
        content={ogImage ?? DEFAULT_OG_IMAGE}
      />
      <meta
        key='og_image:alt'
        property='og:image:alt'
        content={`${title} | ${siteName}`}
      />
      <meta key='og_image:width' property='og:image:width' content='1575' />
      <meta key='og_image:height' property='og:image:height' content='1050' />

      <meta name='robots' content='index,follow' />

      <link rel='canonical' href={canonical ?? DOMAIN} />
      <link rel='shortcut icon' href='/favicon/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicon/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon/favicon-16x16.png'
      />
      <link rel='manifest' href='/favicon/site.webmanifest' />
    </Head>
  );
};

export { Seo };
