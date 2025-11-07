# 📍 Nearby Places Finder

A beautiful React Native mobile app that helps you discover restaurants, shops, hospitals, cafes, and gas stations near you. Built with Expo and powered by Google Maps.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Expo SDK](https://img.shields.io/badge/Expo-SDK%2052-black.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb.svg)

## ✨ Features

- 🗺️ **Live Location Tracking** - Real-time GPS tracking with automatic updates
- 📍 **Custom Map Markers** - Color-coded markers for different place categories
- 🔍 **Smart Search** - Search places by name or category with auto-suggestions
- 🎯 **Category Filters** - Filter by Restaurants, Shops, Hospitals, Cafes, or Gas Stations
- 📏 **Distance Calculator** - Shows exact distance from your current location
- 🛣️ **Route Display** - Visual route lines with distance labels on the map
- ⭐ **Rating System** - View ratings for each place
- 🌓 **Dark Mode** - Beautiful light and dark themes (Bootstrap 5 inspired)
- 📱 **Responsive Design** - Works perfectly on all screen sizes

## 📸 Screenshots

```
[Home Screen] - Shows map + nearby places list
[Map Screen] - Full-screen map with place details
[Search] - Auto-suggest search with instant results
[Filters] - Category filters with active state
```

## 🚀 Quick Start

### Prerequisites

Make sure you have these installed:
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. **Clone or download the project**
```bash
cd NearbyPlacesFinder
```

2. **Install dependencies**
```bash
npm install
```

3. **Add your Google Maps API Key**

Open `app.json` and replace the API key:
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_GOOGLE_MAPS_API_KEY_HERE"
    }
  }
},
"ios": {
  "config": {
    "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY_HERE"
  }
}
```

> **How to get Google Maps API Key:**
> 1. Go to [Google Cloud Console](https://console.cloud.google.com/)
> 2. Create a new project
> 3. Enable these APIs:
>    - Maps SDK for Android
>    - Maps SDK for iOS
>    - Places API
> 4. Create credentials → API Key
> 5. Copy and paste into `app.json`

4. **Start the development server**
```bash
npm start
```

5. **Run on your device**
- Scan the QR code with **Expo Go** app (iOS/Android)
- Or press `a` for Android emulator
- Or press `i` for iOS simulator

## 📱 Testing on Physical Device

### Android
```bash
# Build APK for testing
npx expo run:android

# Or use EAS Build
eas build --platform android --profile preview
```

### iOS
```bash
# Run on iOS simulator
npx expo run:ios

# Or use EAS Build
eas build --platform ios --profile preview
```

## 🗂️ Project Structure

```
NearbyPlacesFinder/
├── App.js                      # Root component with navigation
├── app.json                    # Expo configuration
├── package.json                # Dependencies
└── src/
    ├── components/
    │   ├── Common/
    │   │   ├── Header.js       # App header with theme toggle
    │   │   └── LoadingSpinner.js
    │   ├── Map/
    │   │   ├── MapDisplay.js   # Google Maps component
    │   │   ├── CustomMarkers.js # Place markers
    │   │   └── RoutePolyline.js # Route lines
    │   └── UI/
    │       ├── SearchBar.js    # Search with auto-suggestions
    │       ├── FilterButtons.js # Category filters
    │       ├── PlaceCard.js    # Place info cards
    │       └── ThemeToggle.js  # Light/Dark mode switch
    ├── screens/
    │   ├── HomeScreen.js       # Home screen (map + list)
    │   └── MapScreen.js        # Full map screen
    ├── redux/
    │   ├── store.js            # Redux store
    │   └── slices/
    │       ├── locationSlice.js # Location state
    │       ├── placesSlice.js   # Places state
    │       └── themeSlice.js    # Theme state
    ├── services/
    │   ├── locationService.js  # GPS & location tracking
    │   └── placesApi.js        # Mock places data
    ├── utils/
    │   ├── constants.js        # App constants & colors
    │   └── helpers.js          # Helper functions
    └── styles/
        └── themes.js           # Light & dark themes
```

## 🎨 Color Palette (Bootstrap 5)

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0d6efd` | Buttons, links, primary actions |
| Success Green | `#198754` | Hospitals, success states |
| Danger Red | `#dc3545` | Restaurants, error states |
| Warning Yellow | `#ffc107` | Shops, warnings |
| Info Cyan | `#0dcaf0` | Information, tips |
| Secondary Gray | `#6c757d` | All places, secondary text |

## 🔧 Technologies Used

- **Expo SDK 52** - React Native development platform
- **React Native 0.81.5** - Mobile app framework
- **Redux Toolkit** - State management
- **expo-location** - GPS and location services
- **react-native-maps** - Google Maps integration
- **React Navigation** - Bottom tab navigation
- **Axios** - HTTP client (ready for API integration)

## 📦 Key Dependencies

```json
{
  "expo": "~54.0.22",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "@reduxjs/toolkit": "^2.10.1",
  "react-redux": "^9.2.0",
  "expo-location": "~19.0.7",
  "react-native-maps": "1.20.1",
  "@react-navigation/native": "^7.1.8",
  "@react-navigation/bottom-tabs": "^7.4.0"
}
```

## 🎯 How to Use the App

1. **Grant Location Permission**
   - App will ask for location access on first launch
   - Allow "While using the app" permission

2. **View Nearby Places**
   - Home screen shows map at top and places list below
   - Places are automatically sorted by distance

3. **Filter by Category**
   - Tap category buttons: All, Restaurants, Cafes, Shops, Hospitals, Gas
   - Map markers and list update instantly

4. **Search Places**
   - Type in search bar
   - Get auto-suggestions as you type
   - Tap suggestion to view on map

5. **View Place Details**
   - Tap any place card or map marker
   - See distance, rating, address, phone
   - Route line appears on map

6. **Switch Themes**
   - Tap sun/moon icon in header
   - Toggle between light and dark mode

7. **Full Map View**
   - Tap "Map" tab at bottom
   - Explore full-screen map
   - Search and filter work here too

## 🔍 Current Features

✅ Real-time GPS location tracking  
✅ Google Maps integration with custom styling  
✅ Category-based filtering (6 categories)  
✅ Distance calculation (Haversine formula)  
✅ Search with auto-suggestions  
✅ Route polylines with distance labels  
✅ Rating display for places  
✅ Light/Dark mode themes  
✅ Responsive design  
✅ Mock data (13 sample places in Dhaka)  

## 🚧 Future Enhancements

- [ ] Connect to Google Places API for real data
- [ ] Add favorites/bookmarks feature
- [ ] Turn-by-turn navigation
- [ ] User reviews and photos
- [ ] Share location with friends
- [ ] Offline mode with cached data
- [ ] Push notifications for nearby deals
- [ ] Multi-language support

## 🐛 Troubleshooting

### Map not showing?
- Check if Google Maps API key is added in `app.json`
- Make sure you enabled Maps SDK for Android/iOS in Google Cloud Console

### Location not working?
- Verify location permissions are granted
- Check if device GPS is enabled
- Restart the app

### App crashing on startup?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start --clear
```

### Build errors?
```bash
# Update dependencies
npm update
npx expo install --fix
```

## 📝 API Integration (Coming Soon)

Currently using mock data in `src/services/placesApi.js`. To connect to real API:

1. Replace mock functions with Axios calls
2. Update `API_ENDPOINTS` in `constants.js`
3. Add API key to environment variables
4. Handle API rate limits and errors

Example:
```javascript
export const getNearbyPlaces = async (latitude, longitude, category) => {
  const response = await axios.get(`${API_BASE_URL}/places/nearby`, {
    params: { lat: latitude, lng: longitude, category }
  });
  return response.data;
};
```

## 🤝 Contributing

This is a personal project, but feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is for educational and portfolio purposes.

## 👨‍💻 Developer

Built with ❤️ by **Shaikh Radwan Ahmed Ratul**

- GitHub: [@rad129ratul](https://github.com/rad129ratul)
- LinkedIn: [linkedin.com/in/shaikh-radwan-374435358](https://linkedin.com/in/shaikh-radwan-374435358)
- Email: ratulrs29@gmail.com
- Location: Dhaka, Bangladesh

## 🙏 Acknowledgments

- Google Maps Platform for mapping services
- Expo team for amazing development tools
- Bootstrap 5 for design inspiration
- React Native community for support

---

**Need help?** Open an issue or contact me directly!

**Like this project?** Give it a ⭐ on GitHub!

Made with Expo 🚀 | React Native 📱 | Redux Toolkit 🔧