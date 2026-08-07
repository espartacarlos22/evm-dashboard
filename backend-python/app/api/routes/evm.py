from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.activity import Activity
from app.models.project import Project
from app.schemas.evm import EVMResponse, ProjectEVMResponse
from app.services.evm_service import (
    calculate_evm,
    calculate_project_evm,
)


router = APIRouter()


@router.get(
    "/{project_id}/evm",
    response_model=ProjectEVMResponse,
    summary="Obtener indicadores EVM del proyecto",
    description=(
        "Calcula los indicadores de Earned Value Management "
        "consolidados para todas las actividades del proyecto."
    ),
)
def get_project_evm(
    project_id: UUID,
    db: Session = Depends(get_db),
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Proyecto no encontrado",
        )

    activities = (
        db.query(Activity)
        .filter(Activity.project_id == project_id)
        .all()
    )

    return calculate_project_evm(
        project_id=project_id,
        activities=activities,
    )


@router.get(
    "/{project_id}/activities/{activity_id}/evm",
    response_model=EVMResponse,
    summary="Obtener indicadores EVM de una actividad",
    description=(
        "Calcula los indicadores de Earned Value Management "
        "para una actividad específica."
    ),
)
def get_activity_evm(
    project_id: UUID,
    activity_id: UUID,
    db: Session = Depends(get_db),
):
    activity = (
        db.query(Activity)
        .filter(
            Activity.id == activity_id,
            Activity.project_id == project_id,
        )
        .first()
    )

    if activity is None:
        raise HTTPException(
            status_code=404,
            detail="Actividad no encontrada",
        )

    return calculate_evm(activity)