import enum
import uuid

from datetime import datetime
from datetime import UTC
from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Enum
from sqlalchemy import DateTime

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.base import Base
from typing import List


class ProjectStatus(str, enum.Enum):
    PLANNING = "PLANNING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class Project(Base):

    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    status: Mapped[ProjectStatus] = mapped_column(
        Enum(ProjectStatus),
        nullable=False,
        default=ProjectStatus.PLANNING,
        index=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(UTC),
        onupdate=datetime.utcnow
    )

    activities: Mapped[List["Activity"]] = relationship(
        "Activity",
        back_populates="project",
        cascade="all, delete-orphan"
    )