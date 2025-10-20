import cloudinary from "../config/cloudinary_settings.js";
import Media from "../model/Media.js"

export async function uploadMedia(files){
  const filesToUpload = Array.isArray(files)?files: [];
    const mediaIds = [];
     for (const file of filesToUpload) {
          let mediaType = "";
          if (file.mimetype.startsWith("image/")) {
            mediaType = "image";
          } else if (file.mimetype.startsWith("video/")) {
            mediaType = "video";
          } else {
            console.log(`Unsupported file type: ${file.mimetype}`);
            continue;
          }
    
          try {
            const result = await cloudinary.uploader.upload(file.path, {
              resource_type: "auto",
            });
            const newMedia = await Media.create({
              media_type: mediaType,
              url: result.secure_url,
            });
            mediaIds.push(newMedia._id);
          } catch (error) {
            console.error("Media upload failed:", error);
            continue;
          }
        } 
        return mediaIds;
}