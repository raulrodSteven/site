#!/bin/bash
echo "========================================"
echo "   🚀 ACTUALIZANDO SITIO WEB...         "
echo "========================================"

# 1. Agregar todos los cambios
git add .

# 2. Guardar con fecha
git commit -m "UpdateCO_Pl: $(date)"

# 3. Subir a GitHub
git push

echo "========================================"
echo "   ✅ ¡LISTO! Cambios subidos.          "
echo "========================================"
