
import { Clock, Loader2, Search, XCircleIcon } from 'lucide-react';
import { Button } from './ui/button'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { useState } from 'react';
import { useLocationSearch } from '@/hooks/use-weather';
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/hooks/use-search-history';
import { format } from "date-fns";


const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate()


    const { data: locations, isLoading } = useLocationSearch(query);
    const { history, clearHistory, addToHistory } = useSearchHistory();


    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|");
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });

        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };
    return (
        <>
            <div className=''></div>
            <Button onClick={() => setOpen(true)} variant={"outline"} className='ml-auto text-sm text-muted-foreground overflow-hidden flex justify-start w-full md:w-32 lg:w-52'>
                <Search className='mr-2 size-4' />Search Cities...
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search Cities" value={query} onValueChange={setQuery} />
                <CommandList>
                    {
                        query.length > 2 && !isLoading && <CommandEmpty >No cities found.</CommandEmpty>
                    }

                    {/* <CommandGroup heading="Favorites">
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup> */}


                    {
                        history.length > 0 &&
                        <>
                            <CommandSeparator />
                            <CommandGroup >
                                <div className='flex items-center justify-between'>
                                    <p className='text-xs text-muted-foreground'>Recent Searches</p>
                                    <Button className='flex items-center justify-between px-2 my-2' variant={"ghost"} size={"sm"} onClick={() => clearHistory.mutate()}>
                                        <XCircleIcon className='size-4' />
                                        Clear
                                    </Button>

                                </div>
                                {history.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>{item.name}</span>
                                        {item.state && (
                                            <span className="text-sm text-muted-foreground">
                                                , {item.state}
                                            </span>
                                        )}
                                        <span className="text-sm text-muted-foreground">
                                            , {item.country}
                                        </span>
                                        <span className="ml-auto text-xs text-muted-foreground">
                                            {format(item.searchedAt, "MMM d, h:mm a")}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    }


                    {
                        locations && locations.length > 2 && <>
                            <CommandSeparator />
                            <CommandGroup heading="Suggestions">
                                {
                                    isLoading && (
                                        <div className='flex items-center justify-center p-4'>
                                            <Loader2 className='size-4 animate-spin' />
                                        </div>
                                    )
                                }
                                {
                                    locations.map((location) => {
                                        return <CommandItem
                                            key={`${location.lat}-${location.lon}`}
                                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                            onSelect={handleSelect}
                                            className='cursor-pointer'
                                        >
                                            <Search className="mr-2 h-4 w-4" />
                                            <span>{location.name}</span>
                                            {location.state && (
                                                <span className="text-sm text-muted-foreground">
                                                    , {location.state}
                                                </span>
                                            )}
                                            <span className="text-sm text-muted-foreground">
                                                , {location.country}
                                            </span>
                                        </CommandItem>
                                    })
                                }
                            </CommandGroup>
                        </>
                    }
                    <CommandSeparator />
                </CommandList>
            </CommandDialog>

        </>
    )
}

export default CitySearch