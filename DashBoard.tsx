import React, { useState, useContext } from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WeatherWidget from './WeatherWidget';
import { UnitContext } from './UnitContext';
import useLocalStorage from './useLocalStorage';

interface Widget {
  id: number;
  location: string;
}

const WeatherDashboard: React.FC = () => {
  const [widgets, setWidgets] = useLocalStorage<Widget[]>('widgets', []);
  const { unit } = useContext(UnitContext);

  const generateId = (): number => Math.floor(Math.random() * 10000);

  const addWidget = () => {
    const newWidget = { id: generateId(), location: 'New York' };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (index: number) => {
    const updatedWidgets = widgets.filter((_, i) => i !== index);
    setWidgets(updatedWidgets);
  };

  return (
    <Box sx={{ padding: 3, background: 'linear-gradient(180deg, #e3f2fd 30%, #ffffff 70%)', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Weather Dashboard
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={addWidget} 
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: '20px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#115293',
            }
          }}
        >
          Add Widget
        </Button>
      </Box>

      {/* Weather Widgets Grid */}
      <Grid container spacing={3}>
        {widgets.map((widget, index) => (
          <Grid item xs={12} sm={6} md={4} key={widget.id}>
            <Box sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              padding: 2,
              textAlign: 'center'
            }}>
              <WeatherWidget 
                location={widget.location} 
                onRemove={() => removeWidget(index)} 
                unit={unit} 
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Prompt if no widgets */}
      {widgets.length === 0 && (
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ color: '#777', marginTop: 4 }}
        >
          No weather widgets yet. Click "Add Widget" to get started!
        </Typography>
      )}
    </Box>
  );
};

export default WeatherDashboard;
