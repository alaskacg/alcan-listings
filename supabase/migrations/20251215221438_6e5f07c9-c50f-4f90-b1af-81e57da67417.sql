-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create listings table
CREATE TABLE public.listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    region TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    images TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending',
    payment_status TEXT NOT NULL DEFAULT 'unpaid',
    stripe_payment_id TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Create site_settings table for admin configuration
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type TEXT NOT NULL DEFAULT 'text',
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create payments table for tracking
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    stripe_payment_intent_id TEXT,
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- user_roles: only admins can view/manage
CREATE POLICY "Admins can view all roles" ON public.user_roles
    FOR SELECT TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- profiles: users can view/edit own, admins can view all
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- listings: public read for active, users manage own, admins manage all
CREATE POLICY "Anyone can view active listings" ON public.listings
    FOR SELECT
    USING (status = 'active' AND payment_status = 'paid');

CREATE POLICY "Users can view own listings" ON public.listings
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create listings" ON public.listings
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings" ON public.listings
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all listings" ON public.listings
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- site_settings: public read, admin write
CREATE POLICY "Anyone can read settings" ON public.site_settings
    FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage settings" ON public.site_settings
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- payments: users view own, admins view all
CREATE POLICY "Users can view own payments" ON public.payments
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments" ON public.payments
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
('stripe_publishable_key', '', 'secret', 'Stripe publishable API key'),
('stripe_secret_key', '', 'secret', 'Stripe secret API key'),
('listing_price', '10.00', 'number', 'Price per listing in USD'),
('listing_duration_days', '60', 'number', 'Number of days a listing stays active'),
('site_name', 'Alaska Listings', 'text', 'Main site name'),
('contact_email', 'support@aklistings.com', 'text', 'Support email address'),
('enable_payments', 'false', 'boolean', 'Enable/disable payment processing');