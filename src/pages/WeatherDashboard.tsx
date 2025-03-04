import CurrentWeather from "@/components/current-weather"
import FavoriteCities from "@/components/favorite-cities"
import HourlyTemprature from "@/components/hourly-temprature"
import WeatherSkeleton from "@/components/loading-sketlon"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import WeatherDetails from "@/components/weather-details"
import WeatherForeCast from "@/components/weather-forecast"
import useGeolocation from "@/hooks/use-geolocation"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather"
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react"

const WeatherDashboard = () => {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation()

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);

    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    };

    if (locationLoading) {
        return <WeatherSkeleton />
    }


    if (locationError) {
        return (
            <Alert variant={'destructive'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error!</AlertTitle>
                <AlertDescription>
                    <p>{locationError}</p>
                    <Button onClick={getLocation} variant={'outline'} className="w-fit">
                        <MapPin className=" size-4" />
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!coordinates) {
        return (
            <Alert variant={'destructive'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Requierd!</AlertTitle>
                <AlertDescription>
                    <p>Please enable location access to see your local weather</p>
                    <Button onClick={getLocation} variant={'outline'} className="w-fit">
                        <MapPin className=" size-4" />
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    const locationName = locationQuery.data?.[0];
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

    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton />
    }

    return (
        <div className="space-y-4">
            <FavoriteCities />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button variant={'outline'}
                    size={'icon'}
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCcw className={`size-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
                </Button>
            </div>
            <div className="grid gap-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <CurrentWeather data={weatherQuery.data} locationName={locationName} />
                    <HourlyTemprature data={forecastQuery.data} />
                </div>
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForeCast data={forecastQuery.data} />
                </div>
            </div>

        </div>
    )
}

export default WeatherDashboard