from agent.providers.base import ProveedorWhatsApp
from agent.providers.whapi import WhapiProveedor


def obtener_proveedor() -> ProveedorWhatsApp:
    import os
    proveedor = os.getenv("WHATSAPP_PROVIDER", "whapi").lower()
    if proveedor == "whapi":
        return WhapiProveedor()
    raise ValueError(f"Proveedor no soportado: {proveedor}")
