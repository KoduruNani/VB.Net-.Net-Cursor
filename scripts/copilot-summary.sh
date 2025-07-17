#!/bin/bash
DIFF_FILE="pr_diff.txt"
OUTPUT_FILE="pr_summary.txt"
PR_NUMBER=$1

if [ -z "$PR_NUMBER" ]; then
  echo "Error: PR number not provided"
  exit 1
fi

if [ ! -f "$DIFF_FILE" ]; then
  echo "Error: Diff file not found"
  exit 1
fi

echo "Generating summary for PR #$PR_NUMBER..." > "$OUTPUT_FILE"
echo "Changes detected in $(wc -l < $DIFF_FILE) lines of code." >> "$OUTPUT_FILE"
echo "Summary: Modifications to VB.Net and .Net project files." >> "$OUTPUT_FILE"

# Optional: Uncomment for OpenAI API (requires API key)
# export OPENAI_API_KEY="${OPENAI_API_KEY}"
# curl -s -H "Authorization: Bearer $OPENAI_API_KEY" \
#      -H "Content-Type: application/json" \
#      -d "{\"model\": \"gpt-4\", \"messages\": [{\"role\": \"user\", \"content\": \"Summarize this PR diff: $(cat $DIFF_FILE)\"}]}" \
#      https://api.openai.com/v1/chat/completions | jq -r '.choices[0].message.content' >> "$OUTPUT_FILE"

echo "Summary written to $OUTPUT_FILE"