// Example: Listen for tab updates and inject content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && tab.url.includes("eticket")) {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files: ["content.js"],
		});
	}
});
