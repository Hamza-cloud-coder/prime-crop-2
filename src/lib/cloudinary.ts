export const CLOUD_NAME = 'dh1tb5hif';

const bgPlaceholders = [
  "https://images.unsplash.com/photo-1595855761845-a910ec3f30d2?q=80&w=1200&auto=format&fit=crop", // agriculture field
  "https://images.unsplash.com/photo-1574311899946-4cbdb502eecd?q=80&w=1200&auto=format&fit=crop", // beans/pulses
  "https://images.unsplash.com/photo-1586255152330-8aadc5d7d3d8?q=80&w=1200&auto=format&fit=crop", // sorghum/grains
  "https://images.unsplash.com/photo-1610484556485-d883bc2db2d7?q=80&w=1200&auto=format&fit=crop", // soy beans
];

export const getCloudinaryUrl = (publicId: string, isVideo = false): string => {
  if (isVideo) {
    return "https://cdn.pixabay.com/video/2021/08/04/83818-584738590_large.mp4"; // tractor field video
  }
  
  if (publicId === 'logo33.png' || publicId.includes('logo')) {
    // Return original logo path if you want, or just a placeholder if it was deleted
    return "/src/public/logo33.png"; 
  }

  // Consistent hashing for random-looking but stable images for the same publicId
  let hash = 0;
  for (let i = 0; i < publicId.length; i++) {
    hash = publicId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % bgPlaceholders.length;
  
  return bgPlaceholders[index];
};
