from uuid import UUID

from sqlalchemy.orm import Session

from app.models.project import Project


def create(
    db: Session,
    project: Project
) -> Project:
    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_all(
    db: Session
) -> list[Project]:
    return db.query(Project).all()


def get_by_id(
    db: Session,
    project_id: UUID
) -> Project | None:
    return (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )


def update(
    db: Session,
    project: Project
) -> Project:
    db.commit()
    db.refresh(project)

    return project


def delete(
    db: Session,
    project: Project
) -> None:
    db.delete(project)
    db.commit()