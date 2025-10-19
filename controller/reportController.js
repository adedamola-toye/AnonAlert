
import { cloudinary } from "../config/cloudinary_settings";
import locationController from "../controller/locationController";
import Report from "../model/Report"
import Media from "../model/Media";
import "../config/cloudinary_settings"
import jwt from "jsonwebtoken";
import generateTrackingId from "../utils/generateTrackingId";

export async function createReport(req, res) {
  try {
    //Retrieve from request body - look for way to retrieve reporterId, forwardedTo
    const { text, category, location } = req.body;
    //const reporterId = req.reporterId;
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
      return res.status(500).json({
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
    /* let reporterId;
    const existingToken = req.cookies.AnonAlert_Reporter_Token;
    if (existingToken) {
      try {
        const decoded = await ReporterService.verifyToken(existingToken);
        reporterId = decoded.reporterId;
      } catch (error) {
        console.error("Token invalid or expired. Creating a new session");
      }
    }
 */
    /* if (!reporterId) {
      const reporter = await ReporterService.createReporter();
      reporterId = reporter._id;
      res.cookie("AnonAlert_Reporter_Token", reporter.newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
    } */

    const trackingId = generateTrackingId();

    //save the report
    try {
      const newReport = await Report.create({
        text: text,
        category: category,
        location: locationId,
        status: "pending",
        credibilityScore: 0,
        forwardedTo: null,
        media: mediaIds,
        trackingId
      });
      return res.status(201).json({
        message: "Report successfully created and media uploaded",
        report: newReport,
        trackingId: trackingId
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
