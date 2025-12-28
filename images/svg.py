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


def m(x: int, y: int):
    return f"m {x}, {y}"


def path(d: list[str], id: str = ""):
    attributes = []

    if id != "":
        attributes.append(f'id="{id}"')

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


def v(v: int):
    return f"v {v}"
