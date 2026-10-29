let colors;
let select;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetBtn").addEventListener("click", setUp.bind(null, "reset"));
    setUp("colors");
});
async function setUp(method) {
    try {
        const response = await fetch("/mastermind/" + method);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        await setColors(data.colors);
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = "Game";
        fieldset.appendChild(legend);
        remakeSelects(fieldset);
        const section = document.createElement("section");
        const setCodeBtn = document.createElement("button");
        setCodeBtn.textContent = "Set code";
        setCodeBtn.id = "setCode";
        setCodeBtn.addEventListener("click", setCode);
        section.appendChild(setCodeBtn);
        const rndCodeBtn = document.createElement("button");
        rndCodeBtn.textContent = "Random";
        rndCodeBtn.addEventListener("click", rndCode);
        section.appendChild(rndCodeBtn);
        fieldset.appendChild(section);
        document.getElementsByTagName("fieldset")[0].replaceWith(fieldset);
        validate();
    } catch (error) {
        console.error("Fetch failed: ", error);
    }
}
async function setColors(colors) {
    select = document.createElement("select");
    for (let i = 0;i < colors.length;i++) {
        const option = document.createElement("option");
        const t = document.createTextNode(colors[i]);
        option.setAttribute("value", colors[i]);
        option.appendChild(t);
        select.appendChild(option);
    }
}
async function remakeSelects(fieldset) {
    const section = document.createElement("section");
    for (let j = 0;j < 4;j++) {
        const selectClone = select.cloneNode(true);
        selectClone.addEventListener("change", validate);
        section.appendChild(selectClone);
    }
    fieldset.appendChild(section);
}
async function remakeFieldset(tiles, feedback, victory) {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Game";
    fieldset.appendChild(legend);
    for (let i = 0;i < tiles.length;i++) {
        const section = document.createElement("section");
        for (let j = 0;j < tiles[i].length;j++) {
            const span = document.createElement("span");
            span.textContent = tiles[i][j];
            section.appendChild(span);
        }
        let w = 0;
        let b = 0;
        for (let j = 0;j < feedback[i].length;j++) {
            if (feedback[i][j] === "CORRECT") w++;
            else if (feedback[i][j] === "PARTIAL") b++;
        }
        const fb = document.createElement("p");
        fb.textContent = "W:" + w + " | B:" + b;
        section.appendChild(fb);
        fieldset.appendChild(section);
    }
    if (tiles.length < 10) {
        if (!victory) {
            remakeSelects(fieldset);
            const btn = document.createElement("button");
            btn.textContent = "Send";
            btn.addEventListener("click", sendData);
            btn.disabled = true;
            fieldset.appendChild(btn);
        }
    }
    if (victory) {
        const p = document.createElement("p");
        p.textContent = "Victory!";
        fieldset.appendChild(p);
    }
    document.getElementsByTagName("fieldset")[0].replaceWith(fieldset);
}
async function sendData() {
    const postData = await postFunction("click");
    remakeFieldset(postData.tiles, postData.feedback, postData.victory);
}
async function setCode() {
    showConfirm();
    const postData = await postFunction("setCode");
    remakeFieldset(postData.tiles, postData.feedback, postData.victory);
}
async function rndCode() {
    try {
        const response = await fetch("/mastermind/rndCode");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        showConfirm();
        const data = await response.json();
        remakeFieldset(data.tiles, data.feedback, data.victory);
    } catch (error) {
        console.error("Fetch failed: ", error);
    }
}
function showConfirm() {
    confirm("Code set!");
}
async function postFunction(method) {
    try {
        const selects = document.getElementsByTagName("select");
        let values = [];
        for (let i = 0;i < selects.length;i++) {
            values[i] = selects[i].value;
        }
        const response = await fetch(("/mastermind/" + method), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch failed: ", error);
    }
}
async function validate() {
    const selects = document.getElementsByTagName("select");
    let valid = true;
    for (let i = 0;i < selects.length;i++) {
        if (selects[i].value === "BLANK") valid = false;
    }
    document.getElementsByTagName("button")[2].disabled = !valid;
}