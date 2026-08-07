from uuid import UUID

from app.models.activity import Activity
from app.schemas.evm import EVMResponse, ProjectEVMResponse


def calculate_evm(activity: Activity) -> EVMResponse:
    bac = float(activity.bac)
    planned_progress = float(activity.planned_progress)
    actual_progress = float(activity.actual_progress)
    ac = float(activity.actual_cost)

    pv = (planned_progress / 100) * bac
    ev = (actual_progress / 100) * bac

    cv = ev - ac
    sv = ev - pv

    cpi = None if ac == 0 else ev / ac
    spi = None if pv == 0 else ev / pv

    eac = None if cpi is None or cpi == 0 else bac / cpi
    vac = None if eac is None else bac - eac

    return EVMResponse(
        activity_id=activity.id,
        bac=bac,
        pv=pv,
        ev=ev,
        ac=ac,
        cv=cv,
        sv=sv,
        cpi=cpi,
        spi=spi,
        eac=eac,
        vac=vac,
        cpi_status=_get_cpi_status(cpi),
        spi_status=_get_spi_status(spi),
    )


def calculate_project_evm(
    project_id: UUID,
    activities: list[Activity],
) -> ProjectEVMResponse:

    if not activities:
        return ProjectEVMResponse(
            project_id=project_id,
            bac=0,
            pv=0,
            ev=0,
            ac=0,
            cv=0,
            sv=0,
            cpi=None,
            spi=None,
            eac=None,
            vac=None,
            cpi_status="UNDEFINED",
            spi_status="UNDEFINED",
        )

    bac = sum(float(activity.bac) for activity in activities)

    pv = sum(
        (float(activity.planned_progress) / 100) * float(activity.bac)
        for activity in activities
    )

    ev = sum(
        (float(activity.actual_progress) / 100) * float(activity.bac)
        for activity in activities
    )

    ac = sum(float(activity.actual_cost) for activity in activities)

    cv = ev - ac
    sv = ev - pv

    cpi = None if ac == 0 else ev / ac
    spi = None if pv == 0 else ev / pv

    eac = None if cpi is None or cpi == 0 else bac / cpi
    vac = None if eac is None else bac - eac

    return ProjectEVMResponse(
        project_id=project_id,
        bac=bac,
        pv=pv,
        ev=ev,
        ac=ac,
        cv=cv,
        sv=sv,
        cpi=cpi,
        spi=spi,
        eac=eac,
        vac=vac,
        cpi_status=_get_cpi_status(cpi),
        spi_status=_get_spi_status(spi),
    )


def _get_cpi_status(cpi: float | None) -> str:
    if cpi is None:
        return "UNDEFINED"

    if cpi > 1:
        return "UNDER_BUDGET"

    if cpi < 1:
        return "OVER_BUDGET"

    return "ON_BUDGET"


def _get_spi_status(spi: float | None) -> str:
    if spi is None:
        return "UNDEFINED"

    if spi > 1:
        return "AHEAD_OF_SCHEDULE"

    if spi < 1:
        return "BEHIND_SCHEDULE"

    return "ON_SCHEDULE"