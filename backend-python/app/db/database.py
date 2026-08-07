from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


# ======================================================
# Clase Base para todos los modelos
# ======================================================

class Base(DeclarativeBase):
    pass


# ======================================================
# Engine de conexión
# ======================================================

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    future=True,
    echo=settings.DEBUG
)


# ======================================================
# Sesiones
# ======================================================

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


# ======================================================
# Dependency Injection para FastAPI
# ======================================================

def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()