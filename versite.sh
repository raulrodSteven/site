#!/bin/bash
echo "🌐 Iniciando servidor local..."
echo "👉 Abre en tu navegador: http://localhost:8000"
echo "❌ Presiona Ctrl + C para detenerlo."
xdg-open http://localhost:8000  # Esto intenta abrir el navegador solo
python3 -m http.server
