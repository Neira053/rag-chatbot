const pdfService = require("../services/pdfService.js");

exports.upload = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const text = await pdfService.extractText(req.file.path);

        res.status(200).json({
            success: true,
            message: "PDF Uploaded Successfully",
            extractedText: text
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};