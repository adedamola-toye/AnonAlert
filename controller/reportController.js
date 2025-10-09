const { cloudinary } = require("../config/cloudinary_settings");
const locationController = require("../controller/locationController");
const Report = require("../model/Report");
const Media = require("../model/Media");
require("../config/cloudinary_settings");

async function createReport(req, res) {
  try {
    //Retrieve from request body - look for way to retrieve reporterId, forwardedTo
    const { text, category, location } = req.body;
    const files = req.files || [];
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    let locationId;
    try {
      locationId = await locationController.createLocation(location);
    } catch (error) {
      console.error("Error creating location: ", location);
      return res
        .status(500)
        .json({
          message: "Could not process location data",
          details: error.message,
        });
    }

    const mediaIds = [];

    for (const file of files) {
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
    //save the report
    try {
      const newReport = await Report.create({
        //reporterId: ,
        text: text,
        category: category,
        location: locationId,
        status: "pending",
        credibilityScore: 0,
        forwardedTo: null,
        media: mediaIds,
      });
      return res.status(201).json({
        message: "Report successfully created and media uploaded",
        report: newReport,
      });
    } catch (error) {
      console.error("Error saving report: ", error);
      return res
        .status(500)
        .json({ message: "Failed to save report", details: error.message });
    }
  } catch (error) {
    console.error("Error creating report: ", error);
    return res.status(500).json({ message: "Server error" });
  }
}
