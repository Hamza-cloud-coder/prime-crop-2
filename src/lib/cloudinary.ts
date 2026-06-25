export const CLOUD_NAME = 'dhgk9uzxu';

export const getCloudinaryUrl = (publicId: string, isVideo = false, folder = 'Prime images'): string => {
  if (!publicId) {
    console.error('getCloudinaryUrl called with empty publicId');
    return '';
  }

  // Prepend folder if not already present
  const finalPublicId = folder && !publicId.startsWith(`${folder}/`) ? `${folder}/${publicId}` : publicId;

  // If in development mode, return the local path
  if (import.meta.env.MODE === 'development') {
    return `/${publicId.split('/').pop()}`;
  }

  const baseUrl = isVideo
    ? `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`
    : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto`;
  
  // Split by slash to encode each part individually, preserving the folder separator slash
  const encodedPath = finalPublicId.split('/').map(encodeURIComponent).join('/');
  
  const url = `${baseUrl}/${encodedPath}`;
  return url;
};
