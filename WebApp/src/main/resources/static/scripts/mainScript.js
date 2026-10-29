document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", function() { gotoPage(`${contextPath}/`) });
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