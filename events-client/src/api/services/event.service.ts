import { Event, CreateAndEditEventDto, EditEventDto } from '@/types/event'
import apiRequest from '../apiRequest';
import { ENDPOINTS } from '@/constants/constants';

export const eventService = {
    async getEvents() {
        const response = await apiRequest.get<Event[]>(`/${ENDPOINTS.EVENTS}`);
        return response.data;
    },
    async getEvent(id: string) {
        const response = await apiRequest.get<Event>(`/${ENDPOINTS.EVENTS}/${id}`);
        return response.data;
    },
    async getRecommendationsEvents(id: string) {
        const response = await apiRequest.get<Event[]>(`/${ENDPOINTS.EVENTS}/recommendations/${id}`);
        return response.data;
    },
    async createEvent(eventData: CreateAndEditEventDto): Promise<Event> {
        const response = await apiRequest.post<Event>(`/${ENDPOINTS.EVENTS}`, eventData);
        return response.data;
    },
    async deleteEvent(id: number) {
       await apiRequest.delete<Event>(`/${ENDPOINTS.EVENTS}/${id}`);
    },
    async updateEvent(id: number, {...eventData }: EditEventDto)  {
        await apiRequest.put<Event>(`/${ENDPOINTS.EVENTS}/${id}`, eventData)
    }
}
