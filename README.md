# Currency Converter Web Application

A modern, responsive web application for converting currencies with real-time exchange rates.

## Features

- 🌍 **Real-time Exchange Rates**: Fetches current exchange rates from ExchangeRate-API
- 💱 **10+ Popular Currencies**: Support for USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NZD
- 🔄 **Currency Swap**: Quick swap between from/to currencies with animation
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Auto-conversion**: Converts automatically as you type (with debouncing)
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 🔄 **Offline Fallback**: Uses fallback rates if API is unavailable
- ⌨️ **Keyboard Support**: Press Enter to convert

## Files

- `currency-converter.html` - Main HTML file
- `currency-style.css` - Styling and responsive design
- `currency-script.js` - JavaScript functionality and API integration

## How to Use

1. **Open the Application**: Open `currency-converter.html` in your web browser
2. **Enter Amount**: Type the amount you want to convert
3. **Select Currencies**: Choose the source and target currencies from the dropdowns
4. **Convert**: Click "Convert" or press Enter to see the result
5. **Swap**: Use the swap button (⇄) to quickly reverse the conversion

## Running Locally

### Option 1: Direct File Opening
Simply open `currency-converter.html` in your web browser.

### Option 2: Local Server (Recommended)
For the best experience and to avoid CORS issues:

```bash
# Navigate to the project directory
cd /Users/haxtelz/Developer/tictactoe-game

# Start a local server (Python 3)
python3 -m http.server 8000

# Or with Node.js (if you have it installed)
npx serve .

# Or with PHP (if you have it installed)
php -S localhost:8000
```

Then open `http://localhost:8000/currency-converter.html` in your browser.

## API Integration

The application uses the ExchangeRate-API service:
- **Demo Mode**: Currently using demo endpoints (limited but functional)
- **Production**: For production use, get a free API key from [ExchangeRate-API](https://exchangerate-api.com)
- **Fallback**: If the API is unavailable, fallback rates are used

### To use your own API key:
1. Get a free API key from ExchangeRate-API
2. Open `currency-script.js`
3. Replace `'demo'` with your actual API key:
   ```javascript
   this.apiKey = 'your-actual-api-key-here';
   ```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Customization

### Adding More Currencies
Edit the `<select>` options in `currency-converter.html` and add corresponding rates in the fallback rates object in `currency-script.js`.

### Styling
Modify `currency-style.css` to change colors, fonts, or layout. The design uses CSS custom properties for easy theming.

### Functionality
Extend `currency-script.js` to add features like:
- Historical exchange rates
- Currency rate charts
- Favorite currency pairs
- Rate change notifications

## Technical Details

- **No external dependencies**: Pure HTML, CSS, and JavaScript
- **Mobile-first design**: Responsive design starting from mobile
- **Error handling**: Graceful fallback when API is unavailable
- **Performance optimized**: Debounced input handling
- **Accessibility**: Semantic HTML and keyboard navigation

## License

This project is open source and available under the MIT License.