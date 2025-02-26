
import { Loader2, Search } from 'lucide-react';
import { Button } from './ui/button'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { useState } from 'react';
import { useLocationSearch } from '@/hooks/use-weather';
import { useNavigate } from 'react-router-dom';


const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate()


    const { data: locations, isLoading } = useLocationSearch(query);
    const handleSelect = (cityData: string) => {
        console.log(cityData)
        const [lat, lon, name, country] = cityData.split("|");
        navigate("/")
        setOpen(false)

    }
    return (
        <>
            <div className=''></div>
            <Button onClick={() => setOpen(true)} variant={"outline"} className='ml-auto text-sm text-muted-foreground  flex justify-start w-full md:w-32 lg:w-52'>
                <Search className='mr-2 size-4' />Search Cities...
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search Cities" value={query} onValueChange={setQuery} />
                <CommandList>
                    {
                        query.length > 2 && !isLoading && <CommandEmpty >No cities found.</CommandEmpty>
                    }

                    <CommandGroup heading="Favorites">
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>

                    <CommandSeparator />
                    <CommandGroup heading="Recent Searches">
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />

                    {
                        locations && locations.length > 2 && <CommandGroup heading="Suggestions">
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
                    }
                    <CommandSeparator />
                </CommandList>
            </CommandDialog>

        </>
    )
}

export default CitySearch