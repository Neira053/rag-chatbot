const index = require("../config/pinecone");

async function storeEmbeddings(chunks, embeddings) {

    const records = chunks.map((chunk, i) => ({
        id: `chunk-${Date.now()}-${i}`,
        values: embeddings[i],
        metadata: {
            text: chunk,
            chunk: i
        }
    }));

    console.log("Records:", records.length);

    await index.upsert({
        records
    });

    console.log("Vectors uploaded successfully.");

}

module.exports = {
    storeEmbeddings
};