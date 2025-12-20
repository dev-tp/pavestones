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

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=113,
        tile_angle=360 / 113,
        rotate=2.3,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=138,
        tile_angle=360 / 138,
        rotate=2.4,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=164,
        tile_angle=360 / 164,
        rotate=2.1,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=189,
        tile_angle=360 / 189,
        rotate=2.3,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=214,
        tile_angle=360 / 214,
        rotate=0.8,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=36,
        number_of_tiles=239,
        tile_angle=360 / 239,
        rotate=1,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=264,
        tile_angle=360 / 264,
        rotate=1.2,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=289,
        tile_angle=360 / 289,
        rotate=0.2,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=314,
        tile_angle=360 / 314,
        rotate=0.4,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=339,
        tile_angle=360 / 339,
        rotate=0.7,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=364,
        tile_angle=360 / 364,
        rotate=0.8,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=389,
        tile_angle=360 / 389,
        rotate=0.9,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=414,
        tile_angle=360 / 414,
        rotate=1.1,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=440,
        tile_angle=360 / 440,
        rotate=1.1,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=465,
        tile_angle=360 / 465,
        rotate=1.2,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=490,
        tile_angle=360 / 490,
        rotate=1.2,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=515,
        tile_angle=360 / 515,
        rotate=1.4,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=540,
        tile_angle=360 / 540,
        rotate=1.5,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=565,
        tile_angle=360 / 565,
        rotate=1.6,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=590,
        tile_angle=360 / 590,
        rotate=1.7,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=615,
        tile_angle=360 / 615,
        rotate=1.7,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=640,
        tile_angle=360 / 640,
        rotate=1.8,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=666,
        tile_angle=360 / 666,
        rotate=1.7,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=691,
        tile_angle=360 / 691,
        rotate=1.8,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=716,
        tile_angle=360 / 716,
        rotate=1.8,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=741,
        tile_angle=360 / 741,
        rotate=1.9,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=766,
        tile_angle=360 / 766,
        rotate=0,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=791,
        tile_angle=360 / 791,
        rotate=35.2,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=36,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=36.6,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=39.3,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=39.9,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=63.7,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=64.3,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=64.5,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=65.1,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=36,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=64.3,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=62.2,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=58.1,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=57.9,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=34,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=58.3,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=58.6,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=59.2,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=59.5,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=59.9,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=111.94,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=112.1,
    )

    radius = draw_circular_tiles(
        center=(4512, 2287),
        initial_radius=radius,
        offset=35,
        number_of_tiles=0,
        tile_angle=360 / 791,
        rotate=112.2,
    )

    print("</svg>")


if __name__ == "__main__":
    main()
