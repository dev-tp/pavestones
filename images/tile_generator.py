#!/usr/bin/python

import uuid


def draw_circular_tiles(
    initial_radius=50,
    offset=50,
    center=None,
    rotate=0,
    number_of_tiles=4,
    tile_angle=90,
    number_of_rows=1,
):
    if center is None:
        center = (
            initial_radius + offset * number_of_rows,
            initial_radius + offset * number_of_rows,
        )

    for row in range(number_of_rows):
        line_id = uuid.uuid4()

        inner_radius = initial_radius + offset * row
        outer_radius = initial_radius + offset * (row + 1)

        print(
            f"""  <g
    style="fill:none;stroke:#ff6600"
    transform="rotate({rotate}, {center[0]}, {center[1]})">
    <circle
      cx="{center[0]}"
      cy="{center[1]}"
      r="{inner_radius}" />
    <circle
      cx="{center[0]}"
      cy="{center[1]}"
      r="{outer_radius}" />
    <path
      id="{line_id}"
      d="m {center[0]},{center[1] - initial_radius} v {-offset * (row + 1)}" />"""
        )

        for tile in range(number_of_tiles):
            print(
                f"""    <use
      xlink:href="#{line_id}"
      transform="rotate({tile_angle * (tile + 1)},{center[0]},{center[1]})" />"""
            )

        print("  </g>")

    return outer_radius


def main():
    page_width = 7000
    page_height = 5500

    print(
        f"""<svg
  width="{page_width}"
  height="{page_height}"
  viewBox="0 0 {page_width} {page_height}"
  version="1.1"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg">
  <image xlink:href="cathedral-color.png" style="display:inline" /> """
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=35,
        offset=51,
        number_of_tiles=12,
        tile_angle=360 / 12,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=40,
        tile_angle=360 / 40,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=72,
        tile_angle=360 / 72,
        rotate=2.5,
    )

    print("</svg>")


if __name__ == "__main__":
    main()
