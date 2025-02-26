import React, { useState } from 'react'
import { Button } from './ui/button'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from 'cmdk'
import { Calendar, Smile, Calculator, User, CreditCard, Settings } from 'lucide-react';
import { CommandShortcut } from './ui/command';

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