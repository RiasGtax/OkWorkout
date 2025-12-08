# OkWorkout

A modern, interactive weekly workout schedule planner built with React and Vite.

Demo page: https://riasgtax.github.io/OkWorkout/

## Features

- **Interactive Schedule Grid**: Click on time slots to plan your workouts across the week
- **Full-Page Layout**: Schedule fits the entire viewport without scrolling
- **Dark Theme**: Sleek red and grey color scheme
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean interface with smooth animations and hover effects

## Tech Stack

- React 19.2.0
- Vite 7.2.6
- CSS Variables for theming
- Inter font family

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Header with logo and branding
│   ├── Header.css          # Header styles
│   ├── WeekSchedule.jsx    # Interactive schedule grid
│   └── WeekSchedule.css    # Schedule styles
├── App.jsx                 # Main application component
├── App.css                 # Application styles
├── index.css               # Global styles and design system
└── main.jsx                # Application entry point
```

## Color Scheme

- **Primary Red**: #a52525
- **Background**: #1a1a1a (dark grey)
- **Surface**: #252525 (mid grey)
- **Text**: #e0e0e0 (light grey)

## License

This project is open source and available under the MIT License.
