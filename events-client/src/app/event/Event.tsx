'use client'
import { eventService } from "@/api/services/event.service";
import BackButton from "@/components/backButton/BackButton";
import EventCard from "@/components/eventCard/EventCard";
import Loader from "@/components/loader/Loader";
import { Event } from "@/types/event";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

const Event: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    const { data: event, isFetching, isLoading } = useQuery({
        queryKey: ["event"],
        queryFn: () => eventService.getEvent(id),
    });

    const { 
        data: recommendationsEvents, 
        isFetching: isEventsFetching, 
        isLoading: isEventsLoading 
    } = useQuery<Event[]>({
        queryKey: ["eventsRecommed"],
        queryFn: () => eventService.getRecommendationsEvents(id),
    });

    if (!event) {
        return (
            <Box>
                <Typography variant="h5">
                    Event not found
                </Typography>
            </Box>
        )
    }

    if (isLoading || isFetching || isEventsFetching || isEventsLoading) {
        return <Loader/>
    }

    const formattedDate = dayjs(event.date).format('YYYY-MM-DD');

    return (
        <>
            <Container sx={{ marginTop: 6 }}>
                <BackButton/>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        maxWidth: 400,
                        margin: '0 auto',
                        padding: 2,
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;',
                        background: 'linear-gradient(90deg, #e0f7fa 25%, #f5f5f5 50%, #e0f7fa 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s infinite',
                        '@keyframes shimmer': {
                            '0%': {
                                backgroundPosition: '-200% 0',
                            },
                            '100%': {
                                backgroundPosition: '200% 0',
                            },
                        },
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {event.title}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                            <DateCalendar defaultValue={dayjs(formattedDate)} disabled />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {event.category}
                    </Typography>
                    <Typography variant="h6">
                        Location: {event.location}
                    </Typography>
                    <Typography>
                        {event.description}
                    </Typography>
                </Box>
            </Container>
            <Box sx={{ marginLeft: 10, marginTop: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginLeft: 2, }}>
                    RECOMMENDATION:
                </Typography>
                <Grid container spacing={2}>
                    {recommendationsEvents && recommendationsEvents.length > 0 ? (
                        <Grid container spacing={2}>
                            {recommendationsEvents.map((event) => (
                                <Grid item xs={12} sm={6} md={4} key={event.id}>
                                    <EventCard
                                        id={event.id}
                                        title={event.title}
                                        date={event.date}
                                        location={event.location}
                                        description={event.description}
                                        category={event.category}
                                        isRecommedationCard={true}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
                            No recommendations available
                        </Typography>
                    )}
                </Grid>
            </Box>
        </>

    )
}

export default Event;