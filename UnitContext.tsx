import React, { createContext, useState, ReactNode } from 'react';

interface UnitContextProps {
  unit: 'Celsius' | 'Fahrenheit';
  toggleUnit: () => void;
}

// Create the context with default values
export const UnitContext = createContext<UnitContextProps>({
  unit: 'Celsius',
  toggleUnit: () => {},
});

interface UnitProviderProps {
  children: ReactNode; // Explicitly define the type of children
}

export const UnitProvider = ({ children }: UnitProviderProps) => {
  const [unit, setUnit] = useState<'Celsius' | 'Fahrenheit'>('Celsius');

  // Function to toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  return (
    // Provide the context values to the children
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};
