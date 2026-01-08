import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Tabs, Tab } from 'react-bootstrap';
import API_URL from './config';
//currently NOT working; progressing as capstone so TBC
// This component acts like a "Reference Book" / Yellow Pages to browse 
// It shows extra data (Proxies & Events) that might be useful when making a booking.
const ReferenceExplorer = () => {
    const [proxies, setProxies] = useState([]); // List of proxies
    const [events, setEvents] = useState([]);   // List of upcoming events

    // useEffect with no dependencies array
    // When this box appears, go fetch the reference data.
    useEffect(() => {
        // Fetch Proxies
        fetch(`${API_URL}/proxies`)
            .then(res => res.json())
            .then(data => setProxies(data))
            .catch(err => console.error("Error fetching proxies:", err));

        // Fetch Events
        fetch(`${API_URL}/events`)
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    return (
        <Card className="shadow-sm h-100">
            <Card.Header as="h6" className="bg-secondary text-white">
                Proxy/Event Explorer
            </Card.Header>
            <Card.Body className="p-2">
                {/* TABS: Let user switch between different lists */}
                <Tabs defaultActiveKey="proxies" className="mb-3 small">

                    {/* TAB 1: PROXIES */}
                    <Tab eventKey="proxies" title="Proxies">
                        <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <Table size="sm" striped bordered hover className="small mb-0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proxies.map(p => (
                                        <tr key={p.id}>
                                            <td><code>{p.id}</code></td>
                                            <td>{p.name}</td>
                                            <td>
                                                <Badge bg={p.status === 'Online' ? 'success' : 'secondary'}>
                                                    {p.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>

                    {/* TAB 2: EVENTS */}
                    <Tab eventKey="events" title="Events">
                        <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <Table size="sm" striped bordered hover className="small mb-0">
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Day</th>
                                        <th>Load</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map(e => (
                                        <tr key={e.id}>
                                            <td>{e.name}</td>
                                            <td>{e.day}</td>
                                            <td>
                                                <Badge bg={e.load === 'Critical' ? 'danger' : 'info'}>
                                                    {e.load}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card>
    );
};

export default ReferenceExplorer;
