from uuid import uuid4

import pytest
from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_get_project_evm_returns_404_when_project_does_not_exist():
    project_id = uuid4()

    response = client.get(
        f"/projects/{project_id}/evm"
    )

    assert response.status_code == 404
    assert response.json() == {
        "detail": "Proyecto no encontrado"
    }


def test_get_activity_evm_returns_404_when_activity_does_not_exist():
    project_id = uuid4()
    activity_id = uuid4()

    response = client.get(
        f"/projects/{project_id}/activities/{activity_id}/evm"
    )

    assert response.status_code == 404
    assert response.json() == {
        "detail": "Actividad no encontrada"
    }


def test_get_project_evm_returns_project_evm_response():
    project_response = client.post(
        "/projects/",
        json={
            "name": "Proyecto EVM Test",
            "description": "Proyecto para pruebas EVM",
        },
    )

    assert project_response.status_code == 201

    project = project_response.json()
    project_id = project["id"]

    activity_response = client.post(
        "/activities/",
        json={
            "project_id": project_id,
            "name": "Actividad EVM Test",
            "bac": 10000,
            "planned_progress": 50,
            "actual_progress": 40,
            "actual_cost": 4500,
        },
    )

    assert activity_response.status_code == 201

    response = client.get(
        f"/projects/{project_id}/evm"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["project_id"] == project_id
    assert data["bac"] == 10000
    assert data["pv"] == 5000
    assert data["ev"] == 4000
    assert data["ac"] == 4500
    assert data["cv"] == -500
    assert data["sv"] == -1000

    assert data["cpi"] == pytest.approx(4000 / 4500)
    assert data["spi"] == pytest.approx(4000 / 5000)

    assert data["cpi_status"] == "OVER_BUDGET"
    assert data["spi_status"] == "BEHIND_SCHEDULE"


def test_get_activity_evm_returns_evm_response():
    project_response = client.post(
        "/projects/",
        json={
            "name": "Proyecto Actividad EVM",
            "description": "Proyecto para prueba de actividad EVM",
        },
    )

    assert project_response.status_code == 201

    project_id = project_response.json()["id"]

    activity_response = client.post(
        "/activities/",
        json={
            "project_id": project_id,
            "name": "Actividad EVM",
            "bac": 20000,
            "planned_progress": 60,
            "actual_progress": 50,
            "actual_cost": 9000,
        },
    )

    assert activity_response.status_code == 201

    activity_id = activity_response.json()["id"]

    response = client.get(
        f"/projects/{project_id}/activities/{activity_id}/evm"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["activity_id"] == activity_id
    assert data["bac"] == 20000
    assert data["pv"] == 12000
    assert data["ev"] == 10000
    assert data["ac"] == 9000

    assert data["cv"] == 1000
    assert data["sv"] == -2000

    assert data["cpi"] == pytest.approx(10000 / 9000)
    assert data["spi"] == pytest.approx(10000 / 12000)

    assert data["cpi_status"] == "UNDER_BUDGET"
    assert data["spi_status"] == "BEHIND_SCHEDULE"