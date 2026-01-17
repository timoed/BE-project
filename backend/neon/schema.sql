-- Users table (Synced with Firebase)
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY, -- Firebase UID
    email VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'consumer',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table (Matches Frontend BookingForm)
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    date VARCHAR(20), -- Storing as string for simplicity with frontend inputs
    time VARCHAR(20),
    phone_number VARCHAR(50),
    email VARCHAR(255),
    user_id VARCHAR(255), -- Firebase UID
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'MYR',
    status VARCHAR(20) DEFAULT 'pending',
    stripe_payment_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_jobs_created_by ON jobs(created_by);
CREATE INDEX idx_jobs_assigned_proxy ON jobs(assigned_proxy);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_bookings_consumer ON bookings(consumer_id);
CREATE INDEX idx_bookings_proxy ON bookings(proxy_id);
CREATE INDEX idx_bookings_status ON bookings(status);
