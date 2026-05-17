export const socialProfiles = {
  instagram: 'https://www.instagram.com/weborbitsolution?igsh=M2J4eno5YzZkM2k4',
  linkedin: 'https://www.linkedin.com/company/weborbit-solution',
} as const;

export const buildSocialShareLinks = (url: string, title: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
};

