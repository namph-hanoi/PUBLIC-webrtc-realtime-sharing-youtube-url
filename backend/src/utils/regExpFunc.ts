export const youtubeThumbnailUrlRegExp = new RegExp(
  /(?<=property="og:image" content=").*?(?=")/,
);

export const youtubeTitleRegExp = new RegExp(
  /(?<=name="title" content=").*?(?=")/,
);

export const youtubeDescriptionRegExp = new RegExp(
  /(?<=shortDescription":").*?(?=","isCrawlable":true)/,
);

export const extractStringByRegex = (text: string, regex: RegExp) => {
  const result = text.match(regex);
  return !!result ? result[0] : null;
};
