import { CreateAndEditEventDto, EditEventDto, Event } from "@/types/event";
import dayjs from "dayjs";

export const checkIfFormComplete = (formData: CreateAndEditEventDto): boolean => {
    return Object.values(formData).every((value) => value.trim() !== "");
};

export const checkIfFormChanged = (formData: CreateAndEditEventDto, eventData: Event | null): boolean => {
    if (!eventData) {
        return false;
    }

    return (
        formData.title !== eventData.title ||
        formData.description !== eventData.description ||
        formData.location !== eventData.location ||
        formData.category !== eventData.category ||
        dayjs(formData.date).format("YYYY-MM-DD") !== dayjs(eventData.date).format("YYYY-MM-DD")
    );
};

export const getChangedFields = (
    formData: CreateAndEditEventDto,
    eventData: Event
  ): EditEventDto => {
    const changedFields: EditEventDto = {};
  
    if (formData.title !== eventData.title) changedFields.title = formData.title;
    if (formData.description !== eventData.description) changedFields.description = formData.description;
    if (formData.location !== eventData.location) changedFields.location = formData.location;
    if (formData.category !== eventData.category) changedFields.category = formData.category;
    if (dayjs(formData.date).format('YYYY-MM-DD') !== dayjs(eventData.date).format('YYYY-MM-DD')) {
      changedFields.date = new Date(formData.date).toISOString();
    }
  
    return changedFields;
  };