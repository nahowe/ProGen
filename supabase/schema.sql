-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tenants table
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subdomain TEXT UNIQUE NOT NULL,
  custom_domain TEXT UNIQUE,
  business_name TEXT NOT NULL,
  industry_template_id TEXT NOT NULL,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'preview',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Industry templates table
CREATE TABLE industry_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  default_components JSONB NOT NULL,
  default_theme JSONB NOT NULL,
  seo_defaults JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Components table
CREATE TABLE components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content JSONB NOT NULL,
  settings JSONB DEFAULT '{}',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  components UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tenant_id, slug)
);

-- Preview sites table
CREATE TABLE preview_sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  preview_token TEXT UNIQUE NOT NULL,
  business_data JSONB NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  converted_to_tenant_id UUID REFERENCES tenants(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX idx_tenants_custom_domain ON tenants(custom_domain);
CREATE INDEX idx_components_tenant_id ON components(tenant_id);
CREATE INDEX idx_pages_tenant_id ON pages(tenant_id);

-- Enable Row Level Security
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE preview_sites ENABLE ROW LEVEL SECURITY;
