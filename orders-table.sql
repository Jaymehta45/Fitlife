-- orders table for Razorpay payments
-- Paste this into Supabase SQL editor

create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id text,
  program_slug text,
  amount integer not null,               -- amount in paise
  currency text default 'INR',
  razorpay_order_id text,
  razorpay_payment_id text,
  status text default 'pending',
  metadata jsonb,
  created_at timestamptz default now()
);

