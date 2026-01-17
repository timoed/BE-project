import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // If we had a router we'd use Link, but here we might just conditional render in App, or we can add a toggle here if we are swapping components.
    // Actually, for this implementation, let's assume App.jsx handles the conditional rendering between "App Content" and "Auth".
    // But Login and Signup usually need to switch between each other.
    // Let's rely on the parent or a simple prop if needed, OR just export Signup separately and let App decide.
    // For now this is just the Login component.

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError("Failed to log in. Check your credentials.");
        }

        setLoading(false);
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Proxy Master</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-3">
                        <Form.Label className="fw-bold">Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password" className="mb-3">
                        <Form.Label className="fw-bold">Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">
                        Log In
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
