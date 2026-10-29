document.addEventListener("DOMContentLoaded", (event) => {
    const lightsoutBtn = document.getElementById("lightsoutBtn");
    const mastermindBtn = document.getElementById("mastermindBtn");
    const bottlesortBtn = document.getElementById("bottlesortBtn");
    lightsoutBtn.addEventListener("click", function() { gotoPage(`${contextPath}/lightsout/play`) });
    mastermindBtn.addEventListener("click", function() { gotoPage(`${contextPath}/mastermind/play`) });
    bottlesortBtn.addEventListener("click", function() { gotoPage(`${contextPath}/bottlesort/play`) });

});
async function gotoPage(site) {
    try {
        // Validate URL format
        const parsedUrl = new URL(site, window.location.origin);
        // Perform the redirect
        window.location.href = parsedUrl.href;
    } catch (error) {
        console.error("Invalid URL:", error);
        alert("The target URL is invalid.");
    }
}