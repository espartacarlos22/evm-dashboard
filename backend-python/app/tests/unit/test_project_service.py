from uuid import uuid4
from unittest.mock import Mock, patch

from app.models.audit_log import AuditAction
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.services import project_service


def test_create_project():
    db = Mock()

    project_id = uuid4()

    data = ProjectCreate(
        name="Proyecto de prueba",
        description="Descripción de prueba",
    )

    project = Project(
        id=project_id,
        name=data.name,
        description=data.description,
    )

    with patch(
        "app.services.project_service.project_repository.create",
        return_value=project,
    ) as repository_create, patch(
        "app.services.project_service.audit_service.create_audit_log"
    ) as audit_create:

        result = project_service.create_project(db, data)

    assert result is project

    repository_create.assert_called_once()

    audit_create.assert_called_once_with(
        db=db,
        entity="Project",
        entity_id=project_id,
        action=AuditAction.CREATE,
        description="Proyecto creado: Proyecto de prueba",
    )


def test_get_projects():
    db = Mock()

    projects = [
        Project(
            id=uuid4(),
            name="Proyecto 1",
            description="Descripción 1",
        ),
        Project(
            id=uuid4(),
            name="Proyecto 2",
            description="Descripción 2",
        ),
    ]

    with patch(
        "app.services.project_service.project_repository.get_all",
        return_value=projects,
    ) as repository_get_all:

        result = project_service.get_projects(db)

    assert result == projects

    repository_get_all.assert_called_once_with(db)


def test_get_project():
    db = Mock()

    project_id = uuid4()

    project = Project(
        id=project_id,
        name="Proyecto",
        description="Descripción",
    )

    with patch(
        "app.services.project_service.project_repository.get_by_id",
        return_value=project,
    ) as repository_get_by_id:

        result = project_service.get_project(
            db,
            project_id,
        )

    assert result is project

    repository_get_by_id.assert_called_once_with(
        db,
        project_id,
    )


def test_update_project():
    db = Mock()

    project_id = uuid4()

    project = Project(
        id=project_id,
        name="Proyecto original",
        description="Descripción original",
    )

    data = ProjectUpdate(
        name="Proyecto actualizado",
        description="Nueva descripción",
    )

    updated_project = Project(
        id=project_id,
        name="Proyecto actualizado",
        description="Nueva descripción",
    )

    with patch(
        "app.services.project_service.project_repository.update",
        return_value=updated_project,
    ) as repository_update, patch(
        "app.services.project_service.audit_service.create_audit_log"
    ) as audit_create:

        result = project_service.update_project(
            db,
            project,
            data,
        )

    assert result is updated_project

    assert project.name == "Proyecto actualizado"
    assert project.description == "Nueva descripción"

    repository_update.assert_called_once_with(
        db,
        project,
    )

    audit_create.assert_called_once_with(
        db=db,
        entity="Project",
        entity_id=project_id,
        action=AuditAction.UPDATE,
        description="Proyecto actualizado: Proyecto actualizado",
    )


def test_delete_project():
    db = Mock()

    project_id = uuid4()

    project = Project(
        id=project_id,
        name="Proyecto eliminado",
        description="Descripción",
    )

    with patch(
        "app.services.project_service.project_repository.delete"
    ) as repository_delete, patch(
        "app.services.project_service.audit_service.create_audit_log"
    ) as audit_create:

        result = project_service.delete_project(
            db,
            project,
        )

    assert result is None

    repository_delete.assert_called_once_with(
        db,
        project,
    )

    audit_create.assert_called_once_with(
        db=db,
        entity="Project",
        entity_id=project_id,
        action=AuditAction.DELETE,
        description="Proyecto eliminado: Proyecto eliminado",
    )