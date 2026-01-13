#!/bin/bash

# Add dynamic export to all authenticated client pages

echo "Adding 'export const dynamic = force-dynamic' to authenticated pages..."

# List of files that need the dynamic export
files=(
  "app/products/page.tsx"
  "app/products/create/page.tsx"
  "app/products/edit/[id]/page.tsx"
  "app/checkout/[id]/page.tsx"
  "app/orders/[id]/page.tsx"
  "app/orders/sales/[id]/page.tsx"
  "app/profile/page.tsx"
  "app/settings/company/page.tsx"
  "app/settings/payments/page.tsx"
  "app/messages/page.tsx"
  "app/dashboard/engineer/page.tsx"
  "app/dashboard/client/page.tsx"
  "app/dashboard/engineer/portfolio/page.tsx"
  "app/projects/page.tsx"
  "app/projects/new/page.tsx"
  "app/projects/[id]/proposal/page.tsx"
  "app/admin/page.tsx"
  "app/admin/users/page.tsx"
  "app/admin/reports/page.tsx"
)

for file in "${files[@]}"; do
  filepath="/Users/thelegendofzjui/Documents/GitHub/Precision Project Flow/$file"
  
  if [ -f "$filepath" ]; then
    # Check if already has the export
    if ! grep -q "export const dynamic = 'force-dynamic'" "$filepath"; then
      echo "Processing $file..."
      
      # Add after 'use client' directive if it exists
      if grep -q "'use client'" "$filepath"; then
        # Add blank line and export after 'use client'
        sed -i.bak "/'use client';/a\\
\\
// Force dynamic rendering\\
export const dynamic = 'force-dynamic';
" "$filepath"
        rm "${filepath}.bak" 2>/dev/null
      else
        # Add at the top after imports
        sed -i.bak "1a\\
\\
// Force dynamic rendering\\
export const dynamic = 'force-dynamic';
" "$filepath"
        rm "${filepath}.bak" 2>/dev/null
      fi
      
      echo "✅ Added to $file"
    else
      echo "⏭️  Skipped $file (already has export)"
    fi
  else
    echo "⚠️  File not found: $file"
  fi
done

echo ""
echo "✨ Done! All authenticated pages now have dynamic rendering enabled."
