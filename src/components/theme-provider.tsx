import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'dark', // Default theme is 'dark'
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'dark', // Default theme is now 'dark'
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  // Use state with an initial value based on localStorage (only on the client side)
  const [theme, setTheme] = useState<Theme>('dark'); // Set 'dark' as the default theme

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure localStorage is only accessed in the browser
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      if (storedTheme) {
        setTheme(storedTheme); // If there's a stored theme, use it
      } else {
        setTheme(defaultTheme); // Otherwise, use the default theme ('dark')
      }
    }
  }, [defaultTheme, storageKey]);

  // This effect will update the document's root class based on the theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');

      if (theme === 'system') {
        // Use the system preference
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme); // Add 'dark' or 'light' class based on the theme
      }
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== 'undefined') {
        // Only write to localStorage in the browser
        localStorage.setItem(storageKey, theme);
      }
      setTheme(theme); // Update the theme state
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
