function pushEmpty() {
    adobeDataLayer.push("not an event");
    logMessage("push empty (not an event)");
}

function pushStatic() {
    adobeDataLayer.push({"event": "onclick"});
    logMessage("push static event: onclick");
}

function pushRandom() {
    let randomObject = {
        [Math.random().toString(36).substring(7)]: Math.random().toString(36).substring(7)
    };
    adobeDataLayer.push(randomObject);
    logMessage("push random object: " + JSON.stringify(randomObject));
}

function pushCustom() {
    let customKey = document.getElementById("custom-event-key").value;
    let customValue = document.getElementById("custom-event-value").value;
    let customObject = {};
    customObject[customKey] = customValue;
    adobeDataLayer.push(customObject);
    logMessage("push custom event");
}

function pushStockUpdate() {
    adobeDataLayer.push({event: 'stock-price-update', stock: { price: Math.floor((400 + Math.random() * 20)) , code: 'ADBE'}});
}

function logMessage(message) {
    console.log(message);
    let actionLog = document.getElementById("action-log");
    append(message, actionLog);
    append(JSON.stringify(adobeDataLayer), actionLog);
    actionLog.appendChild(document.createElement("br"));
}

function append(message, actionLog) {
    let node = document.createElement("div");
    let textNode = document.createTextNode(message);
    node.appendChild(textNode);
    actionLog.appendChild(node);
}