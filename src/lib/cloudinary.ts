export const CLOUD_NAME = 'dhgk9uzxu';

export const getCloudinaryUrl = (publicId: string, isVideo = false, folder = 'Prime images'): string => {
  if (!publicId) {
    console.error('getCloudinaryUrl called with empty publicId');
    return '';
  }

  // Prepend folder if not already present
  const finalPublicId = folder && !publicId.startsWith(`${folder}/`) ? `${folder}/${publicId}` : publicId;

  const baseUrl = isVideo
    ? `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`
    : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto`;
  
  const url = `${baseUrl}/${encodeURIComponent(finalPublicId)}`;
  console.log('--- Cloudinary Debug ---');
  console.log('Public ID Input:', publicId);
  console.log('Folder:', folder);
  console.log('Final Public ID:', finalPublicId);
  console.log('Generated URL:', url);
  return url;
};
