import { GoogleBookApiImageLinks } from './types/GoogleBooksApi';

/**
 * Function for finding the highest res image from Object: GoogleBookApiImageLinks
 * @param urls: GoogleBookApiImageLinks
 * @returns String url of that link
 */
const getHighestSizeLinkUrl = (urls: GoogleBookApiImageLinks) => {
  let url: string | undefined;

  if (!urls) return url;

  for (const [imgSize, imgUrl] of Object.entries(urls)) {
    if (imgUrl) url = imgUrl;
  }

  return url;
};

export { getHighestSizeLinkUrl };
