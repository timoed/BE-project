import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

// This component should show the list of bookings.
// Must work with App.jsx to tell it what to show and what functions to run
const BookingTable = ({ bookings, onEdit, onDelete }) => {
    return (
        <Card className="shadow-sm mb-4">
            <Card.Header as="h5" className="bg-primary text-white">
                Active Bookings
            </Card.Header>
            <Card.Body>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>User ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* check data here */}
                        {bookings && bookings.length > 0 ? (
                            // show data
                            bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.title}</td>
                                    <td>{booking.description}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.time}</td>
                                    <td>{booking.phone_number}</td>
                                    <td>{booking.email}</td>
                                    <td>{booking.user_id}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            {/* for eddit button */}
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => onEdit(booking)}
                                            >
                                                Edit
                                            </Button>

                                            {/* delete button */}
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => onDelete(booking.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // no data, then show erorr response
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default BookingTable;
