import { useState, useEffect } from 'react'
import { Container, Navbar, Alert, Row, Col, Button, Nav } from 'react-bootstrap'
import BookingForm from './BookingForm'
import BookingTable from './BookingTable'
import ReferenceExplorer from './ReferenceExplorer'
import ExternalWidget from './ExternalWidget'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import API_URL from './config';

// Create a wrapper component to use the useAuth hook (since App needs to be inside Provider)
function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [message, setMessage] = useState(null);
  const [showSignup, setShowSignup] = useState(false); // To toggle between Login and Signup when not logged in

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Oops, could not load bookings:', error);
      setMessage({ type: 'danger', text: 'Could not load bookings from the server.' });
    }
  };

  useEffect(() => {
    if (currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchBookings();
    }
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (confirm('Really delete this?')) {
      try {
        const response = await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' });

        if (response.ok) {
          fetchBookings();
          setMessage({ type: 'success', text: 'Deleted!' });
        } else {
          setMessage({ type: 'danger', text: 'Could not delete.' });
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleEdit = (booking) => {
    setBookingToEdit(booking);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateComplete = () => {
    setBookingToEdit(null);
    fetchBookings();
    setMessage({ type: 'success', text: 'Updated successfully!' });
  };

  const handleBookingAdded = () => {
    fetchBookings();
    setMessage({ type: 'success', text: 'New booking created!' });
  };

  async function handleLogout() {
    try {
      await logout();
    } catch {
      console.error("Failed to log out");
    }
  }

  // --- RENDERING ---

  // If not logged in, show Auth screens
  if (!currentUser) {
    return (
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {showSignup ? <Signup /> : <Login />}
          <div className="w-100 text-center mt-2">
            {showSignup ? (
              <>Already have an account? <Button variant="link" onClick={() => setShowSignup(false)}>Log In</Button></>
            ) : (
              <>Need an account? <Button variant="link" onClick={() => setShowSignup(true)}>Sign Up</Button></>
            )}
          </div>
        </div>
      </Container>
    );
  }

  // If logged in, show Dashboard
  return (
    <div className="bg-white min-vh-100 d-flex flex-column">
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Queue Proxy Booking System</Navbar.Brand>
          <Nav className="ms-auto">
            <Navbar.Text className="me-3">
              Signed in as: <a href="#login">{currentUser.email}</a>
            </Navbar.Text>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>Log Out</Button>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="flex-grow-1">
        {message && (
          <Alert variant={message.type} onClose={() => setMessage(null)} dismissible className="mb-4">
            {message.text}
          </Alert>
        )}

        <Row className="h-100">
          <Col md={9} className="d-flex flex-column gap-4">
            <BookingForm
              key={bookingToEdit ? bookingToEdit.id : 'create'}
              onBookingAdded={handleBookingAdded}
              bookingToEdit={bookingToEdit}
              onUpdateComplete={handleUpdateComplete}
              onCancelEdit={() => setBookingToEdit(null)}
            />
            <BookingTable
              bookings={bookings}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
          <Col md={3} className="d-flex flex-column gap-3">
            <ExternalWidget />
            <ReferenceExplorer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

export default App;
