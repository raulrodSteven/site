#!/bin/bash
echo "========================================"
echo "   🚀 ACTUALIZANDO TU SITIO WEB...      "
echo "========================================"

# Borrar el archivo viejo si existe (limpieza)
rm -f publications.html

# Agregar cambios
git add .

# Guardar cambios
git commit -m "Actualización: $(date)"

# Subir a GitHub
git push

echo "========================================"
echo "   ✅ ¡LISTO! Cambios subidos.          "
echo "   🌐 Tu web se actualizará en breve.   "
echo "========================================"
