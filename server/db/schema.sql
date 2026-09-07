-- ==============================================================================
-- AlgoVault Commercial Platform Database Schema (PostgreSQL 14+)
-- Tables: users, sessions, orders, payments, licenses, devices, releases, activity_logs
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user', -- 'user' | 'admin' | 'support'
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. User Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

-- 3. Commercial Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_number VARCHAR(64) UNIQUE NOT NULL,
    plan_tier VARCHAR(32) NOT NULL, -- 'pro_lifetime' | 'pro_annual' | 'team_license'
    currency VARCHAR(10) NOT NULL DEFAULT 'INR', -- 'INR' | 'USD'
    amount_total INTEGER NOT NULL, -- In smallest currency unit (e.g. 149900 paise = ₹1,499)
    gateway VARCHAR(32) NOT NULL DEFAULT 'razorpay',
    gateway_order_id VARCHAR(128) UNIQUE,
    status VARCHAR(32) NOT NULL DEFAULT 'pending', -- 'pending' | 'completed' | 'failed' | 'refunded'
    billing_email VARCHAR(255) NOT NULL,
    billing_name VARCHAR(120),
    invoice_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_gateway_order_id ON orders(gateway_order_id);

-- 4. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gateway_payment_id VARCHAR(128) UNIQUE NOT NULL,
    gateway_signature VARCHAR(255),
    amount INTEGER NOT NULL,
    currency VARCHAR(10) NOT NULL,
    payment_method VARCHAR(64), -- 'upi' | 'card' | 'netbanking' | 'wallet'
    status VARCHAR(32) NOT NULL, -- 'captured' | 'failed' | 'refunded'
    webhook_event_id VARCHAR(128),
    raw_response JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_gateway_payment ON payments(gateway_payment_id);

-- 5. Licenses Table
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    license_key VARCHAR(64) UNIQUE NOT NULL, -- Format: ALGO-PRO-XXXX-XXXX-XXXX
    plan_type VARCHAR(32) NOT NULL DEFAULT 'pro_lifetime',
    max_devices INTEGER NOT NULL DEFAULT 3,
    status VARCHAR(32) NOT NULL DEFAULT 'active', -- 'active' | 'suspended' | 'revoked' | 'expired'
    offline_signing_nonce VARCHAR(64) NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE, -- NULL for lifetime
    last_verified_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_licenses_user ON licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key);

-- 6. Activated Devices Table (Strict machine limit enforcement)
CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_id UUID NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
    hardware_fingerprint VARCHAR(128) NOT NULL, -- SHA-256 of motherboard UUID + CPU ID
    device_name VARCHAR(120) NOT NULL, -- e.g. "Rohit's MacBook Pro M3"
    platform VARCHAR(32) NOT NULL, -- 'darwin-arm64' | 'darwin-x64' | 'win32-x64' | 'linux-x64'
    os_version VARCHAR(64) NOT NULL, -- e.g. "macOS 15.1 Sequoia"
    app_version VARCHAR(32) NOT NULL, -- e.g. "1.4.2"
    ip_address VARCHAR(45),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    activated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deactivated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_license_hardware UNIQUE (license_id, hardware_fingerprint)
);

CREATE INDEX IF NOT EXISTS idx_devices_license ON devices(license_id);
CREATE INDEX IF NOT EXISTS idx_devices_fingerprint ON devices(hardware_fingerprint);

-- 7. App Releases & Installers Table
CREATE TABLE IF NOT EXISTS releases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version VARCHAR(32) UNIQUE NOT NULL, -- e.g. "1.4.2"
    release_name VARCHAR(120) NOT NULL,
    release_notes TEXT NOT NULL,
    is_mandatory BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    mac_arm64_url TEXT NOT NULL,
    mac_arm64_sha256 VARCHAR(64) NOT NULL,
    mac_x64_url TEXT NOT NULL,
    mac_x64_sha256 VARCHAR(64) NOT NULL,
    win_x64_url TEXT NOT NULL,
    win_x64_sha256 VARCHAR(64) NOT NULL,
    linux_x64_url TEXT,
    linux_x64_sha256 VARCHAR(64),
    download_count INTEGER NOT NULL DEFAULT 0,
    released_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_releases_version ON releases(version);

-- 8. Activity Logs & Telemetry Events Table
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(64) NOT NULL, -- 'signup' | 'order_created' | 'device_activated' | 'license_revoked'
    details JSONB DEFAULT '{}',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_activity_event ON activity_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_logs(created_at);
