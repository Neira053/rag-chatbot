const fs = require("fs");
const pdf = require("pdf-parse");

const extractText = async (filePath) => {
    try {
        // Read the uploaded PDF from disk
        const dataBuffer = fs.readFileSync(filePath);

        // Parse the PDF
        const data = await pdf(dataBuffer);

        // Return only the extracted text
        return data.text;

    } catch (error) {
        console.error("Error extracting text:", error);
        throw error;
    }
};

module.exports = {
    extractText
};