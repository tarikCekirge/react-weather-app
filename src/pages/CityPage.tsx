import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";
import HourlyTemprature from "@/components/hourly-temprature";
import WeatherSkeleton from "@/components/loading-sketlon";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/weather-details";
import WeatherForeCast from "@/components/weather-forecast";
import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"

const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");

    const coordinates = { lat, lon }

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    const handleRefresh = () => { }


    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant={'destructive'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    <p>Failed to fetch weather dada. PLease try again.</p>
                    <Button onClick={handleRefresh} variant={'outline'} className="w-fit">
                        <RefreshCcw className=" size-4" />
                        retry
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <WeatherSkeleton />
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
                    <FavoriteButton data={{ ...weatherQuery.data, name: params.cityName }} />
                </div>

                <div className="grid gap-6">
                    <div className="flex flex-col  gap-4">
                        <CurrentWeather data={weatherQuery.data} />
                        <HourlyTemprature data={forecastQuery.data} />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 items-start">
                        <WeatherDetails data={weatherQuery.data} />
                        <WeatherForeCast data={forecastQuery.data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CityPage