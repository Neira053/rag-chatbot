const pdfService = require("../services/pdfService");
const chunkService = require("../services/chunkService");
const embeddingService = require("../services/embeddingService");
const pineconeService = require("../services/pineconeService");

exports.upload = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        console.log("Reading PDF...");

        const text = await pdfService.extractText(req.file.path);

        console.log("Text Length:", text.length);

        const chunks = chunkService.splitIntoChunks(text);

        console.log("Chunks Created:", chunks.length);

        const embeddings = [];

        for (let i = 0; i < chunks.length; i++) {

            console.log(`Embedding Chunk ${i + 1}/${chunks.length}`);

            const embedding = await embeddingService.createEmbedding(chunks[i]);

            embeddings.push(embedding);
        }

        console.log("Uploading vectors to Pinecone...");

        await pineconeService.storeEmbeddings(
            chunks,
            embeddings
        );

        return res.status(200).json({
            success: true,
            message: "Document indexed successfully",
            chunks: chunks.length
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};