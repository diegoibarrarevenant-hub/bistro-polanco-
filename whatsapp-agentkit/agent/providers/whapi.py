import os
import httpx
from agent.providers.base import ProveedorWhatsApp, MensajeEntrante


class WhapiProveedor(ProveedorWhatsApp):
    def __init__(self):
        self.token = os.getenv("WHAPI_TOKEN", "")
        self.api_url = "https://gate.whapi.cloud"

    def parsear_webhook(self, payload: dict) -> MensajeEntrante | None:
        mensajes = payload.get("messages", [])
        if not mensajes:
            return None
        msg = mensajes[0]
        if msg.get("from_me"):
            return None
        texto = msg.get("text", {}).get("body", "")
        if not texto:
            return None
        return MensajeEntrante(
            telefono=msg.get("chat_id", ""),
            texto=texto,
            mensaje_id=msg.get("id", ""),
        )

    async def enviar_mensaje(self, telefono: str, texto: str) -> None:
        if not self.token:
            return
        async with httpx.AsyncClient() as client:
            await client.post(
                f"{self.api_url}/messages/text",
                headers={"Authorization": f"Bearer {self.token}"},
                json={"to": telefono, "body": texto},
                timeout=10,
            )
