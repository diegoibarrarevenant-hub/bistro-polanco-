from datetime import datetime


def obtener_fecha_hora_actual() -> str:
    ahora = datetime.now()
    dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    dia = dias[ahora.weekday()]
    return ahora.strftime(f"{dia} %d/%m/%Y, %I:%M %p")


TOOLS = [
    {
        "name": "obtener_fecha_hora",
        "description": "Obtiene la fecha y hora actual para verificar disponibilidad o confirmar reservaciones.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    }
]


def ejecutar_tool(nombre: str, inputs: dict) -> str:
    if nombre == "obtener_fecha_hora":
        return obtener_fecha_hora_actual()
    return "Herramienta no encontrada."
