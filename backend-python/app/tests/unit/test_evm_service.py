import uuid

import pytest

from app.models.activity import Activity
from app.services.evm_service import calculate_evm


def create_activity(
    bac: float,
    planned_progress: float,
    actual_progress: float,
    actual_cost: float,
) -> Activity:
    return Activity(
        id=uuid.uuid4(),
        project_id=uuid.uuid4(),
        name="Actividad de prueba",
        bac=bac,
        planned_progress=planned_progress,
        actual_progress=actual_progress,
        actual_cost=actual_cost,
    )


def test_calculate_evm_normal_case():
    activity = create_activity(
        bac=10000,
        planned_progress=60,
        actual_progress=50,
        actual_cost=5500,
    )

    result = calculate_evm(activity)

    assert result.pv == 6000
    assert result.ev == 5000
    assert result.ac == 5500

    assert result.cv == -500
    assert result.sv == -1000

    assert result.cpi == pytest.approx(5000 / 5500)
    assert result.spi == pytest.approx(5000 / 6000)

    assert result.cpi_status == "OVER_BUDGET"
    assert result.spi_status == "BEHIND_SCHEDULE"


def test_calculate_evm_when_actual_cost_is_zero():
    activity = create_activity(
        bac=10000,
        planned_progress=50,
        actual_progress=40,
        actual_cost=0,
    )

    result = calculate_evm(activity)

    assert result.pv == 5000
    assert result.ev == 4000
    assert result.ac == 0

    assert result.cpi is None
    assert result.eac is None
    assert result.vac is None

    assert result.cpi_status == "UNDEFINED"


def test_calculate_evm_when_planned_progress_is_zero():
    activity = create_activity(
        bac=10000,
        planned_progress=0,
        actual_progress=40,
        actual_cost=3000,
    )

    result = calculate_evm(activity)

    assert result.pv == 0
    assert result.ev == 4000

    assert result.spi is None
    assert result.spi_status == "UNDEFINED"


def test_calculate_evm_when_actual_progress_is_zero():
    activity = create_activity(
        bac=10000,
        planned_progress=50,
        actual_progress=0,
        actual_cost=2000,
    )

    result = calculate_evm(activity)

    assert result.ev == 0
    assert result.cv == -2000

    assert result.cpi == 0
    assert result.cpi_status == "OVER_BUDGET"


def test_cpi_under_budget():
    activity = create_activity(
        bac=10000,
        planned_progress=50,
        actual_progress=60,
        actual_cost=5000,
    )

    result = calculate_evm(activity)

    assert result.cpi > 1
    assert result.cpi_status == "UNDER_BUDGET"


def test_spi_ahead_of_schedule():
    activity = create_activity(
        bac=10000,
        planned_progress=50,
        actual_progress=60,
        actual_cost=5000,
    )

    result = calculate_evm(activity)

    assert result.spi > 1
    assert result.spi_status == "AHEAD_OF_SCHEDULE"


def test_project_is_on_budget_and_on_schedule():
    activity = create_activity(
        bac=10000,
        planned_progress=50,
        actual_progress=50,
        actual_cost=5000,
    )

    result = calculate_evm(activity)

    assert result.cpi == 1
    assert result.spi == 1

    assert result.cpi_status == "ON_BUDGET"
    assert result.spi_status == "ON_SCHEDULE"