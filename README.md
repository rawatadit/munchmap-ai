# Restaurant Swipe App 🍽️

A Tinder-style web application for discovering nearby restaurants. Built with React and Express.

## 🎯 Project Overview

This application allows users to swipe through restaurant recommendations in a Tinder-like interface. Users can:
- View restaurant cards with photos, ratings, and details
- Swipe right to "like" restaurants or left to "pass"
- Use action buttons as an alternative to swiping
- View their liked restaurants in a dedicated section
- Experience smooth animations and modern UI

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with Hooks
- **Build Tool**: Vite for fast development
- **Styling**: CSS3 with modern features
- **Gestures**: react-swipeable for touch interactions
- **Port**: Runs on http://localhost:5180 (or next available)

### Backend (Express.js)
- **Framework**: Express.js with CORS enabled
- **API**: Google Places API integration (with dummy data fallback)
- **Port**: Runs on http://localhost:3001
- **Features**: Restaurant data fetching, filtering, and sorting

## ⚡ Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Google Places API key (optional - dummy data works without it)

### Installation

1. **Install root dependencies:**
```bash
npm install
```

2. **Install client dependencies:**
```bash
cd client
npm install
cd ..
```

### Running the Application

1. **Start the backend server:**
```bash
npm start
```

2. **In a new terminal, start the React development server:**
```bash
cd client
npm run dev
```

3. **Access the application:**
   - Open your browser to the URL shown in the terminal (typically http://localhost:5180)
   - The app will load with dummy restaurant data by default

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google Places API Key (optional)
GOOGLE_API_KEY=your_api_key_here

# Server Configuration
PORT=3001
```

### Google Places API Setup (Optional)

The app works with dummy data by default, but you can enable real restaurant data:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Places API
4. Create an API key
5. Add the key to your `.env` file
6. Set `useDummyData = false` in `server.js`

## 🎨 Features

### Current Features ✅
- **Swipe Gestures**: Touch-friendly swiping on mobile/desktop
- **Action Buttons**: Click-based Like/Pass buttons
- **Dummy Data**: 6 realistic restaurant entries for testing
- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful fallbacks for API failures
- **Modern UI**: Clean, card-based interface with gradients
- **Liked List**: Track and display liked restaurants

### Technical Features
- **CORS Enabled**: Frontend can call backend directly
- **Hot Reload**: Development changes update instantly
- **Proxy Configuration**: Vite proxy setup for API calls
- **Error Boundaries**: Proper error handling throughout
- **Geolocation Fallback**: Works without location access

## 🚀 Development Journey

### Checkpoint: Working Basic Application

**Date**: January 24, 2025
**Status**: ✅ Basic functionality working

#### What We Built:
1. **Full-stack setup** with React frontend and Express backend
2. **Dummy data integration** for immediate testing
3. **Modern UI/UX** with swipe gestures and action buttons
4. **Proper error handling** and loading states
5. **CORS-enabled API** for seamless frontend-backend communication

#### Technical Challenges Solved:
1. **Server Conflicts**: Multiple Vite processes causing port conflicts
2. **CORS Issues**: Frontend couldn't access backend API
3. **Geolocation Blocking**: App hanging on location permission
4. **JSX Structure**: Missing closing tags causing render issues
5. **Proxy Configuration**: Vite proxy causing timeouts
6. **API Integration**: Google Places API setup and fallback handling

#### Current Architecture:
```
Frontend (React)          Backend (Express)         Data Source
http://localhost:5180  →  http://localhost:3001  →  Dummy Data / Google API
     ↓                         ↓                         ↓
  Swipe UI              Restaurant API            Restaurant Info
```

## 📁 Project Structure

```
openai-codex/
├── server.js              # Express backend server
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── README.md              # This documentation
├── .gitignore            # Git ignore rules
└── client/               # React frontend
    ├── src/
    │   ├── App.jsx       # Main React component
    │   ├── App.css       # Styling
    │   ├── main.jsx      # React entry point
    │   └── index.css     # Global styles
    ├── public/           # Static assets
    ├── package.json      # Frontend dependencies
    ├── vite.config.js    # Vite configuration
    └── index.html        # HTML template
```

## 🐛 Known Issues

### Current Limitations:
1. **Multiple Vite Processes**: May accumulate over development sessions
2. **Port Management**: Automatic port selection can be confusing
3. **Mobile Gestures**: Swipe sensitivity may need tuning
4. **Photo Loading**: Google Photos API requires proper key setup
5. **Restaurant Filtering**: Time-based filtering may be too restrictive

### Future Improvements:
- Real-time location-based suggestions
- User preferences and dietary restrictions
- Restaurant details modal
- Save favorites to local storage
- Social sharing features
- Better mobile optimization

## 🔨 Development Commands

```bash
# Kill all servers (if needed)
pkill -f "node server.js" && pkill -f "vite"

# Check running processes
ps aux | grep -E "(node|vite)" | grep -v grep

# Check ports in use
lsof -i -P | grep LISTEN | grep node

# Build for production
cd client && npm run build

# View logs (if running with nohup)
tail -f server.log
tail -f client/client.log
```

## 🤝 Contributing

This is a development checkpoint. The application works but has room for improvement:

1. **UI/UX Enhancements**: Better animations, transitions, and feedback
2. **Feature Additions**: User profiles, restaurant details, reviews
3. **Performance**: Optimize bundle size and loading times
4. **Testing**: Add unit and integration tests
5. **Documentation**: API documentation and code comments

## 📝 License

MIT License - Feel free to use and modify as needed.

---

**Note**: This is a working checkpoint of a restaurant discovery app. While functional, it's designed for further development and enhancement.
