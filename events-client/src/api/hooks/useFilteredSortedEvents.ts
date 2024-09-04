import { useMemo } from 'react';
import { Event } from '@/types/event';

export const useFilteredSortedEvents = (
    events: Event[],
    selectedCategory: string,
    searchQuery: string,
    sortOption: string
): Event[] => {
    return useMemo(() => {
        const filteredEvents = events.filter(event =>
            (selectedCategory === 'All' || event.category === selectedCategory) &&
            (searchQuery === '' || event.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        return filteredEvents.sort((a, b) => {
            if (sortOption === 'Sooners') {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortOption === 'Latests') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return 0;
        });
    }, [events, selectedCategory, searchQuery, sortOption]);
};