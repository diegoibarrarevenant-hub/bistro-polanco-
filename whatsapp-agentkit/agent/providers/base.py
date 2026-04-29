from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class MensajeEntrante:
    telefono: str
    texto: str
    mensaje_id: str = ""


class ProveedorWhatsApp(ABC):
    @abstractmethod
    def parsear_webhook(self, payload: dict) -> MensajeEntrante | None:
        pass

    @abstractmethod
    async def enviar_mensaje(self, telefono: str, texto: str) -> None:
        pass
