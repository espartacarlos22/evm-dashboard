from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.audit_log import AuditAction



class AuditLogResponse(BaseModel):

    id: UUID

    entity: str

    entity_id: UUID

    action: AuditAction

    description: str | None

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )