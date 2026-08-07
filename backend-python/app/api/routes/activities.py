from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.activity import (
    ActivityCreate,
    ActivityUpdate,
    ActivityResponse,
)
from app.services import activity_service


router = APIRouter()


@router.post(
    "/",
    response_model=ActivityResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_activity(
    data: ActivityCreate,
    db: Session = Depends(get_db),
):
    try:
        return activity_service.create_activity(db, data)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.get(
    "/",
    response_model=list[ActivityResponse],
)
def get_activities(
    db: Session = Depends(get_db),
):
    return activity_service.get_activities(db)


@router.get(
    "/{activity_id}",
    response_model=ActivityResponse,
)
def get_activity(
    activity_id: UUID,
    db: Session = Depends(get_db),
):
    activity = activity_service.get_activity(
        db,
        activity_id,
    )

    if activity is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Actividad no encontrada",
        )

    return activity


@router.get(
    "/project/{project_id}",
    response_model=list[ActivityResponse],
)
def get_project_activities(
    project_id: UUID,
    db: Session = Depends(get_db),
):
    return activity_service.get_project_activities(
        db,
        project_id,
    )


@router.patch(
    "/{activity_id}",
    response_model=ActivityResponse,
)
def update_activity(
    activity_id: UUID,
    data: ActivityUpdate,
    db: Session = Depends(get_db),
):
    activity = activity_service.get_activity(
        db,
        activity_id,
    )

    if activity is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Actividad no encontrada",
        )

    return activity_service.update_activity(
        db,
        activity,
        data,
    )


@router.delete(
    "/{activity_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_activity(
    activity_id: UUID,
    db: Session = Depends(get_db),
):
    activity = activity_service.get_activity(
        db,
        activity_id,
    )

    if activity is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Actividad no encontrada",
        )

    activity_service.delete_activity(
        db,
        activity,
    )