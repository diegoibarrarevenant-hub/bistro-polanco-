#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  Bistro Polanco — Demo WhatsApp
#  Arranca el servidor y muestra la URL para abrir en el celular
# ─────────────────────────────────────────────────────────────
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

echo ""
echo -e "${BOLD}════════════════════════════════════════════${RESET}"
echo -e "${BOLD}   🍽️  Bistro Polanco — Demo WhatsApp        ${RESET}"
echo -e "${BOLD}════════════════════════════════════════════${RESET}"
echo ""

# ── Verificar Python ──────────────────────────────────────────
if ! command -v python3 &>/dev/null; then
  echo -e "${RED}✗ Python 3 no encontrado. Instálalo desde python.org${RESET}"
  exit 1
fi

PY_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
echo -e "  Python $PY_VERSION detectado ✓"

# ── Verificar .env y ANTHROPIC_API_KEY ───────────────────────
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo -e "  Archivo .env creado desde .env.example"
fi

if ! grep -q "ANTHROPIC_API_KEY=sk-" .env 2>/dev/null; then
  echo ""
  echo -e "${YELLOW}  ⚠️  Falta tu API Key de Anthropic en el archivo .env${RESET}"
  echo ""
  echo -e "  1. Ve a: ${CYAN}https://platform.anthropic.com/settings/api-keys${RESET}"
  echo -e "  2. Crea una API Key (empieza con ${CYAN}sk-ant-...${RESET})"
  echo -e "  3. Abre el archivo ${CYAN}.env${RESET} y pega tu key:"
  echo -e "     ${CYAN}ANTHROPIC_API_KEY=sk-ant-tukey...${RESET}"
  echo ""
  echo -e "  El demo correrá sin IA hasta que agregues la key."
  echo ""
fi

# ── Instalar dependencias ─────────────────────────────────────
echo -e "  Instalando dependencias..."
python3 -m pip install -r requirements.txt -q

# ── Obtener IP local ──────────────────────────────────────────
LOCAL_IP=$(python3 -c "
import socket
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(('8.8.8.8', 80))
    print(s.getsockname()[0])
    s.close()
except:
    print('localhost')
")

echo ""
echo -e "${BOLD}════════════════════════════════════════════${RESET}"
echo -e "${GREEN}${BOLD}  ✅  Servidor listo!${RESET}"
echo ""
echo -e "  Abre esto en tu ${BOLD}computadora${RESET}:"
echo -e "  ${CYAN}http://localhost:8000${RESET}"
echo ""
echo -e "  Abre esto en tu ${BOLD}celular${RESET} (misma red WiFi):"
echo -e "  ${CYAN}http://${LOCAL_IP}:8000${RESET}"
echo ""
echo -e "  Presiona ${YELLOW}Ctrl+C${RESET} para detener."
echo -e "${BOLD}════════════════════════════════════════════${RESET}"
echo ""

# ── Arrancar servidor ─────────────────────────────────────────
python3 -m dotenv -f .env run -- \
  python3 -m uvicorn agent.main:app --host 0.0.0.0 --port 8000 --reload 2>/dev/null \
|| \
  uvicorn agent.main:app --host 0.0.0.0 --port 8000 --reload
