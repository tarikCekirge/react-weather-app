
import { Button } from './ui/button'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { useState } from 'react';


const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("")
    return (
        <>
            <Button onClick={() => setOpen(true)}>Search Cities...</Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

        </>
    )
}

export default CitySearch