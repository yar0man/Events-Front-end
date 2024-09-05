'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grid, SelectChangeEvent } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CreateAndEditEventForm from '@/components/createAndEditEventForm/CreateAndEditEventForm';
import EventModal from '@/components/modal/EventModal';
import EventCard from '@/components/eventCard/EventCard';
import CreateEventButton from '@/components/createEventButton/CreateEventButton';
import FilterAndSortContainer from '@/components/filterAndSortContainer/FilterAndSortContainer';
import DeleteEvent from '@/components/deleteEvent/DeleteEvent';
import Loader from '@/components/loader/Loader';
import AlertNotification from '@/components/alertNotification/AlertNotification';
import { eventService } from '@/api/services/event.service';
import { CreateAndEditEventDto, EditEventDto, Event } from '@/types/event';
import { useEventMutations } from '@/api/hooks/useEventMutations';
import { useFilteredSortedEvents } from '@/api/hooks/useFilteredSortedEvents';
import { PENDING_STATUS } from '@/constants/constants';

const Home: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortOption, setSortOption] = useState<string>('None');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const queryClient = useQueryClient();

    const { createEvent, deleteEvent, updateEvent } = useEventMutations(queryClient, setAlert);

    const { data, isFetching, isLoading } = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: eventService.getEvents,
    });

    const filteredSortedEvents = useFilteredSortedEvents(events, selectedCategory, searchQuery, sortOption);

    useEffect(() => {
        if (data) setEvents(data);
    }, [data]);

    const handleModalOpen = useCallback(() => setOpenModal(true), []);
    const handleModalClose = useCallback(() => {
        setOpenModal(false);
        setIsEditing(false);
        setCurrentEvent(null);
    }, []);
    const handleDeleteModalClose = useCallback(() => {
        setOpenDeleteModal(false);
        setCurrentEvent(null);
    }, []);

    const handleCreate = (eventData: CreateAndEditEventDto) => createEvent.mutate(eventData);
    const handleUpdate = (id: number, eventData: EditEventDto) => {
        updateEvent.mutate({ id, eventData });
        handleModalClose();
    };
    const handleDelete = () => {
        if (currentEvent) deleteEvent.mutate(currentEvent.id);
        handleDeleteModalClose();
    };

    const isAnyLoading = isLoading
        || isFetching
        || createEvent.status === PENDING_STATUS
        || deleteEvent.status === PENDING_STATUS
        || updateEvent.status === PENDING_STATUS;

    if (isAnyLoading) return <Loader />;

    return (
        <Container sx={{ marginTop: 5 }}>
            {alert && (
                <AlertNotification
                    message={alert.message}
                    severity={alert.severity}
                    onClose={() => setAlert(null)}
                />
            )}
            <CreateEventButton onOpen={handleModalOpen} />
            <FilterAndSortContainer
                selectedCategory={selectedCategory}
                onCategoryChange={(e) => setSelectedCategory(e.target.value)}
                sortOption={sortOption}
                onSortChange={(e) => setSortOption(e.target.value)}
                onClearFilters={() => { setSelectedCategory('All'); setSortOption('None'); setSearchQuery(''); }}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                searchQuery={searchQuery}
            />
            <EventModal open={openModal} onClose={handleModalClose}>
                <CreateAndEditEventForm
                    onCancel={handleModalClose}
                    onUpdate={handleUpdate}
                    onCreate={handleCreate}
                    eventData={isEditing ? currentEvent : null}
                />
            </EventModal>
            <EventModal open={openDeleteModal} onClose={handleDeleteModalClose}>
                <DeleteEvent
                    onCancel={handleDeleteModalClose}
                    onDelete={handleDelete}
                />
            </EventModal>
            <Grid container spacing={2}>
                {filteredSortedEvents.map(event => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <EventCard
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            location={event.location}
                            description={event.description}
                            category={event.category}
                            onEdit={() => { setCurrentEvent(event); setIsEditing(true); handleModalOpen(); }}
                            onDelete={() => { setCurrentEvent(event); setOpenDeleteModal(true); }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;