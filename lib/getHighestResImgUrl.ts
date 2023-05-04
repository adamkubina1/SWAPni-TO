import { GoogleBookApiImageLinksType } from './types/GoogleBooksApiType';

/**
 * Function for finding the highest res image from Object: GoogleBookApiImageLinks
 * @param urls: GoogleBookApiImageLinks
 * @returns String url of that link
 */
const getHighestSizeLinkUrl = (urls: GoogleBookApiImageLinksType) => {
  let url: string | undefined;

  if (!urls) return url;

  for (const [imgSize, imgUrl] of Object.entries(urls)) {
    if (imgUrl) url = imgUrl;
  }

  return url;
};

export { getHighestSizeLinkUrl };
