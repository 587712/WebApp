class Game extends HTMLElement {
	#shadow;
	constructor() {
		super();
		this.#shadow = this.attachShadow({ mode: "closed" });
		const section = document.createElement("section");
		this.#shadow.appendChild(section);
		this.#receiveData();
		const responseField = document.createElement("p");
		responseField.id = "response";
		responseField.textContent = " ";
		this.#shadow.appendChild(responseField);
		const nextLvlBtn = document.createElement("button");
		nextLvlBtn.id = "nextLvl";
		nextLvlBtn.addEventListener("click", () => this.#nextLevel());
		nextLvlBtn.disabled = true;
		nextLvlBtn.textContent = "Next level";
		this.#shadow.appendChild(nextLvlBtn);
	}
	async #receiveData() {
		try {
			const response = await fetch("/lightsout/data");
			if(!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const data = await response.json();
			await this.#remakeFieldset(data);
		} catch(error) {
			console.error("Fetch failed: ", error);
		}
	}
	async #sendData(num) {
		try {
			const response = await fetch("/lightsout/click", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(num)
			});
			if(!response.ok) throw new Error(`HTTP error: ${response.status}`);
			const data = await response.json();
			this.#updateFieldset(data.tiles);
			if(data.victory) await this.#stageWon();
		} catch(error) {
			console.error("Fetch failed: ", error);
		}
	}
	async #remakeFieldset(tiles) {
		const curSection = this.#shadow.querySelector("section");
		const newSection = document.createElement("section");
		for(let row = 0; row < tiles.length; row++) {
			const section = document.createElement("section");
			for(let col = 0; col < tiles[row].length; col++) {
				const span = document.createElement("span");
				const image = document.createElement("img");
				image.src = tiles[row][col] ? `${contextPath}/media/square1.png` : `${contextPath}/media/square2.png`;
				image.class = "light";
				image.id = row * tiles.length + col;
				image.alt = "Button " + image.id;
				image.addEventListener("click", () => this.#sendData(image.id));
				span.appendChild(image);
				section.appendChild(span);
			}
			newSection.appendChild(section);
		}
		curSection.replaceWith(newSection);
	}
	async #updateFieldset(tiles) {
		const rows = this.#shadow.querySelectorAll("section > section");
		for(let row = 0; row < tiles.length; row++) {
			const images = rows[row].getElementsByTagName("img");
			for(let col = 0; col < tiles[row].length; col++) {
				images[col].src = tiles[row][col] ? `${contextPath}/media/square1.png` : `${contextPath}/media/square2.png`;
			}
		}
	}
	async #stageWon() {
		const responseField = this.#shadow.getElementById("response");
		const nextLvlBtn = this.#shadow.getElementById("nextLvl");
		responseField.textContent = "Victory!";
		nextLvlBtn.removeAttribute("disabled");
	}
	async #nextLevel() {
		try {
			const response = await fetch("/lightsout/nextLevel");
			if(!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const data = await response.json();
			if(data) {
				const responseField = this.#shadow.getElementById("response");
				const nextLvlBtn = this.#shadow.getElementById("nextLvl");
				responseField.textContent = " ";
				nextLvlBtn.setAttribute("disabled", true);
				this.#receiveData();
			}
		} catch(error) {
			console.error("Fetch failed: ", error);
		}
	}
}
customElements.define("game-window", Game);