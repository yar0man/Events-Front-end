import React from 'react';
import { Card, CardContent, IconButton, Typography, Box } from '@mui/material';
import { Images } from '@/assets';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { Event } from '@/types/event';

interface EventCardProps {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    category: string;
    isRecommedationCard?: boolean;
    onEdit?: (eventData: Event) => void;
    onDelete?: (eventData: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({
    id,
    title,
    date,
    location,
    description,
    category,
    isRecommedationCard,
    onEdit,
    onDelete
}) => {
    const eventData = { id, title, date, location, description, category, isRecommedationCard };
    const { push } = useRouter()

    const handleViewEvent = (id: number) => {
        push(`event/${id}`)
    }
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    return (
        <Card
            sx={{
                position: 'relative',
                margin: 2,
                maxWidth: 380,
                height: 240,
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 1,
                    right: 1,
                    display: 'flex',
                }}
            >
                {!isRecommedationCard && (
                    <IconButton
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={() => onEdit && onEdit(eventData)}
                    >
                        <img src={Images.icEdit.src} width="20" height="20" />
                    </IconButton>
                )}
                {
                    !isRecommedationCard && (
                        <IconButton
                            sx={{
                                color: 'error.main',
                            }}
                            onClick={() => onDelete && onDelete(eventData)}
                        >
                            <img src={Images.icDelete.src} width="20" height="20" />
                        </IconButton>
                    )
                }

            </Box>
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    onClick={() => !isRecommedationCard && handleViewEvent(id)}
                    sx={{
                        cursor: 'pointer',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginTop: 2,
                        marginBottom: 2,
                    }}
                >
                    {title}
                </Typography>
                <Typography color="text.secondary">Date: {formattedDate}</Typography>
                <Typography color="text.secondary">Location: {location}</Typography>
                <Typography color="text.secondary">Category: {category}</Typography>
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        marginTop: 2,
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default EventCard;