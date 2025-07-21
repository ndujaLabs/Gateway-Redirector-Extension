# Gateway Redirector Extension

A Chrome/Brave extension that automatically redirects `ar://` and `ipfs://` URLs to configurable gateways.

## Features

- **Automatic redirection** of `ar://` URLs to Arweave gateways
- **Automatic redirection** of `ipfs://` URLs to IPFS gateways
- **Configurable gateways** via popup interface
- **Simple and lightweight** - no unnecessary permissions

## Installation

### Development Mode

1. **Clone or download** this repository
2. **Open Chrome/Brave** and go to `chrome://extensions/`
3. **Enable "Developer mode"** (toggle in top right)
4. **Click "Load unpacked"** and select this folder
5. **Pin the extension** to your toolbar for easy access

### From Chrome Web Store

*Coming soon...*

## Usage

### Automatic Redirection

The extension automatically redirects URLs when you navigate to them:

- `ar://iyP62-Rs8uwBTCDjIkEzvjATIWqeKyiU2Kpqhso0AyA` → `https://arweave.net/iyP62-Rs8uwBTCDjIkEzvjATIWqeKyiU2Kpqhso0AyA` (Hoody.webp)
- `ipfs://QmdMPYwsTDs2snxzGAUAtBkivsDh8932GUQgTuayNygdsQ/BrokenJazz24.mp4` → `https://ipfs.io/ipfs/QmdMPYwsTDs2snxzGAUAtBkivsDh8932GUQgTuayNygdsQ/BrokenJazz24.mp4` (BrokenJazz24.mp4)

### Configuring Gateways

1. **Click the extension icon** in your toolbar
2. **Enter your preferred gateway URLs**:
   - **Arweave**: `https://arweave.net` (default)
   - **IPFS**: `https://ipfs.io/ipfs` (default)
3. **Click "Save Settings"**

### Popular Gateway Alternatives

#### Arweave Gateways
- `https://arweave.net` (official)
- `https://arweave.live`
- `https://arweave.dev`

#### IPFS Gateways
- `https://ipfs.io/ipfs` (official)
- `https://gateway.pinata.cloud/ipfs`
- `https://cloudflare-ipfs.com/ipfs`
- `https://dweb.link/ipfs`

## Development

### Project Structure

```
gateway-redirector-extension/
├── manifest.json          # Extension manifest
├── background.js          # Service worker for URL handling
├── content.js             # Content script for link interception
├── popup.html            # Settings popup interface
├── popup.js              # Popup JavaScript logic
├── test.html             # Test page for development
├── icons/                # Extension icons (16x16, 48x48, 128x128)
└── README.md             # This file
```

### Building

No build process required! The extension works directly from source.

### Testing

1. **Load the extension** in development mode
2. **Test with sample URLs**:
   - `ar://iyP62-Rs8uwBTCDjIkEzvjATIWqeKyiU2Kpqhso0AyA` (Hoody.webp)
   - `ipfs://QmdMPYwsTDs2snxzGAUAtBkivsDh8932GUQgTuayNygdsQ/BrokenJazz24.mp4` (BrokenJazz24.mp4)
3. **Check browser console** for redirect logs
4. **Use the included test.html** file for interactive testing

## Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## License

MIT License - feel free to use and modify as needed!


## Support

If you encounter any issues or have feature requests, please open an issue on GitHub.

## Copyright

Built with the help of [Cursor](https://cursor.sh/) AI coding assistant.  
(c) 2025+ ndujaLabs
