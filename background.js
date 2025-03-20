// When the extension is installed or updated, create the context menu.
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "openWithFreedium",
      title: "Open with Freedium",
      contexts: ["link"],
      // This ensures the menu appears for Medium links anywhere on the web
      targetUrlPatterns: ["*://*.medium.com/*"]
    });
  });
  
  // Listen for clicks on the context menu item.
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openWithFreedium" && info.linkUrl) {
      // Convert HTTPS to HTTP if needed
      let mediumUrl = info.linkUrl.replace(/^https:\/\//, "http://");
  
      // Construct the Freedium URL
      const newUrl = "https://freedium.cfd/" + mediumUrl;
  
      // Open the new URL in a new tab
      chrome.tabs.create({ url: newUrl });
    }
  });
  