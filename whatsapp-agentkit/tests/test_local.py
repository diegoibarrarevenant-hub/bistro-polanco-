"""Simulador de chat en terminal — prueba el agente sin WhatsApp."""
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from dotenv import load_dotenv
load_dotenv()

from agent.memory import init_db, guardar_mensaje, obtener_historial
from agent.brain import generar_respuesta

SESSION = "test-local-001"


async def main():
    await init_db()
    print("\n" + "="*55)
    print("  Bistro Polanco — Simulador de chat (terminal)")
    print("="*55)
    print("Escribe tus mensajes como si fueras un cliente.")
    print("Escribe 'salir' para terminar.\n")

    while True:
        try:
            user_input = input("Tú: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nHasta luego!")
            break

        if user_input.lower() in ("salir", "exit", "quit"):
            print("Hasta luego!")
            break

        if not user_input:
            continue

        historial = await obtener_historial(SESSION)
        await guardar_mensaje(SESSION, "user", user_input)
        print("Sofía: ", end="", flush=True)
        respuesta = await generar_respuesta(historial, user_input)
        await guardar_mensaje(SESSION, "assistant", respuesta)
        print(respuesta)
        print()


if __name__ == "__main__":
    asyncio.run(main())
