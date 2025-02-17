console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "getContent") {
		console.log("got your req");
		const scrapedContent =
			document.getElementsByClassName("from_to_location")[0].innerText; // Replace with your scraping logic
		sendResponse({ content: scrapedContent });
	} else if (request.action === "simulateClick") {
		const button = document.getElementsByClassName("book-now-btn")[0]; // Replace with your target element
		if (button) {
			button.click();
			sendResponse({ success: true });
		} else {
			sendResponse({ success: false });
		}
	}
	return true; // Required for async sendResponse
});

// now need to implement ticket choosing function
// for that \d[0-9] regex is perfect
// apply that regex to all select value members
