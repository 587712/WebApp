class List extends HTMLElement {
	#shadow;
	constructor() {
		super();
		this.#shadow = this.attachShadow({ mode: "closed" });
		const data = this.#get("setup");
		if(data && data.style) {
			const style = document.createElement("style");
			style.textContent = data.style;
			this.#shadow.appendChild(style);
		}
		const lightsoutBtn = document.createElement("button");
		lightsoutBtn.textContent = "Lights Out";
		lightsoutBtn.addEventListener("click", () => this.#gotoPage(`${contextPath}/lightsout/play`));
		this.#shadow.appendChild(lightsoutBtn);
		const mastermindBtn = document.createElement("button");
		mastermindBtn.textContent = "Master Mind";
		mastermindBtn.addEventListener("click", () => this.#gotoPage(`${contextPath}/mastermind/play`));
		this.#shadow.appendChild(mastermindBtn);
		const bottlesortBtn = document.createElement("button");
		bottlesortBtn.textContent = "Bottle Sort";
		bottlesortBtn.addEventListener("click", () => this.#gotoPage(`${contextPath}/bottlesort/play`));
		this.#shadow.appendChild(bottlesortBtn);
	}
	async #get(method) {
		try {
			const response = await fetch("/" + method);
			if(!response.ok) throw new Error(`HTTP error: ${response.status}`);
			return response.json();
		} catch(error) {
			console.error("Fetch failed: ", error);
		}
		return "";
	}
	async #gotoPage(site) {
	    try {
	        const parsedUrl = new URL(site, window.location.origin);
	        window.location.href = parsedUrl.href;
	    } catch (error) {
	        console.error("Invalid URL:", error);
	        alert("The target URL is invalid.");
	    }
	}
}
customElements.define("game-list", List);