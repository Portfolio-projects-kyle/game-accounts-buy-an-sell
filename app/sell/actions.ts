"use server";

export async function validateImages(formData: FormData) {
  const files = formData.getAll('images') as File[];
  
  for (const file of files) {
    // 1. Basic check: Is it actually an image?
    if (!file.type.startsWith('image/')) {
      throw new Error(`${file.name} is not an image.`);
    }

    // 2. Content Moderation via Sightengine API
    const data = new FormData();
    data.append('media', file);
    data.append('models', 'nudity,wad,offensive'); // wad = weapons, alcohol, drugs
    data.append('api_user', process.env.SIGHTENGINE_API_USER!);
    data.append('api_secret', process.env.SIGHTENGINE_API_SECRET!);

    const response = await fetch('https://api.sightengine.com/1.0/check.json', {
      method: 'POST',
      body: data,
    });

    const result = await response.json();

    if (result.status === 'success') {
      // Logic: If nudity or violence probability is > 50%, reject
      const isInappropriate = 
        result.nudity.sexual_activity > 0.5 || 
        result.weapon > 0.5 || 
        result.offensive.prob > 0.5;

      if (isInappropriate) {
        throw new Error(`Image ${file.name} contains prohibited content.`);
      }
    }
  }

  return { success: true };
}