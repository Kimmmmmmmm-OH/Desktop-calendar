#!/usr/bin/env bash
# Claude Code statusline: shows cwd | model | context%
python -c "
import json, sys
try:
    data = json.load(sys.stdin)
    model = data.get('model', {}).get('display_name', '?')
    cwd = data.get('workspace', {}).get('current_dir', '?')
    pct = data.get('context_window', {}).get('remaining_percentage', 0)
    parts = cwd.replace('\\\\', '/').rstrip('/').split('/')
    short = '/'.join(parts[-2:]) if len(parts) > 1 else cwd
    pct_int = int(float(pct))
    print(f'{short} | {model} | {pct_int}%')
except Exception:
    print('01 | ? | ?%')
" 2>/dev/null
