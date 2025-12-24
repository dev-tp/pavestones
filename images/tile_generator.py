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

    number_of_tiles = 12
    radius = 35

    for i in range(123):
        offset = 34.72
        rotate = 0

        if i > 3:
            number_of_tiles += 25

        if i > 51:
            number_of_tiles = 1

        if i == 0:
            offset = 51
        elif i == 1:
            number_of_tiles = 40
        elif i == 2:
            number_of_tiles = 72
            rotate = 2.3
        elif i == 3:
            number_of_tiles = 113
            rotate = 2.2
        elif i == 5:
            number_of_tiles += 1
        elif i == 6:
            rotate = 0.6
        elif i == 7:
            rotate = 0.8
        elif i == 8:
            rotate = 4
        elif i == 10:
            rotate = 0.2
        elif i == 11:
            rotate = 0.4
        elif i == 12:
            rotate = 0.7
        elif i == 13:
            rotate = 0.9
        elif i == 15:
            rotate = 1.1
        elif i == 16:
            number_of_tiles += 1
            rotate = 0.3
        elif i == 17:
            rotate = 0.4
        elif i == 18:
            rotate = 0.6
        elif i == 20:
            rotate = 0.2
        elif i == 21:
            rotate = 0.3
        elif i == 22:
            rotate = 0.5
        elif i == 23:
            rotate = 5.2
        elif i == 24:
            rotate = 11.3
        elif i == 25:
            number_of_tiles += 1
            rotate = 17.4
        elif i == 26:
            rotate = 23.1
        elif i == 27:
            rotate = 24.9
        elif i == 28:
            rotate = 27.6
        elif i == 29:
            rotate = 30.6
        elif i == 30:
            rotate = 35.2
        elif i == 31:
            rotate = 36
        elif i == 32:
            number_of_tiles += 1
            rotate = 36.55
        elif i == 33:
            rotate = 39.35
        elif i == 34:
            rotate = 40
        elif i == 35:
            rotate = 63.7
        elif i == 36:
            number_of_tiles -= 25 # 917
            rotate = 64.3
        elif i == 37:
            number_of_tiles += 26
            rotate = 64.5
        elif i == 38:
            rotate = 65.1
        elif i == 39:
            rotate = 64.3
        elif i == 40:
            rotate = 62.2
        elif i == 41:
            rotate = 58.1
        elif i == 42:
            rotate = 57.9
        elif i == 43:
            rotate = 58.3
        elif i == 44:
            rotate = 58.6
        elif i == 45:
            number_of_tiles += 1
            rotate = 59.2
        elif i == 46:
            rotate = 59.5
        elif i == 47:
            number_of_tiles = 1293
            rotate = 59.85
        elif i == 48:
            number_of_tiles = 1246
            rotate = 111.94
        elif i == 49:
            rotate = 112.1
        elif i == 50:
            rotate = 112.2
        elif i == 51:
            rotate = 112.3
        elif i == 52:
            rotate = 112.55
        elif i == 53:
            rotate = 111.08
        elif i == 54:
            rotate = 110.46
        elif i == 55:
            rotate = 111.35
        elif i == 56:
            rotate = 112.5
        elif i == 57:
            rotate = 113.3
        elif i == 58:
            rotate = 114.1
        elif i == 59:
            rotate = 114.9
        elif i == 60:
            rotate = 115.45
        elif i == 61:
            rotate = 116.3
        elif i == 62:
            rotate = 117
        elif i == 63:
            rotate = 117.7
        elif i == 64:
            rotate = 118.15
        elif i == 65:
            rotate = 118.8
        elif i == 66:
            rotate = 119.43
        elif i == 67:
            rotate = 120.03
        elif i == 68:
            rotate = 120.53
        elif i == 69:
            rotate = 121.1
        elif i == 70:
            rotate = 121.66
        elif i == 71:
            rotate = 122

        radius = draw_circular_tiles(
            center=(4512, 2287),
            initial_radius=radius,
            offset=offset,
            number_of_tiles=number_of_tiles,
            tile_angle=360 / number_of_tiles,
            rotate=rotate,
        )

    print("</svg>")


if __name__ == "__main__":
    main()
