import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { eventService } from '@/api/services/event.service';
import { CreateAndEditEventDto, EditEventDto, Event } from '@/types/event';
import { handleError, handleSuccess } from '@/utils/hadleResponse';

interface UseEventMutationsReturn {
    createEvent: UseMutationResult<Event, unknown, CreateAndEditEventDto, unknown>;
    deleteEvent: UseMutationResult<void, unknown, number, unknown>;
    updateEvent: UseMutationResult<void, unknown, { id: number; eventData: EditEventDto }, unknown>;
}

export const useEventMutations = (
    queryClient: ReturnType<typeof useQueryClient>,
    setAlert: (alert: { message: string; severity: 'success' | 'error' } | null) => void
): UseEventMutationsReturn => {
    const handleMutationSuccess = (message: string) => {
        queryClient.invalidateQueries({ queryKey: ['events'] });
        handleSuccess({ setAlert, successMessage: message });
    };

    const handleMutationError = (message: string) => {
        handleError({ setAlert, errorMessage: message });
    };

    const createEvent = useMutation<Event, unknown, CreateAndEditEventDto>({
        mutationFn: (data) => eventService.createEvent(data),
        onSuccess: () => handleMutationSuccess('Event created successfully!'),
        onError: () => handleMutationError('Failed to create event.')
    });

    const deleteEvent = useMutation<void, unknown, number>({
        mutationFn: (id) => eventService.deleteEvent(id),
        onSuccess: () => handleMutationSuccess('Event deleted successfully!'),
        onError: () => handleMutationError('Failed to delete event.')
    });

    const updateEvent = useMutation<void, unknown, { id: number; eventData: EditEventDto }>({
        mutationFn: ({ id, eventData }) => eventService.updateEvent(id, eventData),
        onSuccess: () => handleMutationSuccess('Event updated successfully!'),
        onError: () => handleMutationError('Failed to update event.')
    });

    return { createEvent, deleteEvent, updateEvent };
};