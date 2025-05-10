# Movie Explorer

A modern web application for discovering and exploring movies using the TMDb API.

## Features

- User authentication
- Movie search and discovery
- Detailed movie information
- Favorite movies functionality
- Responsive design with light/dark mode
- Modern UI with Material-UI components

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDb API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Deployment to Vercel

1. Push your code to a GitHub repository

2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account

3. Click "New Project" and import your repository

4. Configure the project:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. Add Environment Variables:
   - Add `REACT_APP_TMDB_API_KEY` with your TMDb API key

6. Click "Deploy"

## Demo Credentials

- Username: demo
- Password: demo123

## Technologies Used

- React
- TypeScript
- Material-UI
- React Router
- Axios
- TMDb API

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  │   ├── Layout.tsx
  │   ├── MovieCard.tsx
  │   └── SearchBar.tsx
  ├── pages/         # Page components
  │   ├── Home.tsx
  │   └── MovieDetails.tsx
  ├── services/      # API and other services
  │   └── api.ts
  ├── context/       # React Context for state management
  │   └── ThemeContext.tsx
  ├── types/         # TypeScript type definitions
  │   └── movie.ts
  └── utils/         # Utility functions
```

## Features Implemented

1. **Movie Search**
   - Real-time search using TMDb API
   - Display search results in a responsive grid
   - Show movie posters, titles, and ratings

2. **Movie Details**
   - Comprehensive movie information
   - Cast and crew details
   - YouTube trailer integration
   - Favorite movie functionality

3. **User Experience**
   - Light/Dark mode toggle
   - Responsive design for all devices
   - Loading states and error handling
   - Smooth navigation

4. **Data Management**
   - Local storage for favorites
   - Efficient API calls
   - TypeScript for type safety
