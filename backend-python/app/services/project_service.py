from uuid import UUID

from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.audit_log import AuditAction
from app.schemas.project import ProjectCreate, ProjectUpdate

from app.repositories import project_repository
from app.services import audit_service


def create_project(
    db: Session,
    data: ProjectCreate,
) -> Project:

    project = Project(
        name=data.name,
        description=data.description,
    )

    project = project_repository.create(
        db,
        project,
    )

    audit_service.create_audit_log(
        db=db,
        entity="Project",
        entity_id=project.id,
        action=AuditAction.CREATE,
        description=f"Proyecto creado: {project.name}",
    )

    return project


def get_projects(
    db: Session,
) -> list[Project]:

    return project_repository.get_all(db)


def get_project(
    db: Session,
    project_id: UUID,
) -> Project | None:

    return project_repository.get_by_id(
        db,
        project_id,
    )


def update_project(
    db: Session,
    project: Project,
    data: ProjectUpdate,
) -> Project:

    update_data = data.model_dump(
        exclude_unset=True,
    )

    for key, value in update_data.items():
        setattr(project, key, value)

    project = project_repository.update(
        db,
        project,
    )

    audit_service.create_audit_log(
        db=db,
        entity="Project",
        entity_id=project.id,
        action=AuditAction.UPDATE,
        description=f"Proyecto actualizado: {project.name}",
    )

    return project


def delete_project(
    db: Session,
    project: Project,
) -> None:

    project_id = project.id
    project_name = project.name

    project_repository.delete(
        db,
        project,
    )

    audit_service.create_audit_log(
        db=db,
        entity="Project",
        entity_id=project_id,
        action=AuditAction.DELETE,
        description=f"Proyecto eliminado: {project_name}",
    )