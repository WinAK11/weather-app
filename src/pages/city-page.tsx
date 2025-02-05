import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import HourlyTemperature from "@/components/ui/hourly-temperature";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

export default function CityPage() {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");

    const coordinates = { lat, lon };

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data. Please try again.</p>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <WeatherSkeleton />;
    }

    return (
        <div className="space-y-4">
            {/* Favorite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">
                    {params.cityName}, {weatherQuery.data.sys.country}
                </h1>
                <div>
                    <FavoriteButton
                        data={{ ...weatherQuery.data, name: params.cityName }}
                    />
                </div>
            </div>

            <div className="grid gap-6 ">
                <div className="flex flex-col  gap-4">
                    <CurrentWeather data={weatherQuery.data} />

                    <HourlyTemperature data={forecastQuery.data} />
                    {/* hourly temperature */}
                </div>
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    {/* details */}
                    <WeatherDetails data={weatherQuery.data} />
                    {/* forecast */}
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    );
}
