# extension-crawl-shoppe (v1)

[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)


## Usage

### Build server
https://github.com/phonghaw2/order-food-php

### Set-up

 Setting your server domain in `js/background.js`

```javascript
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        domainServer: 'http://order-food.test', // Setting your server domain in here!
    }, () => {})
});
```

Turn on Developer Mode in `chrome://extensions/`

Load unpacked -> Select your `extension-crawl-shoppe` directory

If your protocol server is `https`, dont' need to setting on Site setting

![image](https://github.com/phonghaw2/extension-crawl-shopee/assets/77913075/e70111ce-8b9b-40c8-9145-9e225754f707)

Or access this url : `chrome://settings/content/siteDetails?site=https%3A%2F%2Fshopeefood.vn`

![image](https://github.com/phonghaw2/extension-crawl-shopee/assets/77913075/11819274-a191-4d6d-9e7f-efff82af961e)


### Action crawl

1. Visit the store's website
2. Zoom-out to load full item (Crtl + Mouse wheel down)
3. Click on icon 
