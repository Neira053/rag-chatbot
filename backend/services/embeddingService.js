const ai = require("../config/gemini");

async function createEmbedding(text) {
    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: text,
        config: {
            outputDimensionality: 768
        }
    });

    return response.embeddings[0].values;
}

module.exports = {
    createEmbedding
};