import { Outlet } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { ReactQueryProvider } from "./providers/ReactQuery";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ReactQueryProvider>
        <Outlet />
        <Toaster />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default App;
