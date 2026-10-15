#!/bin/zsh
set -euo pipefail
cd "${0:A:h}"
finish() {
  result=$?
  if [[ -t 0 ]]; then
    echo "Press any key to close."
    read -sk 1
  fi
  return $result
}
trap finish EXIT
npm run check
npm run build
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "No origin remote configured. See SETUP.md to connect this unified wiki repository." >&2
  exit 1
fi
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Review and commit your changes first, then run this launcher to push them." >&2
  exit 1
fi
git push origin HEAD
 echo "Pushed committed Markdown and site code. GitHub Actions will build and deploy the wiki."
