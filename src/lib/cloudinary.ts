export const CLOUD_NAME = 'dhgk9uzxu';

export const getCloudinaryUrl = (publicId: string, isVideo = false): string => {
  if (!publicId) {
    console.error('getCloudinaryUrl called with empty publicId');
    return '';
  }

  const baseUrl = isVideo
    ? `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`
    : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto`; // Added optimization parameters
  
  const url = `${baseUrl}/${publicId}`;
  return url;
};
