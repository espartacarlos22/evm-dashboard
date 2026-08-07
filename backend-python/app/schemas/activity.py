from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ActivityCreate(BaseModel):

    project_id: UUID

    name: str

    bac: float

    planned_progress: float

    actual_progress: float

    actual_cost: float



class ActivityUpdate(BaseModel):

    name: str | None = None

    bac: float | None = None

    planned_progress: float | None = None

    actual_progress: float | None = None

    actual_cost: float | None = None



class ActivityResponse(BaseModel):

    id: UUID

    project_id: UUID

    name: str

    bac: float

    planned_progress: float

    actual_progress: float

    actual_cost: float

    created_at: datetime

    updated_at: datetime | None


    model_config = ConfigDict(
        from_attributes=True
    )