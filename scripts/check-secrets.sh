#!/bin/bash

echo "🔍 Checking for potential secrets in code..."

patterns=(
    "sk_test_"
    "sk_live_"
    "pk_test_"
    "pk_live_"
    "whsec_"
    "eyJhbGciOiJ"
    "AIza"
    "sk-[a-zA-Z0-9]"  # Changed to require alphanumeric after sk-
)

found_issues=0

for pattern in "${patterns[@]}"; do
    # Exclude package-lock.json and other generated files
    if git grep -i "$pattern" -- ':!*.example' ':!*.md' ':!scripts/check-secrets.sh' ':!package-lock.json' ':!yarn.lock' ':!pnpm-lock.yaml' 2>/dev/null; then
        echo "⚠️  Found potential secret pattern: $pattern"
        found_issues=$((found_issues + 1))
    fi
done

if [ $found_issues -gt 0 ]; then
    echo "❌ Found $found_issues potential security issues!"
    exit 1
else
    echo "✅ No obvious secrets found in code."
fi
