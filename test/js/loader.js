let loadTemplate = async function(filename) {
    let response = await fetch(filename);
    let html = await response.text();

    return html;
}

let loadJSON = async function(filename) {
    let response = await fetch(filename);
    let obj = await response.json();
    return obj;
}

export { loadTemplate, loadJSON };