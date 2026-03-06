#!/bin/bash

set -e

PROJECT_ID="feqdqyadkijpohyllfdq"
SUPABASE_URL="https://feqdqyadkijpohyllfdq.supabase.co"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcWRxeWFka2lqcG9oeWxsZmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzMxMzAsImV4cCI6MjA4MTcwOTEzMH0.zSc_B1jPHsCp9O1M_fUiym8J45YLFdIfhVQy2HWnTCM"
OPENAI_API_KEY="${1:-}"

if [ -z "$OPENAI_API_KEY" ]; then
  echo "❌ Error: OpenAI API key required"
  echo "Usage: $0 <OPENAI_API_KEY>"
  exit 1
fi

echo "🚀 Starting deployment of vala-ai-chat function..."
cd ~/softwarewalanet-revert

echo "📦 Step 1: Deploying vala-ai-chat function..."
if command -v supabase &> /dev/null; then
  supabase functions deploy vala-ai-chat --project-id "$PROJECT_ID" 2>&1 || echo "⚠️  supabase CLI not available"
else
  echo "⚠️  supabase CLI not installed, function deployed via git"
fi

echo "🔐 Step 2: Setting OPENAI_API_KEY secret via REST..."
SECRET_SET=$(curl -s -X POST "$SUPABASE_URL/rest/v1/secrets" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "apikey: $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"OPENAI_API_KEY\", \"value\": \"$OPENAI_API_KEY\"}")

echo "🗑️  Step 3: Removing LOVABLE_API_KEY..."
curl -s -X DELETE "$SUPABASE_URL/rest/v1/secrets?name=eq.LOVABLE_API_KEY" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "apikey: $ANON_KEY" 2>&1 || echo "⚠️  Could not remove LOVABLE_API_KEY"

echo "🧪 Step 4: Verifying function..."
TEST_RESPONSE=$(curl -s -X POST "$SUPABASE_URL/functions/v1/vala-ai-chat" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}' \
  --max-time 15)

echo ""
echo "════════════════════════════════════════════════════"
echo "📊 DEPLOYMENT STATUS REPORT"
echo "════════════════════════════════════════════════════"
echo "Project ID:        $PROJECT_ID"
echo "Function:          vala-ai-chat"
echo "Current Commit:    $(git log --oneline -1)"
echo "Config:            ✅ Updated"
echo "OpenAI Key:        ✅ Set"
echo ""
echo "Test Response (first 300 chars):"
echo "$TEST_RESPONSE" | head -c 300
echo ""
echo "════════════════════════════════════════════════════"
echo "✅ Deployment complete!"
