// Content script to handle ar:// and ipfs:// link clicks
console.log('Gateway Redirector content script loaded');

// Function to handle protocol URLs
function handleProtocolUrl(url) {
  if (url.startsWith('ar://') || url.startsWith('ipfs://')) {
    console.log('Intercepting protocol URL:', url);
    
    // Send message to background script
    chrome.runtime.sendMessage({
      action: 'redirect',
      url: url
    }, (response) => {
      if (response && response.success) {
        console.log('URL redirected successfully');
      } else {
        console.log('Failed to redirect URL');
      }
    });
    
    return true; // Prevent default behavior
  }
  return false;
}

// Intercept clicks on links
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && link.href) {
    const url = link.href;
    if (handleProtocolUrl(url)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
});

// Also intercept navigation attempts
document.addEventListener('beforeunload', (event) => {
  const url = window.location.href;
  if (handleProtocolUrl(url)) {
    event.preventDefault();
  }
});

// Handle any existing links on the page
function processExistingLinks() {
  const links = document.querySelectorAll('a[href^="ar://"], a[href^="ipfs://"]');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const url = link.href;
      if (handleProtocolUrl(url)) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
}

// Process links when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processExistingLinks);
} else {
  processExistingLinks();
}

// Also process links that might be added dynamically
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const links = node.querySelectorAll ? node.querySelectorAll('a[href^="ar://"], a[href^="ipfs://"]') : [];
        links.forEach(link => {
          link.addEventListener('click', (event) => {
            const url = link.href;
            if (handleProtocolUrl(url)) {
              event.preventDefault();
              event.stopPropagation();
            }
          });
        });
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
}); 