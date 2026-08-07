from uuid import UUID

from pydantic import BaseModel


class EVMResponse(BaseModel):
    activity_id: UUID

    bac: float
    pv: float
    ev: float
    ac: float

    cv: float
    sv: float

    cpi: float | None
    spi: float | None

    eac: float | None
    vac: float | None

    cpi_status: str
    spi_status: str


class ProjectEVMResponse(BaseModel):
    project_id: UUID

    bac: float
    pv: float
    ev: float
    ac: float

    cv: float
    sv: float

    cpi: float | None
    spi: float | None

    eac: float | None
    vac: float | None

    cpi_status: str
    spi_status: str