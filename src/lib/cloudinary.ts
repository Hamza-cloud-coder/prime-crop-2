export const CLOUD_NAME = 'dhgk9uzxu';

export const getCloudinaryUrl = (publicId: string, isVideo = false): string => {
  if (!publicId) {
    console.error('getCloudinaryUrl called with empty publicId');
    return '';
  }

  // Prepend folder if not already present
  const finalPublicId = publicId.startsWith('Prime images/') ? publicId : `Prime images/${publicId}`;

  const baseUrl = isVideo
    ? `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`
    : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto`;
  
  const url = `${baseUrl}/${encodeURIComponent(finalPublicId)}`;
  return url;
};
