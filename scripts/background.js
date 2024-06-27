browser.browserAction.onClicked.addListener((tab) => {
    const smplayerNativeMessagingHost = "send_to_smplayer"; // Update this with the registered Native Messaging host name
    const currentUrl = tab.url;

    browser.storage.sync.get(['speed', 'smplayerPath']).then((result) => {
        const speed = result.speed || 'normal_speed';
        const smplayerPath = result.smplayerPath || 'smplayer'; // Default to 'smplayer' if no path is set
        console.info("SMPlayer Path : ", smplayerPath);

        const message = { url: currentUrl, command: speed, smplayerPath };

        console.log("Sending message to native app:", message);  // Log the message for debugging

        // Send the native message to SMPlayer
        browser.runtime.sendNativeMessage(smplayerNativeMessagingHost, message)
            .then((response) => {
                if (response && response.status === 'success') {
                    console.log("Sent URL to SMPlayer successfully.");
                } else {
                    console.error("Error sending URL to SMPlayer:", response);
                }
            })
            .catch((error) => {
                console.error("Error sending URL to SMPlayer:", error);
            });

        // Show a success notification immediately after sending the native message
        browser.notifications.create({
            type: "basic",
            iconUrl: browser.runtime.getURL("assets/logo.svg"),
            title: "SMPlayer Extension",
            message: "URL sent to SMPlayer."
        });
    });
});

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open the welcome page after the extension is installed
    browser.tabs.create({
      url: browser.runtime.getURL('html/instructions.html'),
    });
  } else if (details.reason === 'update') {
    // You can also add code here to handle updates to the extension
  }
});
