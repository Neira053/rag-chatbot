const splitIntoChunks = (
    text,
    chunkSize = 1000,
    overlap = 200
) => {

    const chunks = [];

    let start = 0;

    while (start < text.length) {

        const end = start + chunkSize;

        chunks.push(
            text.slice(start, end)
        );

        start += (chunkSize - overlap);
    }

    return chunks;

};

module.exports = {
    splitIntoChunks
};