from uuid import UUID

from sqlalchemy.orm import Session

from app.models.activity import Activity
from app.models.audit_log import AuditAction
from app.schemas.activity import ActivityCreate, ActivityUpdate

from app.repositories import activity_repository
from app.repositories import project_repository

from app.services import audit_service


def create_activity(
    db: Session,
    data: ActivityCreate,
) -> Activity:

    project = project_repository.get_by_id(
        db,
        data.project_id,
    )

    if project is None:
        raise ValueError("El proyecto no existe")

    activity = Activity(
        project_id=data.project_id,
        name=data.name,
        bac=data.bac,
        planned_progress=data.planned_progress,
        actual_progress=data.actual_progress,
        actual_cost=data.actual_cost,
    )

    activity = activity_repository.create(
        db,
        activity,
    )

    audit_service.create_audit_log(
        db=db,
        entity="Activity",
        entity_id=activity.id,
        action=AuditAction.CREATE,
        description=f"Actividad creada: {activity.name}",
    )

    return activity


def get_activities(
    db: Session,
) -> list[Activity]:

    return activity_repository.get_all(db)


def get_activity(
    db: Session,
    activity_id: UUID,
) -> Activity | None:

    return activity_repository.get_by_id(
        db,
        activity_id,
    )


def get_project_activities(
    db: Session,
    project_id: UUID,
) -> list[Activity]:

    return activity_repository.get_by_project(
        db,
        project_id,
    )


def update_activity(
    db: Session,
    activity: Activity,
    data: ActivityUpdate,
) -> Activity:

    update_data = data.model_dump(
        exclude_unset=True,
    )

    for key, value in update_data.items():
        setattr(activity, key, value)

    activity = activity_repository.update(
        db,
        activity,
    )

    audit_service.create_audit_log(
        db=db,
        entity="Activity",
        entity_id=activity.id,
        action=AuditAction.UPDATE,
        description=f"Actividad actualizada: {activity.name}",
    )

    return activity


def delete_activity(
    db: Session,
    activity: Activity,
) -> None:

    activity_id = activity.id
    activity_name = activity.name

    activity_repository.delete(
        db,
        activity,
    )

    audit_service.create_audit_log(
        db=db,
        entity="Activity",
        entity_id=activity_id,
        action=AuditAction.DELETE,
        description=f"Actividad eliminada: {activity_name}",
    )