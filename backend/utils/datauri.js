import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    console.log("File object received:", file);
    
    if (!file) {
        throw new Error("No file object provided");
    }
    
    if (!file.buffer && !file.path) {
        throw new Error("File has no buffer or path. File structure: " + JSON.stringify(Object.keys(file)));
    }
    
    // If buffer exists, use it
    if (file.buffer) {
        const base64 = file.buffer.toString('base64');
        const mimeType = file.mimetype;
        return {
            content: `data:${mimeType};base64,${base64}`
        };
    }
    
    // If path exists (for disk storage), we need a different approach
    throw new Error("File storage method not supported. Use memory storage with buffer.");
}

export default getDataUri;