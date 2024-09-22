import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';

// Static weather data
const staticWeatherData = [
    { date: '2024-09-01', tempCelsius: 25, tempFahrenheit: 77, description: 'Sunny' },
    { date: '2024-09-02', tempCelsius: 23, tempFahrenheit: 73, description: 'Partly Cloudy' },
    { date: '2024-09-03', tempCelsius: 20, tempFahrenheit: 68, description: 'Rainy' },
    { date: '2024-09-04', tempCelsius: 22, tempFahrenheit: 72, description: 'Cloudy' },
    { date: '2024-09-05', tempCelsius: 24, tempFahrenheit: 75, description: 'Windy' },
    { date: '2024-09-06', tempCelsius: 21, tempFahrenheit: 70, description: 'Showers' },
    { date: '2024-09-07', tempCelsius: 19, tempFahrenheit: 66, description: 'Thunderstorm' },
    { date: '2024-09-08', tempCelsius: 26, tempFahrenheit: 79, description: 'Sunny' },
  ];

interface WeatherWidgetProps {
  location: string;
  onRemove: () => void;
  unit: 'Celsius' | 'Fahrenheit';
}

// Helper function to get icon based on weather description
const getWeatherIcon = (description: string) => {
  switch (description) {
    case 'Sunny':
      return <WbSunnyIcon sx={{ fontSize: 40, color: '#ffeb3b' }} />;
    case 'Partly Cloudy':
    case 'Cloudy':
      return <CloudIcon sx={{ fontSize: 40, color: '#90a4ae' }} />;
    case 'Rainy':
    case 'Showers':
      return <OpacityIcon sx={{ fontSize: 40, color: '#0288d1' }} />;
    case 'Windy':
      return <AirIcon sx={{ fontSize: 40, color: '#64b5f6' }} />;
    case 'Thunderstorm':
      return <ThunderstormIcon sx={{ fontSize: 40, color: '#f57f17' }} />;
    default:
      return <WbSunnyIcon sx={{ fontSize: 40, color: '#ffeb3b' }} />;
  }
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location, onRemove, unit }) => {
  const [weatherData, setWeatherData] = useState<{ temp: number; description: string; date: string }[]>([]);

  useEffect(() => {
    const mappedData = staticWeatherData.map((day) => ({
      temp: unit === 'Celsius' ? day.tempCelsius : day.tempFahrenheit,
      description: day.description,
      date: day.date,
    }));
    setWeatherData(mappedData);
  }, [unit]);

  return (
    <Card
      sx={{
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': { transform: 'scale(1.02)' },
        padding: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            {location}
          </Typography>
          <IconButton onClick={onRemove} sx={{ color: '#f44336' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {weatherData.map((data, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 2,
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                }}
              >
                {/* Weather icon based on description */}
                {getWeatherIcon(data.description)}
                {/* Date and Day display */}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {new Date(data.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575' }}>
                    {new Date(data.date).toLocaleDateString('en-US')}
                  </Typography>
                </Box>
                {/* Temperature and description */}
                <Box textAlign="right">
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {data.temp}° {unit}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {data.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
