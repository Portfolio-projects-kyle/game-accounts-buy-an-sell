"use server";

export async function validateImages(formData: FormData) {
  try {
    const files = formData.getAll('images') as File[];
    
    // Check if keys are actually present in the environment
    if (!process.env.SIGHTENGINE_API_USER || !process.env.SIGHTENGINE_API_SECRET) {
      return { error: "Server configuration error: API keys are missing." };
    }

    for (const file of files) {
      // 1. Basic check: Is it actually an image?
      if (!file.type.startsWith('image/')) {
        return { error: `${file.name} is not a valid image file.` };
      }

      // 2. Content Moderation via Sightengine API
      const data = new FormData();
      data.append('media', file);
      data.append('models', 'nudity,wad,offensive'); 
      data.append('api_user', process.env.SIGHTENGINE_API_USER!);
      data.append('api_secret', process.env.SIGHTENGINE_API_SECRET!);

      const response = await fetch('https://api.sightengine.com/1.0/check.json', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        return { error: `Moderation service reached limit or failed (${response.status}).` };
      }

      const result = await response.json();

      if (result.status === 'success') {
        const isInappropriate = 
          result.nudity.sexual_activity > 0.5 || 
          result.weapon > 0.5 || 
          result.offensive.prob > 0.5;

        if (isInappropriate) {
          // Identify which category failed for better UX
          let reason = "prohibited content";
          if (result.nudity.sexual_activity > 0.5) reason = "explicit content";
          if (result.weapon > 0.5) reason = "violence/weapons";
          
          return { error: `Image ${file.name} was rejected due to ${reason}.` };
        }
      }
    }

    return { success: true };
  } catch (e) {
    console.error("Moderation Error:", e);
    return { error: "An unexpected error occurred during image validation." };
  }
}