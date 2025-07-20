// Default gateway configurations
const DEFAULT_GATEWAYS = {
  arweave: 'https://arweave.net',
  ipfs: 'https://ipfs.io/ipfs'
};

// Load gateway settings from storage
async function getGatewaySettings() {
  const result = await chrome.storage.sync.get(['arweaveGateway', 'ipfsGateway']);
  return {
    arweave: result.arweaveGateway || DEFAULT_GATEWAYS.arweave,
    ipfs: result.ipfsGateway || DEFAULT_GATEWAYS.ipfs
  };
}

// Function to redirect URLs
async function redirectUrl(tabId, originalUrl) {
  console.log('Attempting to redirect:', originalUrl);
  
  if (originalUrl.startsWith('ar://')) {
    const gateways = await getGatewaySettings();
    const arweaveId = originalUrl.replace('ar://', '');
    const redirectUrl = `${gateways.arweave}/${arweaveId}`;
    
    console.log(`Redirecting ar://${arweaveId} to ${redirectUrl}`);
    try {
      await chrome.tabs.update(tabId, { url: redirectUrl });
      return true;
    } catch (error) {
      console.error('Error redirecting ar:// URL:', error);
    }
  }
  
  if (originalUrl.startsWith('ipfs://')) {
    const gateways = await getGatewaySettings();
    const ipfsHash = originalUrl.replace('ipfs://', '');
    const redirectUrl = `${gateways.ipfs}/${ipfsHash}`;
    
    console.log(`Redirecting ipfs://${ipfsHash} to ${redirectUrl}`);
    try {
      await chrome.tabs.update(tabId, { url: redirectUrl });
      return true;
    } catch (error) {
      console.error('Error redirecting ipfs:// URL:', error);
    }
  }
  
  return false;
}

// Handle navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  console.log('onBeforeNavigate triggered:', details.url);
  await redirectUrl(details.tabId, details.url);
});

// Handle tab updates (more comprehensive)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log('onUpdated triggered:', changeInfo, tab.url);
  
  // Check if URL changed and is a protocol we handle
  if (changeInfo.url && (changeInfo.url.startsWith('ar://') || changeInfo.url.startsWith('ipfs://'))) {
    console.log('Detected protocol URL in tab update:', changeInfo.url);
    await redirectUrl(tabId, changeInfo.url);
  }
  
  // Also check the current tab URL
  if (tab.url && (tab.url.startsWith('ar://') || tab.url.startsWith('ipfs://'))) {
    console.log('Detected protocol URL in current tab:', tab.url);
    await redirectUrl(tabId, tab.url);
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
  if (request.action === 'redirect') {
    const tabId = sender.tab.id;
    const url = request.url;
    
    redirectUrl(tabId, url).then(success => {
      sendResponse({ success: success });
    });
    
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'test') {
    sendResponse({ status: 'Extension is working' });
  }
});

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Gateway Redirector extension installed');
  
  // Set default gateway settings
  chrome.storage.sync.set({
    arweaveGateway: DEFAULT_GATEWAYS.arweave,
    ipfsGateway: DEFAULT_GATEWAYS.ipfs
  });
}); 