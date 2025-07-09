const { DocumentsModel } = require("../models");
const { getUploadUrls, getDownloadUrls, deleteDocObject } = require("../utils/s3-helpers");


const generatePresignedUrls = async () => {
    try {
        const { userId } = req.body;

        const result = await getUploadUrls(userId);

        await DocumentsModel.findOneAndUpdate(
            { userId },
            {
                userId,
                documents: Object.fromEntries(
                    result?.uploadUrls.map(({ type, key }) => [
                        type,
                        { s3_key: key, status: "pending" },
                    ])
                ),
                kyc_status: "pending",
            },
            { upsert: true }
        );

        res.status(200).json({ urls: result.uploadUrls });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const fetchDocuments = async () => {
    try {
        const userId = req.params.userId;
        const [kycDoc] = await DocumentsModel.aggregate([{ $match: { userId } }]);
        if (!kycDoc) return res.status(404).json({ message: "Not found" });

        const downloadUrls = await getDownloadUrls(kycDoc);
        res.status(200).json({ downloadUrls });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const requestReupload = async () => {
    try {
        const { userId, docType } = req.body;

        if (!userId || !docType) {
            return res
                .status(400)
                .json({ message: "userId and docType are required" });
        }

        const kycDoc = await DocumentsModel.findOne({ userId });
        if (!kycDoc || !kycDoc.documents?.[docType]) {
            return res
                .status(404)
                .json({ message: "Document not found for this user" });
        }

        const s3_key = kycDoc.documents[docType].s3_key;

        // Delete existing object
        await deleteDocObject(s3_key);

        // Update status in MongoDB
        kycDoc.documents[docType].status = "reupload";
        await kycDoc.save();

        return res.status(200).json({
            message: "Reupload requested",
            s3_key,
            status: "reupload",
        });
    } catch (err) {
        console.error("Reupload error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    generatePresignedUrls, fetchDocuments, requestReupload
}