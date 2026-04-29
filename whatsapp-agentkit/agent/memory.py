import json
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Integer, select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase, sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./agentkit.db")

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class Conversacion(Base):
    __tablename__ = "conversaciones"
    id = Column(Integer, primary_key=True, autoincrement=True)
    sesion_id = Column(String(100), index=True)
    rol = Column(String(20))
    contenido = Column(Text)
    creado_en = Column(DateTime, default=datetime.utcnow)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def guardar_mensaje(sesion_id: str, rol: str, contenido: str):
    async with AsyncSessionLocal() as session:
        msg = Conversacion(sesion_id=sesion_id, rol=rol, contenido=contenido)
        session.add(msg)
        await session.commit()


async def obtener_historial(sesion_id: str, limite: int = 20) -> list[dict]:
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Conversacion)
            .where(Conversacion.sesion_id == sesion_id)
            .order_by(Conversacion.creado_en.desc())
            .limit(limite)
        )
        filas = result.scalars().all()
        return [{"role": f.rol, "content": f.contenido} for f in reversed(filas)]
