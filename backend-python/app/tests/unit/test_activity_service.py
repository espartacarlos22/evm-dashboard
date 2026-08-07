from uuid import uuid4
from unittest.mock import Mock, patch

import pytest

from app.models.activity import Activity
from app.models.audit_log import AuditAction
from app.models.project import Project
from app.schemas.activity import ActivityCreate, ActivityUpdate
from app.services import activity_service


def test_create_activity():
    db = Mock()

    project_id = uuid4()
    activity_id = uuid4()

    project = Project(
        id=project_id,
        name="Proyecto",
        description="Descripción",
    )

    data = ActivityCreate(
        project_id=project_id,
        name="Actividad 1",
        bac=10000,
        planned_progress=50,
        actual_progress=40,
        actual_cost=4000,
    )

    activity = Activity(
        id=activity_id,
        project_id=project_id,
        name=data.name,
        bac=data.bac,
        planned_progress=data.planned_progress,
        actual_progress=data.actual_progress,
        actual_cost=data.actual_cost,
    )

    with patch(
        "app.services.activity_service.project_repository.get_by_id",
        return_value=project,
    ) as project_get_by_id, patch(
        "app.services.activity_service.activity_repository.create",
        return_value=activity,
    ) as repository_create, patch(
        "app.services.activity_service.audit_service.create_audit_log"
    ) as audit_create:

        result = activity_service.create_activity(
            db,
            data,
        )

    assert result is activity

    project_get_by_id.assert_called_once_with(
        db,
        project_id,
    )

    repository_create.assert_called_once()

    audit_create.assert_called_once_with(
        db=db,
        entity="Activity",
        entity_id=activity_id,
        action=AuditAction.CREATE,
        description="Actividad creada: Actividad 1",
    )


def test_create_activity_when_project_does_not_exist():
    db = Mock()

    project_id = uuid4()

    data = ActivityCreate(
        project_id=project_id,
        name="Actividad",
        bac=10000,
        planned_progress=50,
        actual_progress=40,
        actual_cost=4000,
    )

    with patch(
        "app.services.activity_service.project_repository.get_by_id",
        return_value=None,
    ) as project_get_by_id, patch(
        "app.services.activity_service.activity_repository.create"
    ) as repository_create:

        with pytest.raises(
            ValueError,
            match="El proyecto no existe",
        ):
            activity_service.create_activity(
                db,
                data,
            )

    project_get_by_id.assert_called_once_with(
        db,
        project_id,
    )

    repository_create.assert_not_called()


def test_get_activities():
    db = Mock()

    activities = [
        Activity(
            id=uuid4(),
            project_id=uuid4(),
            name="Actividad 1",
            bac=1000,
            planned_progress=50,
            actual_progress=40,
            actual_cost=400,
        ),
        Activity(
            id=uuid4(),
            project_id=uuid4(),
            name="Actividad 2",
            bac=2000,
            planned_progress=70,
            actual_progress=60,
            actual_cost=1200,
        ),
    ]

    with patch(
        "app.services.activity_service.activity_repository.get_all",
        return_value=activities,
    ) as repository_get_all:

        result = activity_service.get_activities(db)

    assert result == activities

    repository_get_all.assert_called_once_with(db)


def test_get_activity():
    db = Mock()

    activity_id = uuid4()

    activity = Activity(
        id=activity_id,
        project_id=uuid4(),
        name="Actividad",
        bac=1000,
        planned_progress=50,
        actual_progress=40,
        actual_cost=400,
    )

    with patch(
        "app.services.activity_service.activity_repository.get_by_id",
        return_value=activity,
    ) as repository_get_by_id:

        result = activity_service.get_activity(
            db,
            activity_id,
        )

    assert result is activity

    repository_get_by_id.assert_called_once_with(
        db,
        activity_id,
    )


def test_get_project_activities():
    db = Mock()

    project_id = uuid4()

    activities = [
        Activity(
            id=uuid4(),
            project_id=project_id,
            name="Actividad",
            bac=1000,
            planned_progress=50,
            actual_progress=40,
            actual_cost=400,
        )
    ]

    with patch(
        "app.services.activity_service.activity_repository.get_by_project",
        return_value=activities,
    ) as repository_get_by_project:

        result = activity_service.get_project_activities(
            db,
            project_id,
        )

    assert result == activities

    repository_get_by_project.assert_called_once_with(
        db,
        project_id,
    )


def test_update_activity():
    db = Mock()

    activity_id = uuid4()

    activity = Activity(
        id=activity_id,
        project_id=uuid4(),
        name="Actividad original",
        bac=1000,
        planned_progress=50,
        actual_progress=40,
        actual_cost=400,
    )

    data = ActivityUpdate(
        name="Actividad actualizada",
        actual_progress=60,
    )

    updated_activity = Activity(
        id=activity_id,
        project_id=activity.project_id,
        name="Actividad actualizada",
        bac=1000,
        planned_progress=50,
        actual_progress=60,
        actual_cost=400,
    )

    with patch(
        "app.services.activity_service.activity_repository.update",
        return_value=updated_activity,
    ) as repository_update, patch(
        "app.services.activity_service.audit_service.create_audit_log"
    ) as audit_create:

        result = activity_service.update_activity(
            db,
            activity,
            data,
        )

    assert result is updated_activity

    assert activity.name == "Actividad actualizada"
    assert activity.actual_progress == 60

    repository_update.assert_called_once_with(
        db,
        activity,
    )

    audit_create.assert_called_once_with(
        db=db,
        entity="Activity",
        entity_id=activity_id,
        action=AuditAction.UPDATE,
        description="Actividad actualizada: Actividad actualizada",
    )


def test_delete_activity():
    db = Mock()

    activity_id = uuid4()

    activity = Activity(
        id=activity_id,
        project_id=uuid4(),
        name="Actividad eliminada",
        bac=1000,
        planned_progress=50,
        actual_progress=40,
        actual_cost=400,
    )

    with patch(
        "app.services.activity_service.activity_repository.delete"
    ) as repository_delete, patch(
        "app.services.activity_service.audit_service.create_audit_log"
    ) as audit_create:

        result = activity_service.delete_activity(
            db,
            activity,
        )

    assert result is None

    repository_delete.assert_called_once_with(
        db,
        activity,
    )

    audit_create.assert_called_once_with(
        db=db,
        entity="Activity",
        entity_id=activity_id,
        action=AuditAction.DELETE,
        description="Actividad eliminada: Actividad eliminada",
    )