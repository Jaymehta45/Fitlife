-- FitLife schema
-- Run this in Supabase SQL editor (SQL > New query)

-- 1) programs: master list of offerings
create table if not exists public.programs (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  short_description text,
  long_description text,
  price_cents integer not null default 0,   -- price stored as cents
  duration_weeks integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- sample programs
insert into public.programs (slug, title, short_description, long_description, price_cents, duration_weeks)
values
('strength-training', 'Strength Training', 'Build muscle and power with science-backed routines.', 'Full program details for Strength Training...', 19900, 12),
('cardio-fitness', 'Cardio Fitness', 'Boost endurance and burn calories with dynamic cardio.', 'Full program details for Cardio Fitness...', 14900, 8),
('weight-loss', 'Weight Loss', 'Personalized plans to help you lose fat and keep it off.', 'Full program details for Weight Loss...', 17900, 10)
on conflict (slug) do nothing;

-- 2) users: minimal mapping table for Clerk -> Supabase users
create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  clerk_user_id text unique,             -- store Clerk user id for mapping
  email text,
  phone text,
  display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_users_clerk_user_id on public.users(clerk_user_id);

-- 3) orders: checkout orders (cart -> checkout)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete set null,
  clerk_user_id text,                      -- redundant but helpful
  status text default 'pending',           -- pending, paid, cancelled
  total_cents integer not null default 0,
  currency text default 'INR',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_orders_user_id on public.orders(user_id);

-- 4) order_items: items in each order (or cart entries)
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  program_id uuid references public.programs(id) on delete restrict,
  quantity integer default 1,
  unit_price_cents integer not null default 0,
  created_at timestamptz default now()
);

create index if not exists idx_order_items_order_id on public.order_items(order_id);

-- 5) payments: store payment metadata and verification
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  provider text,                 -- e.g., 'razorpay'
  provider_payment_id text,      -- id returned by provider
  amount_cents integer,
  currency text default 'INR',
  status text,                   -- created, captured, failed, refunded
  raw_response jsonb,            -- store full provider webhook payload if needed
  created_at timestamptz default now()
);

create index if not exists idx_payments_order_id on public.payments(order_id);

-- 6) trigger to auto-update "updated_at"
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_programs_updated_at
  before update on public.programs
  for each row execute function public.set_updated_at();

create trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

create trigger trg_orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- End of script

-- Notes about SQL:
-- • price_cents integer stores money in cents to avoid floating point errors.
-- • You can extend users with more fields later (address, metadata).
-- • If you want row-level security (RLS) later, add policies after verifying access patterns.

