from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.project import ProjectStatus


# ============================
# Crear proyecto
# ============================

class ProjectCreate(BaseModel):

    name: str
    description: str | None = None



# ============================
# Actualizar proyecto
# ============================

class ProjectUpdate(BaseModel):

    name: str | None = None
    description: str | None = None
    status: ProjectStatus | None = None



# ============================
# Respuesta API
# ============================

class ProjectResponse(BaseModel):

    id: UUID
    name: str
    description: str | None
    status: ProjectStatus
    created_at: datetime
    updated_at: datetime | None


    model_config = ConfigDict(
        from_attributes=True
    )