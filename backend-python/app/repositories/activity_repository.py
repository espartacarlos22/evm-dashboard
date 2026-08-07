from uuid import UUID

from sqlalchemy.orm import Session

from app.models.activity import Activity


def create(
    db: Session,
    activity: Activity
) -> Activity:
    db.add(activity)
    db.commit()
    db.refresh(activity)

    return activity


def get_all(
    db: Session
) -> list[Activity]:
    return db.query(Activity).all()


def get_by_id(
    db: Session,
    activity_id: UUID
) -> Activity | None:
    return (
        db.query(Activity)
        .filter(Activity.id == activity_id)
        .first()
    )


def get_by_project(
    db: Session,
    project_id: UUID
) -> list[Activity]:
    return (
        db.query(Activity)
        .filter(Activity.project_id == project_id)
        .all()
    )


def update(
    db: Session,
    activity: Activity
) -> Activity:
    db.commit()
    db.refresh(activity)

    return activity


def delete(
    db: Session,
    activity: Activity
) -> None:
    db.delete(activity)
    db.commit()