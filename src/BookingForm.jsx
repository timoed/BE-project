import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import API_URL from './config';

const BookingForm = ({ onBookingAdded, bookingToEdit, onUpdateComplete, onCancelEdit }) => {
    // --- form data ---
    // This state keeps track of what the user types and adds
    // Parent component resets us with a key when bookingToEdit changes
    const [formData, setFormData] = useState(bookingToEdit || {
        title: '',
        description: '',
        date: '',
        time: '',
        phone_number: '',
        email: '',
        user_id: ''
    });

    // --- typing handle ---
    // update the one field that changed
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // --- submit button ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Don't refresh the page automatically

        try {
            if (bookingToEdit) {
                // update existing..
                const response = await fetch(`${API_URL}/bookings/${bookingToEdit.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    onUpdateComplete();
                }
            } else {
                // create new
                const response = await fetch(`${API_URL}/bookings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    // Clear form manually
                    setFormData({
                        title: '', description: '', date: '', time: '',
                        phone_number: '', email: '', user_id: ''
                    });
                    onBookingAdded();
                }
            }
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5" className="bg-primary text-white">
                {bookingToEdit ? "Edit Booking" : "Create New Booking"}
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Line Up Service"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Description :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Details..."
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    placeholder="DD-MM-YYYY"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Time :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    placeholder="HH:MM"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* ROW 3: Contact */}
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone No. :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email :</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>User ID :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_id"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* BUTTONS */}
                    <div className="d-flex justify-content-end gap-2">
                        {bookingToEdit && (
                            <Button variant="secondary" onClick={onCancelEdit}>
                                Cancel
                            </Button>
                        )}
                        <Button variant="primary" type="submit">
                            {bookingToEdit ? "Update Booking" : "Create Booking"}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default BookingForm;
