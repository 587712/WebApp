let selectedTo = null;
let selectedFrom = null;
document.addEventListener("DOMContentLoaded", () => {
    setUp("setup");
});
async function setUp(method) {
    try {
        const response = await fetch("/bottlesort/" + method);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = "Game";
        fieldset.appendChild(legend);
        const section = document.createElement("section");
        for (let i = 0;i < data.board.bottles.length;i++) {
            const subSection = document.createElement("section");
            for (let j = 0;j < data.board.bottles[i].contents.length;j++) {
                const span = document.createElement("span");
                span.textContent = data.board.bottles[i].contents[j];
                setColor(span);
                subSection.prepend(span);
            }
            subSection.addEventListener("click", select.bind(null, i));
            section.appendChild(subSection);
        }
        section.querySelectorAll("section").forEach(s => s.style.width = (100 / section.childElementCount) + "%");
        fieldset.appendChild(section);
        const sendBtn = document.createElement("button");
        sendBtn.textContent = "Send";
        sendBtn.id = "sendBtn";
        sendBtn.addEventListener("click", update);
        sendBtn.disabled = data.win || selectedFrom == null || selectedTo == null;
        const responseSection = document.createElement("p");
        responseSection.id = "response";
        responseSection.textContent = (data.win === true) ? ("Victory!") : (" ");
        fieldset.appendChild(sendBtn);
        const nextBtn = document.createElement("button");
        nextBtn.id = "nextBtn";
        nextBtn.textContent = "Next level";
        nextBtn.disabled = !data.win;
        nextBtn.addEventListener("click", nextLevel);
        fieldset.appendChild(nextBtn);
        fieldset.appendChild(responseSection);
        document.getElementsByTagName("fieldset")[0].replaceWith(fieldset);
    } catch (error) {
        console.error("Fetch failed: ", error);
    }
}
async function setColor(elem) {
    const txt = elem.textContent;
    let color;
    switch (txt) {
        case "EMPTY":
            color = "#ffffff";
            break;
        case "RED":
            color = "#ff0000";
            break;
        case "ROSE":
            color = "#ff0055";
            break;
        case "MAGENTA":
            color = "#ff00ff";
            break;
        case "VIOLET":
            color = "#5500ff";
            break;
        case "BLUE":
            color = "#0000ff";
            break;
        case "AZURE":
            color = "#0055ff";
            break;
        case "CYAN":
            color = "#00ffff";
            break;
        case "AQUAMARINE":
            color = "#00ff55";
            break;
        case "GREEN":
            color = "#00ff00";
            break;
        case "CHARTREUSE":
            color = "#55ff00";
            break;
        case "YELLOW":
            color = "#ffff00";
            break;
        case "ORANGE":
            color = "#ff5500";
            break;
        default:
            color = "#ffffff";
            break;
    }
    elem.style.backgroundColor = color;
}
function select(n) {
    const bottle = document.querySelectorAll("section > section")[n];
    if (n === selectedFrom) {
        selectedFrom = null;
        bottle.style.border = "3px solid black";
    }
    else if (n === selectedTo) {
        selectedTo = null;
        bottle.style.border = "3px solid black";
    }
    else {
        if (selectedFrom == null) {
            selectedFrom = n;
            bottle.style.border = "3px solid green";
        }
        else if (selectedTo == null) {
            selectedTo = n;
            bottle.style.border = "3px solid red";
        }
    }
    document.getElementById("sendBtn").disabled = (selectedFrom == null || selectedTo == null);
}
async function update() {
    try {
        const response = await fetch(("/bottlesort/update"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: selectedFrom,
                to: selectedTo
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        updateFieldset(data.board, data.win);
    } catch (error) {
        console.error("Fetch failed: ", error);
    }
}
async function updateFieldset(data, win) {
    const sections = document.querySelectorAll("section > section");
    if (selectedFrom != null) document.querySelectorAll("section > section")[selectedFrom].style.border = "3px solid black";
    if (selectedTo != null) document.querySelectorAll("section > section")[selectedTo].style.border = "3px solid black";
    selectedFrom = null;
    selectedTo = null;
    for (let i = 0;i < sections.length;i++) {
        const spans = sections[i].querySelectorAll("span");
        for (let j = 0;j < spans.length;j++) {
            spans[spans.length - 1 - j].textContent = data.bottles[i].contents[j];
            setColor(spans[spans.length - 1 - j]);
        }
    }
    document.getElementById("nextBtn").disabled = !win;
    if (win === true) {
        document.getElementById("sendBtn").disabled = true;
        const response = document.getElementById("response");
        response.textContent = "Victory!";
    }
}
async function nextLevel() {
    setUp("nextLevel");
}