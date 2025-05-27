#!/bin/bash

echo "Updating environment variables for Codespaces..."

if [ -f ".env.local" ]; then
    CODESPACES_URL="https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    
    sed -i "s|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=${CODESPACES_URL}|" .env.local
    sed -i "s|NEXT_PUBLIC_ROOT_DOMAIN=.*|NEXT_PUBLIC_ROOT_DOMAIN=${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}|" .env.local
    
    echo "✅ Environment variables updated for Codespaces"
    echo "🌐 Your app will be available at: ${CODESPACES_URL}"
else
    echo "⚠️  .env.local not found. Please create it from .env.example first."
fi
