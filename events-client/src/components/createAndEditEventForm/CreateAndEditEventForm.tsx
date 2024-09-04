import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import EventCategory from "../eventCategory/EventCategory";
import { CreateAndEditEventDto, EditEventDto, Event } from "@/types/event";
import dayjs from "dayjs";
import { checkIfFormChanged, checkIfFormComplete, getChangedFields } from "@/utils/formUtils";

interface CreateAndEditEventFormProps {
    onCancel: () => void;
    onCreate: (eventData: CreateAndEditEventDto) => void;
    onUpdate: (id: number, eventData: EditEventDto) => void;
    eventData?: Event | null;
}

const CreateAndEditEventForm: React.FC<CreateAndEditEventFormProps> = ({
    onCancel,
    onCreate,
    onUpdate,
    eventData
}) => {
    const [formData, setFormData] = useState<CreateAndEditEventDto>({
        title: eventData?.title || '',
        description: eventData?.description || '',
        date: eventData?.date || '',
        location: eventData?.location || '',
        category: eventData?.category || ''
    });
    const [selectedCategory, setSelectedCategory] = useState<string>(eventData?.category || "");
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        setIsButtonDisabled(eventData ? !checkIfFormChanged(formData, eventData) : !checkIfFormComplete(formData));
    }, [formData, eventData]);

    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
        setFormData({ ...formData, category: newCategory });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (!eventData) {
            const formattedDate = new Date(formData.date).toISOString();
            onCreate({ ...formData, date: formattedDate });
            onCancel();
            return;
        }

        const changedFields = getChangedFields(formData, eventData);

        if (Object.keys(changedFields).length > 0) {
            if (eventData.id) {
                onUpdate(eventData.id, changedFields);
            }
        }

        onCancel();
    };
    const formattedDate = dayjs(formData.date).format('YYYY-MM-DD');

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
                p: 1,
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                {eventData ? 'Edit Event' : 'Create New Event'}
            </Typography>

            <TextField
                name="title"
                defaultValue={formData.title}
                placeholder="Event name"
                fullWidth
                sx={{ mb: 1 }}
                onChange={handleInputChange}
            />
            <TextField
                name="location"
                defaultValue={formData.location}
                placeholder="Event location"
                fullWidth
                sx={{ mb: 1 }}
                onChange={handleInputChange}
            />
            <TextField
                name="date"
                label="Event date"
                type="date"
                defaultValue={formattedDate}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mb: 1 }}
                onChange={handleInputChange}
            />
            <EventCategory
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            <TextField
                name="description"
                defaultValue={formData.description}
                placeholder="Event description"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 1, mt: 2 }}
                onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                    sx={{
                        color: 'white',
                        borderRadius: 12,
                        "&:hover": { backgroundColor: "#111111" },
                        backgroundColor: "#111111"
                    }}
                >
                    {eventData ? 'Update' : 'Create'}
                </Button>
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    sx={{
                        color: 'black',
                        borderRadius: 12,
                        borderColor: 'black'
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default CreateAndEditEventForm;