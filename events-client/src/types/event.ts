export interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    description: string
}

export interface CreateAndEditEventDto {
    id?: number
    title: string;
    description?: string;
    date: string;
    location: string;
    category: string;
}

export interface EditEventDto {
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    category?: string;
}