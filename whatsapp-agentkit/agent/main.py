import os
import yaml
from pathlib import Path
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from contextlib import asynccontextmanager

from agent.memory import init_db, guardar_mensaje, obtener_historial
from agent.brain import generar_respuesta
from agent.providers import obtener_proveedor


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Bistro Polanco — Agente WhatsApp", lifespan=lifespan)

TEMPLATES_DIR = Path(__file__).parent.parent / "templates"


# ── Demo web UI ────────────────────────────────────────────────────────────────

@app.get("/", response_class=HTMLResponse)
async def demo_root():
    html_path = TEMPLATES_DIR / "demo.html"
    return HTMLResponse(content=html_path.read_text(encoding="utf-8"))


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not os.getenv("ANTHROPIC_API_KEY"):
        return ChatResponse(
            reply="⚠️ Falta configurar ANTHROPIC_API_KEY en el archivo .env para activar la IA."
        )
    historial = await obtener_historial(req.session_id)
    await guardar_mensaje(req.session_id, "user", req.message)
    respuesta = await generar_respuesta(historial, req.message)
    await guardar_mensaje(req.session_id, "assistant", respuesta)
    return ChatResponse(reply=respuesta)


@app.get("/greeting")
async def greeting():
    prompts_path = Path(__file__).parent.parent / "config" / "prompts.yaml"
    with open(prompts_path, "r", encoding="utf-8") as f:
        prompts = yaml.safe_load(f)
    return {"greeting": prompts.get("greeting", "¡Hola! ¿En qué te puedo ayudar?")}


# ── WhatsApp webhook ───────────────────────────────────────────────────────────

@app.get("/webhook")
async def webhook_verify(request: Request):
    params = dict(request.query_params)
    verify_token = os.getenv("META_VERIFY_TOKEN", "agentkit-verify")
    if params.get("hub.verify_token") == verify_token:
        return int(params.get("hub.challenge", 0))
    raise HTTPException(status_code=403, detail="Token inválido")


@app.post("/webhook")
async def webhook_recibir(request: Request):
    payload = await request.json()
    proveedor = obtener_proveedor()
    mensaje = proveedor.parsear_webhook(payload)
    if not mensaje:
        return {"status": "ignored"}

    historial = await obtener_historial(mensaje.telefono)
    await guardar_mensaje(mensaje.telefono, "user", mensaje.texto)
    respuesta = await generar_respuesta(historial, mensaje.texto)
    await guardar_mensaje(mensaje.telefono, "assistant", respuesta)
    await proveedor.enviar_mensaje(mensaje.telefono, respuesta)
    return {"status": "ok"}
