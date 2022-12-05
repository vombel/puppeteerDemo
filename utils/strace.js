const assert = require("assert");

async function getResourceTree(page) {
    // const client = await page.target().createCDPSession();
    const resource = await page._client.send("Page.getResourceTree");
    return resource.frameTree;
}


async function getResourceContent(page, url) {
    const { content, base64Encoded } = await page._client.send(
        "Page.getResourceContent",
        { frameId: String(page.mainFrame()._id), url }
    );
    assert.equal(base64Encoded, true);
    return content;
}

exports.getResourceContent = getResourceContent;
exports.getResourceTree = getResourceTree;


