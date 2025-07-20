// Load current settings when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  const result = await chrome.storage.sync.get(['arweaveGateway', 'ipfsGateway']);
  
  document.getElementById('arweaveGateway').value = result.arweaveGateway || 'https://arweave.net';
  document.getElementById('ipfsGateway').value = result.ipfsGateway || 'https://ipfs.io/ipfs';
});

// Handle save button click
document.getElementById('saveBtn').addEventListener('click', async () => {
  const arweaveGateway = document.getElementById('arweaveGateway').value.trim();
  const ipfsGateway = document.getElementById('ipfsGateway').value.trim();
  
  // Validate URLs
  if (!arweaveGateway || !ipfsGateway) {
    showStatus('Please fill in both gateway URLs', 'error');
    return;
  }
  
  if (!arweaveGateway.startsWith('http') || !ipfsGateway.startsWith('http')) {
    showStatus('Gateway URLs must start with http:// or https://', 'error');
    return;
  }
  
  try {
    // Save settings
    await chrome.storage.sync.set({
      arweaveGateway: arweaveGateway,
      ipfsGateway: ipfsGateway
    });
    
    showStatus('Settings saved successfully!', 'success');
    
    // Close popup after a short delay
    setTimeout(() => {
      window.close();
    }, 1500);
    
  } catch (error) {
    showStatus('Error saving settings: ' + error.message, 'error');
  }
});

// Show status message
function showStatus(message, type) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
  statusEl.style.display = 'block';
  
  // Hide after 3 seconds
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 3000);
} 