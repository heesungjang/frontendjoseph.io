import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

type Action = { type: 'toggle' };
type Dispatch = (action: Action) => void;
type State = { isDark: boolean };
type ThemeModeProviderProps = { children: React.ReactNode };

const ThemeModeContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function themeReducer(state: State, action: Action) {
  switch (action.type) {
    case 'toggle': {
      localStorage.setItem('theme', !state.isDark ? 'dark' : 'light');
      return { isDark: !state.isDark };
    }
    default: {
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, {
    isDark: false,
  });
  console.log(state);

  const value = { state, dispatch };

  useEffect(() => {
    const item = localStorage.getItem('theme');

    if (item === 'dark') {
      dispatch({ type: 'toggle' });
    }
  }, []);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }

  return context;
}

export function toggleThemeMode(dispatch: Dispatch) {
  dispatch({ type: 'toggle' });
}
