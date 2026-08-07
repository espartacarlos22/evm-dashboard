import uuid

from datetime import datetime
from datetime import UTC

from sqlalchemy import String
from sqlalchemy import Numeric
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import CheckConstraint

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.database import Base


class Activity(Base):

    __tablename__ = "activities"

    __table_args__ = (
        CheckConstraint("planned_progress >= 0 AND planned_progress <= 100"),
        CheckConstraint("actual_progress >= 0 AND actual_progress <= 100"),
        CheckConstraint("bac >= 0"),
        CheckConstraint("actual_cost >= 0"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey(
            "projects.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True
    )

    bac: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
    )

    planned_progress: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False
    )

    actual_progress: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False
    )

    actual_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
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

    project: Mapped["Project"] = relationship(
        back_populates="activities"
    )