# Implementation Plan: Personal Portfolio (2026)

This document provides a step-by-step guide to implementing your portfolio using **React**, **Vite**, **Redux Toolkit**, and **Material-UI (MUI)** with a modern **Glassmorphism** design.

---

## 1. Project Setup

Initialize the project using Vite with the React + TypeScript template.

```bash
# Create the project
npm create vite@latest portfolio -- --template react-ts

# Install core dependencies
npm install @mui/material @emotion/react @emotion/styled @reduxjs/toolkit react-redux framer-motion lucide-react

# Install dev dependencies
npm install -D @types/react @types/react-dom
```

---

## 2. Theme Configuration (MUI + Glassmorphism)

Create a custom theme that supports Dark Mode by default and includes glassmorphism utility styles.

### `src/theme/theme.ts`

```typescript
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9c27b0", // Electric Violet
    },
    background: {
      default: "#0a0a0a", // Deep Charcoal
      paper: "rgba(255, 255, 255, 0.05)", // Glass effect base
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
        },
      },
    },
  },
});
```

---

## 3. Global State (Redux Toolkit)

Manage UI states like theme toggling and navigation.

### `src/features/ui/uiSlice.ts`

```typescript
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { darkMode: true, menuOpen: false },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { toggleTheme, toggleMenu } = uiSlice.actions;
export default uiSlice.reducer;
```

---

## 4. Glassmorphism Component

Create a reusable `GlassCard` component for sections and content.

### `src/components/GlassCard.tsx`

```tsx
import React from "react";
import { Paper, Box, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "16px",
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(12px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    border: "1px solid rgba(156, 39, 176, 0.3)", // Primary color glow
  },
}));

export const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <StyledPaper>
    <Box>{children}</Box>
  </StyledPaper>
);
```

---

## 5. Main Application Structure

Wrap the app with providers for Redux and MUI.

### `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./app/store";
import { theme } from "./theme/theme";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
```

---

## 6. Next Steps

1. **Hero Section**: Implement with `framer-motion` for entrance animations.
2. **Projects Feature**: Create a slice to manage project data and display them in `GlassCard`s.
3. **Contact Form**: Add validation using `formik` or `react-hook-form`.
