import enum
import uuid

from datetime import UTC, datetime

from sqlalchemy import DateTime
from sqlalchemy import Enum
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.database import Base


# ==========================================================
# Acciones permitidas para la auditoría
# ==========================================================

class AuditAction(str, enum.Enum):
    CREATE = "CREATE"
    UPDATE = "UPDATE"
    DELETE = "DELETE"


# ==========================================================
# Modelo de Auditoría
# ==========================================================

class AuditLog(Base):

    __tablename__ = "audit_logs"

    # ======================================================
    # Identificador único
    # ======================================================

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    # ======================================================
    # Entidad afectada
    # Ejemplo:
    # Project
    # Activity
    # ======================================================

    entity: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True
    )

    # ======================================================
    # UUID del registro afectado
    # ======================================================

    entity_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        nullable=False,
        index=True
    )

    # ======================================================
    # Acción realizada
    # CREATE
    # UPDATE
    # DELETE
    # ======================================================

    action: Mapped[AuditAction] = mapped_column(
        Enum(
            AuditAction,
            name="audit_action"
        ),
        nullable=False,
        index=True
    )

    # ======================================================
    # Descripción del evento
    # ======================================================

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # ======================================================
    # Fecha de creación
    # ======================================================

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
        index=True
    )