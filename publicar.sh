#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "=== Cambios del sitio ==="
git status --short

echo "=== Verificando GitHub ==="
git fetch origin main

if ! git merge-base --is-ancestor origin/main HEAD; then
    echo "Hay cambios nuevos en GitHub. Revisa antes de publicar."
    exit 1
fi

echo "=== Preparando archivos ==="
git add -A

if ! git diff --cached --quiet; then
    git commit -m "Actualizar sitio: $(date '+%Y-%m-%d %H:%M')"
fi

echo "=== Publicando ==="
git push origin main

echo "Sitio actualizado correctamente."
