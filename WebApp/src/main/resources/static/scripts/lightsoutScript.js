document.addEventListener("DOMContentLoaded", () => {
	receiveData();
});
async function receiveData() {
	try {
		const response = await fetch("/lightsout/data");
		if(!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}
		const data = await response.json();
		await remakeFieldset(data);
	} catch(error) {
		console.error("Fetch failed: ", error);
	}
}
async function sendData(num) {
	try {
		const response = await fetch("/lightsout/click", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(num)
		});
		if(!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}
		const data = await response.json();
		updateFieldset(data.tiles);
		if(data.victory) await stageWon();
	} catch(error) {
		console.error("Fetch failed: ", error);
	}
}
async function remakeFieldset(tiles) {
	const field = document.createElement("fieldset");
	const legend = document.createElement("legend");
	legend.textContent = "Game";
	for(let row = 0; row < tiles.length; row++) {
		const section = document.createElement("section");
		for(let col = 0; col < tiles[row].length; col++) {
			const span = document.createElement("span");
			const image = document.createElement("img");
			image.src = tiles[row][col] ? `${contextPath}/media/square1.png` : `${contextPath}/media/square2.png`;
			image.class = "light";
			image.id = row * tiles.length + col;
			image.alt = "Button " + image.id;
			image.addEventListener("click", sendData.bind(null, image.id));
			span.appendChild(image);
			section.appendChild(span);
		}
		field.appendChild(section);
	}
	document.getElementsByTagName("fieldset")[0].replaceWith(field);
}
async function updateFieldset(tiles) {
	const rows = document.getElementsByTagName("section");
	for(let row = 0; row < tiles.length; row++) {
		const images = rows[row].getElementsByTagName("img");
		for(let col = 0; col < tiles[row].length; col++) {
			images[col].src = tiles[row][col] ? `${contextPath}/media/square1.png` : `${contextPath}/media/square2.png`;
		}
	}
}
async function stageWon() {
	const responseField = document.getElementById("response");
	const nextLvlBtn = document.getElementById("nextLvl");
	responseField.textContent = "Victory!";
	nextLvlBtn.removeAttribute("disabled");
}
async function nextLevel() {
	try {
		const response = await fetch("/lightsout/nextLevel");
		if(!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}
		const data = await response.json();
		if(data) {
			const responseField = document.getElementById("response");
			const nextLvlBtn = document.getElementById("nextLvl");
			responseField.textContent = " ";
			nextLvlBtn.setAttribute("disabled", true);
			receiveData();
		}
	} catch(error) {
		console.error("Fetch failed: ", error);
	}
}