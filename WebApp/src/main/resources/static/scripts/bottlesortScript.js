class Game extends HTMLElement {
	#selectedTo = null;
	#selectedFrom = null;
	#shadow;
	constructor() {
		super();
		this.#shadow = this.attachShadow({ mode: "closed" });
		this.#setUp("setup");
	}
	async #setUp(method) {
	    try {
	        const response = await fetch("/bottlesort/" + method);
	        if (!response.ok) {
	            throw new Error(`HTTP error: ${response.status}`);
	        }
			while(this.#shadow.firstChild) this.#shadow.removeChild(this.#shadow.firstChild);
	        const data = await response.json();
			const style = document.createElement("style");
			style.textContent = data.style;
			this.#shadow.appendChild(style);
	        const section = document.createElement("section");
	        for (let i = 0;i < data.board.bottles.length;i++) {
	            const subSection = document.createElement("section");
	            for (let j = 0;j < data.board.bottles[i].contents.length;j++) {
	                const span = document.createElement("span");
	                span.textContent = data.board.bottles[i].contents[j];
	                this.#setColor(span);
	                subSection.prepend(span);
	            }
	            subSection.addEventListener("click", () => this.#select(i));
	            section.appendChild(subSection);
	        }
	        section.querySelectorAll("section").forEach(s => s.style.width = (100 / section.childElementCount) + "%");
	        this.#shadow.appendChild(section);
	        const sendBtn = document.createElement("button");
	        sendBtn.textContent = "Send";
	        sendBtn.id = "sendBtn";
	        sendBtn.addEventListener("click", () => this.#update());
	        sendBtn.disabled = data.win || this.#selectedFrom == null || this.#selectedTo == null;
	        const responseSection = document.createElement("p");
	        responseSection.id = "response";
	        responseSection.textContent = (data.win === true) ? ("Victory!") : (" ");
	        this.#shadow.appendChild(sendBtn);
	        const nextBtn = document.createElement("button");
	        nextBtn.id = "nextBtn";
	        nextBtn.textContent = "Next level";
	        nextBtn.disabled = !data.win;
	        nextBtn.addEventListener("click", () => this.#nextLevel());
	        this.#shadow.appendChild(nextBtn);
	        this.#shadow.appendChild(responseSection);
	    } catch (error) {
	        console.error("Fetch failed: ", error);
	    }
	}
	async #setColor(elem) {
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
	#select(n) {
	    const bottle = this.#shadow.querySelectorAll("section > section")[n];
	    if (n === this.#selectedFrom) {
	        this.#selectedFrom = null;
	        bottle.style.border = "3px solid black";
	    }
	    else if (n === this.#selectedTo) {
	        this.#selectedTo = null;
	        bottle.style.border = "3px solid black";
	    }
	    else {
	        if (this.#selectedFrom == null) {
	            this.#selectedFrom = n;
	            bottle.style.border = "3px solid green";
	        }
	        else if (this.#selectedTo == null) {
	            this.#selectedTo = n;
	            bottle.style.border = "3px solid red";
	        }
	    }
	    this.#shadow.getElementById("sendBtn").disabled = (this.#selectedFrom == null || this.#selectedTo == null);
	}
	async #update() {
	    try {
	        const response = await fetch(("/bottlesort/update"), {
	            method: "POST",
	            headers: {
	                "Content-Type": "application/json"
	            },
	            body: JSON.stringify({
	                from: this.#selectedFrom,
	                to: this.#selectedTo
	            })
	        });
	        if (!response.ok) {
	            throw new Error(`HTTP error: ${response.status}`);
	        }
	        const data = await response.json();
	        this.#updateFieldset(data.board, data.win);
	    } catch (error) {
	        console.error("Fetch failed: ", error);
	    }
	}
	async #updateFieldset(data, win) {
	    const sections = this.#shadow.querySelectorAll("section > section");
	    if (this.#selectedFrom != null) this.#shadow.querySelectorAll("section > section")[this.#selectedFrom].style.border = "3px solid black";
	    if (this.#selectedTo != null) this.#shadow.querySelectorAll("section > section")[this.#selectedTo].style.border = "3px solid black";
	    this.#selectedFrom = null;
	    this.#selectedTo = null;
	    for (let i = 0;i < sections.length;i++) {
	        const spans = sections[i].querySelectorAll("span");
	        for (let j = 0;j < spans.length;j++) {
	            spans[spans.length - 1 - j].textContent = data.bottles[i].contents[j];
	            this.#setColor(spans[spans.length - 1 - j]);
	        }
	    }
	    this.#shadow.getElementById("nextBtn").disabled = !win;
	    if (win === true) {
	        this.#shadow.getElementById("sendBtn").disabled = true;
	        const response = this.#shadow.getElementById("response");
	        response.textContent = "Victory!";
	    }
	}
	async #nextLevel() {
	    this.#setUp("nextLevel");
	}
}
customElements.define("game-window", Game);