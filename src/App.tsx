import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import WeatherDashboard from "./pages/weather-dashboard";
import CityPage from "./pages/city-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <WeatherDashboard />,
            },
            {
                path: "/city/:cityName",
                element: <CityPage />,
            },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider defaultTheme="dark">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
