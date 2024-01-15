chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        domainServer: 'http://order-food.test',
    }, () => {})
});

