def A(
    rx: float,
    ry: float,
    angle: float,
    large_arc_flag: int,
    sweep_flag: int,
    x: float,
    y: float,
):
    return (
        f"A {rx:.2f} {ry:.2f} {angle:.2f} {large_arc_flag} {sweep_flag} {x:.2f} {y:.2f}"
    )


def L(x: float, y: float):
    return f"L {x:.2f},{y:.2f}"


def M(x: int, y: int):
    return f"M {x}, {y}"


def Z():
    return "Z"


def circle(cx: int, cy: int, r: int):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" />'


def g(elements: list[str], style: str = "", transform: str = ""):
    attributes = []

    if style != "":
        attributes.append(f'style="{style}"')

    if transform != "":
        attributes.append(f'transform="{transform}"')

    return f"<g {' '.join(attributes)}>{''.join(elements)}</g>"


def image(href: str):
    return f'<image href="{href}" style="display: inline" />'


def path(d: list[str], id: str = "", fill: str = "", stroke: str = ""):
    attributes = []

    if id != "":
        attributes.append(f'id="{id}"')

    if fill != "":
        attributes.append(f'fill="{fill}"')

    if stroke != "":
        attributes.append(f'stroke="{stroke}"')

    return f'<path d="{''.join(d)}" {" ".join(attributes)} />'


def svg(
    width: int,
    height: int,
    elements: list[str] = [],
    viewbox: tuple[int, int, int, int] = None,
):
    attributes = []

    if viewbox is None:
        attributes.append(f'viewbox="0 0 {width} {height}"')
    else:
        attributes.append(f'viewbox="{' '.join(str(value) for value in viewbox)}"')

    return f'<svg width="{width}" height="{height}" version="1.1" xmlns="http://www.w3.org/2000/svg" {''.join(attributes)}>{''.join(elements)}</svg>'


def use(href: str, transform: str = ""):
    attributes = []

    if transform != "":
        attributes.append(f'transform="{transform}"')

    return f'<use href="#{href}" {" ".join(attributes)} />'
