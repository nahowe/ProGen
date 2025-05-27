# SAAS Website Builder

A modern multi-tenant website builder with AI-powered content generation, industry-specific templates, and seamless deployment.

## 🚀 Quick Start

### In GitHub Codespaces
1. Open this repository in Codespaces
2. Run the setup script: `./setup-root.sh` (or `bash setup-root.sh`)
3. Update `.env.local` with your API keys
4. Start development: `npm run dev`
5. **Important**: When the server starts:
   - Look for the "Ports" tab at the bottom of VS Code
   - Find port 3000 (or 3001)
   - Click the globe icon to open in browser (this uses the correct Codespaces URL)
   - Or use the forwarded URL shown in the Ports tab

### Local Development
1. Clone the repository
2. Run: `npm install`
3. Copy `.env.example` to `.env.local` and add your keys
4. Run: `npm run dev`

## 🔑 Required API Keys

You'll need:
- **Supabase**: [Get your keys](https://supabase.com)
- **Stripe**: [Get your keys](https://stripe.com)
- **OpenAI**: [Get your API key](https://openai.com)

## 📁 Project Structure

```
├── app/              # Next.js app directory
│   ├── admin/        # Admin panel
│   ├── api/          # API routes
│   ├── [domain]/     # Dynamic tenant routing
│   └── preview/      # Preview sites
├── components/       # React components
├── lib/              # Utilities and clients
├── supabase/         # Database schema
└── public/           # Static assets
```

## 🛠️ Features

- **Multi-tenant Architecture**: Subdomain-based routing
- **AI Content Generation**: OpenAI-powered copywriting
- **Industry Templates**: Pre-built designs for different businesses
- **Preview System**: Instant website previews for clients
- **Stripe Integration**: Subscription billing
- **Admin Dashboard**: Manage all sites from one place

## 🔒 Security

- Environment variables for all secrets
- Pre-commit hooks to check for exposed keys
- Row-level security in Supabase
- Secure webhook handling

## 📚 Documentation

- [Security Checklist](SECURITY_CHECKLIST.md)
- [Codespaces Setup](scripts/codespaces-setup.sh)
- [Environment Variables](.env.example)

## 🚀 Deployment

1. Deploy to Vercel
2. Set environment variables
3. Configure Supabase
4. Set up Stripe webhooks
5. Configure custom domains

## 📝 License

MIT License - feel free to use this for your own projects!
