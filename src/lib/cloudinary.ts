export const CLOUD_NAME = 'dhgk9uzxu';

export const getCloudinaryUrl = (publicId: string, isVideo = false): string => {
  const baseUrl = isVideo
    ? `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`
    : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  
  return `${baseUrl}/${publicId}`;
};
