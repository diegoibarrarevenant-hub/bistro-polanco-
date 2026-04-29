import os
import yaml
from pathlib import Path
import anthropic
from agent.tools import TOOLS, ejecutar_tool

_client = None
_system_prompt = None


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        _client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    return _client


def _get_system_prompt() -> str:
    global _system_prompt
    if _system_prompt is not None:
        return _system_prompt

    base = Path(__file__).parent.parent

    prompts_path = base / "config" / "prompts.yaml"
    with open(prompts_path, "r", encoding="utf-8") as f:
        prompts = yaml.safe_load(f)

    system = prompts.get("system_prompt", "")

    knowledge_dir = base / "knowledge"
    archivos = list(knowledge_dir.glob("*"))
    archivos = [a for a in archivos if a.suffix in (".txt", ".md", ".pdf") and a.stat().st_size > 0]

    if archivos:
        system += "\n\n── INFORMACIÓN DEL NEGOCIO ──\n"
        for archivo in archivos:
            try:
                contenido = archivo.read_text(encoding="utf-8")
                system += f"\n[{archivo.name}]\n{contenido}\n"
            except Exception:
                pass

    _system_prompt = system
    return _system_prompt


async def generar_respuesta(historial: list[dict], mensaje_nuevo: str) -> str:
    client = _get_client()
    system = _get_system_prompt()

    mensajes = historial + [{"role": "user", "content": mensaje_nuevo}]

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=system,
        messages=mensajes,
        tools=TOOLS,
    )

    # Manejar tool use si ocurre
    while response.stop_reason == "tool_use":
        tool_uses = [b for b in response.content if b.type == "tool_use"]
        tool_results = []
        for tu in tool_uses:
            resultado = ejecutar_tool(tu.name, tu.input)
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tu.id,
                "content": resultado,
            })

        mensajes = mensajes + [
            {"role": "assistant", "content": response.content},
            {"role": "user", "content": tool_results},
        ]
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            system=system,
            messages=mensajes,
            tools=TOOLS,
        )

    texto = next(
        (b.text for b in response.content if hasattr(b, "text")),
        "Lo siento, no pude procesar tu mensaje. 😊"
    )
    return texto
