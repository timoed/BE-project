import { useState, useEffect } from 'react'
import { Container, Navbar, Alert, Row, Col } from 'react-bootstrap'
import BookingForm from './BookingForm'
import BookingTable from './BookingTable'
import ReferenceExplorer from './ReferenceExplorer'
import API_URL from './config';

function App() {
  // We need a place to store our bookings list.
  const [bookings, setBookings] = useState([]);

  // We need to know if we are editing something. If this is null, we are creating new stuff.
  const [bookingToEdit, setBookingToEdit] = useState(null);

  // A place to put messages for the user (like "Success!").
  const [message, setMessage] = useState(null);

  // --- ACTIONS ---

  // 1. GET DATA
  // "Go to the server and bring me back the list!"
  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`);
      const data = await response.json();
      setBookings(data); // Put the data in our memory
    } catch (error) {
      console.error('Oops, could not load bookings:', error);
      setMessage({ type: 'danger', text: 'Could not load bookings from the server.' });
    }
  };

  // --- STARTUP ---
  // When the app loads, grab the data right away
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, []);

  // 2. DELETE ITEM
  // "Ask the user if they are sure, then tell server to delete it."
  const handleDelete = async (id) => {
    if (confirm('Really delete this?')) {
      try {
        const response = await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' });

        if (response.ok) {
          fetchBookings(); // Refresh our list!
          setMessage({ type: 'success', text: 'Deleted!' });
        } else {
          setMessage({ type: 'danger', text: 'Could not delete.' });
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  // 3. EDIT ITEM
  // "Load this item into the form so we can change it."
  const handleEdit = (booking) => {
    setBookingToEdit(booking);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Jump to top
  };

  // 4. DONE UPDATING
  // "We finished editing, clear the form and refresh."
  const handleUpdateComplete = () => {
    setBookingToEdit(null); // Stop editing mode
    fetchBookings();        // Get fresh data
    setMessage({ type: 'success', text: 'Updated successfully!' });
  };

  // 5. NEW ITEM ADDED
  // "We made a new one, refresh the list."
  const handleBookingAdded = () => {
    fetchBookings();
    setMessage({ type: 'success', text: 'New booking created!' });
  };

  return (
    <div className="bg-white min-vh-100 d-flex flex-column">
      {/* HEADER */}
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Queue Proxy Booking System</Navbar.Brand>
        </Container>
      </Navbar>

      {/* MAIN CONTENT Area */}
      <Container fluid className="flex-grow-1">

        {/* FEEDBACK MESSAGES */}
        {message && (
          <Alert variant={message.type} onClose={() => setMessage(null)} dismissible className="mb-4">
            {message.text}
          </Alert>
        )}

        <Row className="h-100">
          {/* LEFT SIDE: Form & Table */}
          <Col md={9} className="d-flex flex-column gap-4">

            {/* THE FORM: Where we type stuff */}
            <BookingForm
              key={bookingToEdit ? bookingToEdit.id : 'create'}
              onBookingAdded={handleBookingAdded}
              bookingToEdit={bookingToEdit}
              onUpdateComplete={handleUpdateComplete}
              onCancelEdit={() => setBookingToEdit(null)}
            />

            {/* THE TABLE: Where we see our list */}
            <BookingTable
              bookings={bookings}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>

          {/* RIGHT SIDE: Extra Info */}
          <Col md={3}>
            <ReferenceExplorer />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
