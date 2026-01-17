import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner, Badge } from 'react-bootstrap';

// Simple external API to fetch Public Holidays for a specific country (e.g., US)
// API: https://date.nager.at/Api
const ExternalWidget = () => {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const year = new Date().getFullYear();
                // Using 'US' for United States, can be changed.
                const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`);
                if (!response.ok) throw new Error('Failed to fetch holidays');

                const data = await response.json();

                // Get upcoming holidays (filtering past ones for better relevance)
                const today = new Date();
                const upcoming = data.filter(h => new Date(h.date) >= today).slice(0, 5);
                setHolidays(upcoming);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHolidays();
    }, []);

    return (
        <Card className="shadow-sm h-100">
            <Card.Header as="h6" className="bg-info text-white">
                Upcoming Holidays (US)
            </Card.Header>
            <Card.Body className="p-0">
                {loading && <div className="p-3 text-center"><Spinner animation="border" size="sm" /></div>}
                {error && <div className="p-3 text-danger small">Error: {error}</div>}

                {!loading && !error && (
                    <ListGroup variant="flush">
                        {holidays.length === 0 ? (
                            <ListGroup.Item>No upcoming holidays found.</ListGroup.Item>
                        ) : (
                            holidays.map((h, idx) => (
                                <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center small">
                                    <span>{h.name}</span>
                                    <Badge bg="light" text="dark">{h.date}</Badge>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
};

export default ExternalWidget;
