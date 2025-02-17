document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const clickButton = document.getElementById("clickButton");

  // Send a message to the content script to get scraped content
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab.url.includes("eticket")) {
      chrome.tabs.sendMessage(
        activeTab.id,
        { action: "getContent" },
        (response) => {
          contentDiv.innerHTML = response.content;
        }
      );
    } else {
      contentDiv.innerHTML = "Content script is not running on this page.";
    }
  });

  // rename it to choose-ticket, cz next time we're implementing that part
  clickButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(
        activeTab.id,
        { action: "simulateClick" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
          console.log("Click simulated:", response.success);
        }
      );
    });
  });
});
