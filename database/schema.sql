-- Database schema for TCGPlaytest orders
-- This should be run in your Supabase SQL editor or database

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  total_amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  quantity INTEGER NOT NULL,
  price_per_card DECIMAL(10, 2) NOT NULL,
  shipping_cost_cents INTEGER NOT NULL,
  shipping_country TEXT NOT NULL,
  card_images JSONB DEFAULT '[]'::jsonb, -- Stores ALL image URLs from Supabase Storage (front + back)
  card_images_base64 JSONB DEFAULT '[]'::jsonb, -- Backup: base64 images if storage upload fails
  card_data JSONB DEFAULT '[]'::jsonb, -- Stores card data with front/back URLs and metadata
  front_image_urls JSONB DEFAULT '[]'::jsonb, -- Front image URLs only (for easy admin access)
  back_image_urls JSONB DEFAULT '[]'::jsonb, -- Back image URLs only (for easy admin access)
  uploaded_xml_filename TEXT,
  uploaded_xml_content TEXT,
  image_storage_path TEXT, -- Path in storage bucket: {orderId}/{timestamp}/{addressHash}
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on stripe_session_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders(stripe_session_id);

-- Create index on customer_email for customer order history
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create webhook_events table for idempotency tracking
CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY, -- Stripe event ID
  type TEXT NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on processed_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_webhook_events_processed_at ON webhook_events(processed_at DESC);

-- Create image_rate_limits table for shared hourly upload quotas
CREATE TABLE IF NOT EXISTS image_rate_limits (
  client_key TEXT PRIMARY KEY,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  image_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_image_rate_limits_window_start ON image_rate_limits(window_start DESC);

CREATE OR REPLACE FUNCTION consume_image_quota(
  p_client_key TEXT,
  p_requested_images INTEGER,
  p_max_images INTEGER DEFAULT 10000,
  p_window_seconds INTEGER DEFAULT 3600
)
RETURNS TABLE (
  allowed BOOLEAN,
  remaining_images INTEGER,
  retry_after_seconds INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_now TIMESTAMP WITH TIME ZONE := NOW();
  v_window_start TIMESTAMP WITH TIME ZONE := v_now - make_interval(secs => p_window_seconds);
  v_record image_rate_limits%ROWTYPE;
  v_next_count INTEGER;
BEGIN
  IF p_requested_images <= 0 THEN
    RETURN QUERY SELECT TRUE, p_max_images, p_window_seconds;
    RETURN;
  END IF;

  INSERT INTO image_rate_limits (client_key, window_start, image_count, updated_at)
  VALUES (p_client_key, v_now, 0, v_now)
  ON CONFLICT (client_key) DO NOTHING;

  SELECT *
  INTO v_record
  FROM image_rate_limits
  WHERE client_key = p_client_key
  FOR UPDATE;

  IF v_record.window_start < v_window_start THEN
    v_record.window_start := v_now;
    v_record.image_count := 0;
  END IF;

  v_next_count := v_record.image_count + p_requested_images;

  IF v_next_count > p_max_images THEN
    RETURN QUERY
    SELECT
      FALSE,
      GREATEST(0, p_max_images - v_record.image_count),
      GREATEST(1, p_window_seconds - FLOOR(EXTRACT(EPOCH FROM (v_now - v_record.window_start)))::INTEGER);
    RETURN;
  END IF;

  UPDATE image_rate_limits
  SET
    window_start = v_record.window_start,
    image_count = v_next_count,
    updated_at = v_now
  WHERE client_key = p_client_key;

  RETURN QUERY
  SELECT
    TRUE,
    GREATEST(0, p_max_images - v_next_count),
    GREATEST(1, p_window_seconds - FLOOR(EXTRACT(EPOCH FROM (v_now - v_record.window_start)))::INTEGER);
END;
$$;
