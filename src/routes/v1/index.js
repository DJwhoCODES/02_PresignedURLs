const express = require("express");
const { InfoController, S3Controller } = require("../../controllers");
const router = express.Router();

router.get("/info", InfoController.info);

router.post("/request-upload", S3Controller.generatePresignedUrls); // Generate pre-signed URLs
router.get("/get-documents/:userId", S3Controller.fetchDocuments); // Fetch document links
router.post("/request-reupload", S3Controller.requestReupload); // Delete and update

module.exports = router;
