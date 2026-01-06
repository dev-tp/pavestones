#!/usr/bin/python

import math
import svg

from typing import Callable


# https://stackoverflow.com/questions/11479185/svg-donut-slice-as-path-element-annular-sector
def annular_sector(
    center: tuple[float, float],
    start_angle: float,
    end_angle: float,
    inner_radius: float,
    outer_radius: float,
    fill: str = "",
    stroke: str = "",
):
    start_angle = math.radians(start_angle + 270)
    end_angle = math.radians(end_angle + 270)

    points = (
        (
            center[0] + inner_radius * math.cos(start_angle),
            center[1] + inner_radius * math.sin(start_angle),
        ),
        (
            center[0] + outer_radius * math.cos(start_angle),
            center[1] + outer_radius * math.sin(start_angle),
        ),
        (
            center[0] + outer_radius * math.cos(end_angle),
            center[1] + outer_radius * math.sin(end_angle),
        ),
        (
            center[0] + inner_radius * math.cos(end_angle),
            center[1] + inner_radius * math.sin(end_angle),
        ),
    )

    large_arc = 0

    if (end_angle - start_angle) % (math.pi * 2) > math.pi:
        large_arc = 1

    return svg.path(
        d=[
            svg.M(*points[0]),
            svg.L(*points[1]),
            svg.A(outer_radius, outer_radius, 0, large_arc, 1, *points[2]),
            svg.L(*points[3]),
            svg.A(inner_radius, inner_radius, 0, large_arc, 0, *points[0]),
            svg.Z(),
        ],
        fill=fill,
        stroke=stroke,
    )


def draw_annular_tiles(
    inner_radius: float = 50,
    offset: float = 50,
    center: tuple[float, float] | None = None,
    rotate: int = 0,
    number_of_tiles: int = 4,
    skip_tiles: set[int] = set([]),
    tile_angle: float = 90,
    fill: str = "#fff",
    fill_different_when: Callable[[int], str] | None = None,
):
    outer_radius = inner_radius + offset

    if center is None:
        center = (outer_radius, outer_radius)

    elements = []

    for tile in range(number_of_tiles):
        if tile not in skip_tiles:
            tile_color = ""

            if fill_different_when:
                tile_color = fill_different_when(tile)

            elements.append(
                annular_sector(
                    center=center,
                    start_angle=tile_angle * tile,
                    end_angle=tile_angle * (tile + 1),
                    inner_radius=inner_radius,
                    outer_radius=outer_radius,
                    fill=tile_color,
                    stroke=tile_color,
                )
            )

    return svg.g(
        style=f"fill: {fill}; stroke: {fill}",
        transform=f"rotate({rotate}, {center[0]}, {center[1]})",
        elements=elements,
    )


def main():
    elements = [
        svg.image("cathedral-color.png"),
        "<style>path { fill-opacity: 0; } path:hover { fill-opacity: 1; }</style>",
    ]

    cyan = "#527ca5"
    green = "#5f7f3f"
    magenta = "#a5527c"
    purple = "#5f007f"
    rose = "#ff9f7f"

    fill = purple
    number_of_tiles = 12
    radius = 35

    for i in range(123):
        fill_different_when: Callable[[int], str] | None = None
        offset = 34.72
        rotate = 0
        skip_tiles = set([])

        if i > 3:
            number_of_tiles += 25

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
            skip_tiles = set(range(132, 150))
        elif i == 7:
            rotate = 0.8
            skip_tiles = set(range(142, 178))
        elif i == 8:
            rotate = 4
            skip_tiles = set(
                [
                    *range(18, 24),
                    *range(42, 48),
                    *range(66, 72),
                    *range(90, 96),
                    *range(114, 120),
                    *range(151, 202),
                    *range(233, 239),
                ]
            )
        elif i == 9:
            skip_tiles = set(range(165, 231))
        elif i == 10:
            rotate = 0.2
            skip_tiles = set(
                [
                    *range(177, 207),
                    *range(225, 253),
                ]
            )
        elif i == 11:
            rotate = 0.4
            skip_tiles = set(
                [
                    *range(154, 158),
                    *range(189, 213),
                    *range(257, 272),
                ]
            )
        elif i == 12:
            rotate = 0.7
            skip_tiles = set(
                [
                    *range(48, 52),
                    *range(167, 171),
                    *range(201, 223),
                    *range(278, 290),
                ]
            )
        elif i == 13:
            rotate = 0.9
            skip_tiles = set(
                [
                    *range(179, 183),
                    *range(212, 233),
                    *range(296, 310),
                ]
            )
        elif i == 14:
            fill = green
            skip_tiles = set(
                [
                    *range(226, 245),
                    *range(317, 335),
                    *range(362, 372),
                ]
            )
        elif i == 15:
            rotate = 1.1
            skip_tiles = set(
                [
                    *range(16, 22),
                    *range(58, 63),
                    *range(99, 105),
                    *range(141, 146),
                    *range(163, 166),
                    *range(182, 188),
                    *range(204, 207),
                    *range(240, 256),
                    *range(338, 358),
                    *range(374, 395),
                    *range(411, 414),
                ]
            )
        elif i == 16:
            number_of_tiles += 1
            rotate = 0.3
            skip_tiles = set(
                [
                    *range(259, 273),
                    *range(365, 385),
                    *range(391, 411),
                ]
            )
        elif i == 17:
            rotate = 0.4
            skip_tiles = set(
                [
                    *range(271, 289),
                    *range(390, 423),
                ]
            )
        elif i == 18:
            rotate = 0.6
            skip_tiles = set(
                [
                    *range(120, 123),
                    *range(283, 301),
                    *range(414, 438),
                    *range(455, 471),
                ]
            )
        elif i == 19:
            skip_tiles = set(
                [
                    *range(296, 314),
                    *range(440, 454),
                    *range(470, 493),
                ]
            )
        elif i == 20:
            rotate = 0.2
            skip_tiles = set(
                [
                    *range(309, 326),
                    *range(457, 470),
                    *range(485, 503),
                ]
            )
        elif i == 21:
            rotate = 0.3
            skip_tiles = set(
                [
                    *range(321, 338),
                    *range(478, 487),
                    *range(500, 517),
                    *range(534, 538),
                ]
            )
        elif i == 22:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                magenta if 420 <= tile and tile <= 453 else ""
            )
            rotate = 0.5
            skip_tiles = set(
                [
                    *range(55, 61),
                    *range(114, 120),
                    *range(173, 179),
                    *range(232, 238),
                    *range(291, 297),
                    *range(333, 350),
                    *range(406, 429),
                    *range(454, 470),
                    *range(517, 532),
                ]
            )
        elif i == 23:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                magenta if 429 <= tile and tile <= 464 else ""
            )
            rotate = 5.2
            skip_tiles = set(
                [
                    *range(338, 354),
                    *range(402, 439),
                    *range(465, 494),
                    *range(526, 540),
                    *range(568, 572),
                    *range(581, number_of_tiles),
                ]
            )
        elif i == 24:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                magenta if 429 <= tile and tile <= 472 else ""
            )
            rotate = 11.3
            skip_tiles = set(
                [
                    *range(3, 8),
                    *range(106, 109),
                    *range(170, 173),
                    *range(339, 355),
                    *range(407, 446),
                    *range(473, 512),
                    *range(533, 545),
                    *range(577, number_of_tiles),
                ]
            )
        elif i == 25:

            def callback(tile: int) -> str:
                if 401 <= tile and tile <= 405:
                    return rose
                elif 429 <= tile and tile <= 479:
                    return magenta
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 17.4
            skip_tiles = set(
                [
                    *range(198, 203),
                    *range(341, 356),
                    *range(406, 454),
                    *range(480, 529),
                    *range(546, 563),
                    *range(577, number_of_tiles),
                ]
            )
        elif i == 26:

            def callback(tile: int) -> str:
                if 398 <= tile and tile <= 405:
                    return rose
                elif 429 <= tile and tile <= 486:
                    return magenta
                else:
                    return ""

            fill_different_when = callback
            rotate = 23.1
            skip_tiles = set(
                [
                    *range(194, 200),
                    *range(230, 233),
                    *range(341, 357),
                    *range(406, 460),
                    *range(487, 544),
                    *range(564, number_of_tiles),
                ]
            )
        elif i == 27:

            def callback(tile: int) -> str:
                if 398 <= tile and tile <= 405:
                    return rose
                elif 429 <= tile and tile <= 486:
                    return magenta
                else:
                    return ""

            fill_different_when = callback
            rotate = 24.9

            def callback(tile: int) -> str:
                if 398 <= tile and tile <= 417:
                    return rose
                elif 429 <= tile and tile <= 499:
                    return magenta
                else:
                    return ""

            fill_different_when = callback
            skip_tiles = set(
                [
                    *range(198, 203),
                    *range(349, 365),
                    *range(398, 405),
                    *range(418, 474),
                    *range(500, 566),
                    *range(589, number_of_tiles),
                ]
            )
        elif i == 28:

            def callback(tile: int) -> str:
                if 417 <= tile and tile <= 429:
                    return rose
                elif 485 <= tile and tile <= 511:
                    return magenta
                else:
                    return ""

            fill_different_when = callback
            rotate = 27.6
            skip_tiles = set(
                [
                    *range(15, 19),
                    *range(355, 371),
                    *range(401, 417),
                    *range(430, 485),
                    *range(512, 581),
                    *range(613, number_of_tiles),
                ]
            )
        elif i == 29:

            def callback(tile: int) -> str:
                if 485 <= tile and tile <= 521:
                    return magenta
                elif 428 <= tile and tile <= 604:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 30.6
            skip_tiles = set(
                [
                    *range(38, 40),
                    *range(56, 61),
                    *range(316, 319),
                    *range(366, 381),
                    *range(403, 428),
                    *range(441, 496),
                    *range(522, 598),
                    *range(632, number_of_tiles),
                ]
            )
        elif i == 30:

            def callback(tile: int) -> str:
                if 502 <= tile and tile <= 528:
                    return magenta
                elif 435 <= tile and tile <= 624:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 35.2
            skip_tiles = set(
                [
                    *range(25, 33),
                    *range(42, 54),
                    *range(236, 241),
                    *range(370, 381),
                    *range(402, 435),
                    *range(448, 502),
                    *range(529, 612),
                    *range(647, number_of_tiles),
                ]
            )
        elif i == 31:

            def callback(tile: int) -> str:
                if 517 <= tile and tile <= 542:
                    return magenta
                elif 450 <= tile and tile <= 649:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 36
            skip_tiles = set(
                [
                    *range(21, 34),
                    *range(36, 56),
                    *range(242, 249),
                    *range(375, 387),
                    *range(409, 450),
                    *range(463, 517),
                    *range(543, 630),
                    *range(650, 658),
                    *range(670, number_of_tiles),
                ]
            )
        elif i == 32:

            def callback(tile: int) -> str:
                if 532 <= tile and tile <= 558:
                    return magenta
                elif 466 <= tile and tile <= 662:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 36.55
            skip_tiles = set(
                [
                    *range(2, 5),
                    *range(17, 58),
                    *range(244, 257),
                    *range(291, 295),
                    *range(314, 397),
                    *range(417, 466),
                    *range(479, 532),
                    *range(559, 647),
                    *range(663, 683),
                    *range(689, number_of_tiles),
                ]
            )
        elif i == 33:

            def callback(tile: int) -> str:
                if 542 <= tile and tile <= 567:
                    return magenta
                elif 476 <= tile and tile <= 669:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 39.35
            skip_tiles = set(
                [
                    *range(8, 55),
                    *range(241, 259),
                    *range(303, 393),
                    *range(423, 476),
                    *range(489, 542),
                    *range(568, 655),
                    *range(670, number_of_tiles),
                ]
            )
        elif i == 34:

            def callback(tile: int) -> str:
                if 556 <= tile and tile <= 582:
                    return magenta
                elif 429 <= tile and tile <= 682:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 40
            skip_tiles = set(
                [
                    *range(4, 57),
                    *range(243, 266),
                    *range(302, 399),
                    *range(431, 491),
                    *range(503, 556),
                    *range(583, 668),
                    *range(683, number_of_tiles),
                ]
            )
        elif i == 35:

            def callback(tile: int) -> str:
                if 512 <= tile and tile <= 537:
                    return magenta
                elif 377 <= tile and tile <= 638:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 63.7
            skip_tiles = set(
                [
                    *range(141, 178),
                    *range(186, 205),
                    *range(209, 215),
                    *range(241, 347),
                    *range(381, 447),
                    *range(459, 512),
                    *range(538, 623),
                    *range(637, number_of_tiles),
                ]
            )
        elif i == 36:

            def callback(tile: int) -> str:
                if 510 <= tile and tile <= 536:
                    return magenta
                elif 371 <= tile and tile <= 640:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles -= 25
            rotate = 64.3
            skip_tiles = set(
                [
                    *range(131, 199),
                    *range(209, 214),
                    *range(233, 342),
                    *range(377, 448),
                    *range(460, 510),
                    *range(537, 617),
                    *range(631, number_of_tiles),
                ]
            )
        elif i == 37:

            def callback(tile: int) -> str:
                if 539 <= tile and tile <= 564:
                    return magenta
                elif 387 <= tile and tile <= 660:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 26
            rotate = 64.5
            skip_tiles = set(
                [
                    *range(138, 143),
                    *range(162, 167),
                    *range(191, 208),
                    *range(221, 227),
                    *range(238, 358),
                    *range(399, 475),
                    *range(487, 539),
                    *range(565, 648),
                    *range(661, number_of_tiles),
                ]
            )
        elif i == 38:

            def callback(tile: int) -> str:
                if 551 <= tile and tile <= 577:
                    return magenta
                elif 395 <= tile and tile <= 671:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 65.1
            skip_tiles = set(
                [
                    *range(140, 145),
                    *range(165, 170),
                    *range(226, 232),
                    *range(237, 370),
                    *range(386, 395),
                    *range(415, 488),
                    *range(500, 551),
                    *range(578, 659),
                    *range(672, number_of_tiles),
                ]
            )
        elif i == 39:

            def callback(tile: int) -> str:
                if 568 <= tile and tile <= 593:
                    return magenta
                elif 416 <= tile and tile <= 687:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 64.3
            skip_tiles = set(
                [
                    *range(33, 93),
                    *range(146, 151),
                    *range(236, 416),
                    *range(434, 505),
                    *range(517, 568),
                    *range(594, 675),
                    *range(688, number_of_tiles),
                ]
            )
        elif i == 40:

            def callback(tile: int) -> str:
                if 588 <= tile and tile <= 614:
                    return magenta
                elif 440 <= tile and tile <= 706:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 62.2
            skip_tiles = set(
                [
                    *range(24, 119),
                    *range(156, 161),
                    *range(249, 440),
                    *range(457, 526),
                    *range(537, 588),
                    *range(615, 694),
                    *range(707, number_of_tiles),
                ]
            )
        elif i == 41:

            def callback(tile: int) -> str:
                if 614 <= tile and tile <= 642:
                    return magenta
                elif 470 <= tile and tile <= 731:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 58.1
            skip_tiles = set(
                [
                    *range(29, 145),
                    *range(172, 177),
                    *range(268, 470),
                    *range(486, 552),
                    *range(564, 591),
                    *range(647, 720),
                    *range(732, number_of_tiles),
                ]
            )
        elif i == 42:

            def callback(tile: int) -> str:
                if 628 <= tile and tile <= 658:
                    return magenta
                elif 488 <= tile and tile <= 746:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 57.9
            skip_tiles = set(
                [
                    *range(26, 156),
                    *range(177, 182),
                    *range(194, 198),
                    *range(277, 488),
                    *range(503, 568),
                    *range(691, 735),
                    *range(747, number_of_tiles),
                ]
            )
        elif i == 43:

            def callback(tile: int) -> str:
                if 642 <= tile and tile <= 671:
                    return magenta
                elif 504 <= tile and tile <= 758:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 58.3
            skip_tiles = set(
                [
                    *range(16, 161),
                    *range(180, 185),
                    *range(196, 211),
                    *range(283, 504),
                    *range(519, 576),
                    *range(722, 747),
                    *range(759, number_of_tiles),
                ]
            )
        elif i == 44:

            def callback(tile: int) -> str:
                if 656 <= tile and tile <= 685:
                    return magenta
                elif 520 <= tile and tile <= 771:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 58.6
            skip_tiles = set(
                [
                    *range(15, 166),
                    *range(183, 188),
                    *range(200, 217),
                    *range(218, 221),
                    *range(289, 520),
                    *range(534, 577),
                    *range(749, 760),
                    *range(772, number_of_tiles),
                ]
            )
        elif i == 45:

            def callback(tile: int) -> str:
                if 669 <= tile and tile <= 698:
                    return magenta
                elif 535 <= tile and tile <= 785:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 59.2
            skip_tiles = set(
                [
                    *range(15, 169),
                    *range(186, 190),
                    *range(202, 234),
                    *range(241, 244),
                    *range(295, 535),
                    *range(549, 579),
                    *range(786, number_of_tiles),
                ]
            )
        elif i == 46:

            def callback(tile: int) -> str:
                if 801 <= tile and tile <= 802:
                    return cyan
                elif 682 <= tile and tile <= 712:
                    return magenta
                elif 550 <= tile and tile <= 800:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 59.5
            skip_tiles = set(
                [
                    *range(16, 172),
                    *range(189, 193),
                    *range(205, 251),
                    *range(302, 550),
                    *range(564, 582),
                    *range(803, number_of_tiles),
                ]
            )
        elif i == 47:

            def callback(tile: int) -> str:
                if 863 <= tile and tile <= 873:
                    return cyan
                elif 740 <= tile and tile <= 768:
                    return magenta
                elif 599 <= tile and tile <= 872:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 74
            rotate = 59.85
            skip_tiles = set(
                [
                    *range(10, 186),
                    *range(203, 208),
                    *range(221, 285),
                    *range(327, 599),
                    *range(614, 621),
                    *range(689, 740),
                    *range(769, 806),
                    *range(874, number_of_tiles),
                ]
            )
        elif i == 48:

            def callback(tile: int) -> str:
                if 647 <= tile and tile <= 658:
                    return cyan
                elif 532 <= tile and tile <= 558:
                    return magenta
                elif 401 <= tile and tile <= 646:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles -= 75
            rotate = 111.94
            skip_tiles = set(
                [
                    *range(16, 20),
                    *range(33, 98),
                    *range(135, 401),
                    *range(461, 471),
                    *range(484, 532),
                    *range(559, 612),
                    *range(659, number_of_tiles),
                ]
            )
        elif i == 49:

            def callback(tile: int) -> str:
                if 657 <= tile and tile <= 668:
                    return cyan
                elif 543 <= tile and tile <= 569:
                    return magenta
                elif 412 <= tile and tile <= 656:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 112.08
            skip_tiles = set(
                [
                    *range(16, 20),
                    *range(33, 107),
                    *range(139, 412),
                    *range(458, 482),
                    *range(495, 543),
                    *range(570, 639),
                    *range(669, number_of_tiles),
                ]
            )
        elif i == 50:

            def callback(tile: int) -> str:
                if 667 <= tile and tile <= 677:
                    return cyan
                elif 553 <= tile and tile <= 579:
                    return magenta
                elif 420 <= tile and tile <= 666:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 112.2
            skip_tiles = set(
                [
                    *range(16, 20),
                    *range(33, 126),
                    *range(142, 420),
                    *range(456, 493),
                    *range(506, 553),
                    *range(580, 650),
                    *range(678, number_of_tiles),
                ]
            )
        elif i == 51:

            def callback(tile: int) -> str:
                if 564 <= tile and tile <= 590:
                    return magenta
                elif 434 <= tile and tile <= 673:
                    return rose
                elif 424 <= tile and tile <= 687:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 112.3
            skip_tiles = set(
                [
                    *range(16, 20),
                    *range(34, 134),
                    *range(145, 424),
                    *range(456, 504),
                    *range(516, 564),
                    *range(591, 661),
                    *range(674, 684),
                    *range(688, number_of_tiles),
                ]
            )
        elif i == 52:

            def callback(tile: int) -> str:
                if 574 <= tile and tile <= 600:
                    return magenta
                elif 446 <= tile and tile <= 683:
                    return rose
                elif 424 <= tile and tile <= 445:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 112.55
            skip_tiles = set(
                [
                    *range(15, 20),
                    *range(33, 138),
                    *range(148, 431),
                    *range(461, 514),
                    *range(527, 574),
                    *range(601, 671),
                    *range(684, number_of_tiles),
                ]
            )
        elif i == 53:

            def callback(tile: int) -> str:
                if 591 <= tile and tile <= 617:
                    return magenta
                elif 463 <= tile and tile <= 698:
                    return rose
                elif 449 <= tile and tile <= 462:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 111.08
            skip_tiles = set(
                [
                    *range(21, 26),
                    *range(40, 148),
                    *range(158, 449),
                    *range(479, 531),
                    *range(544, 591),
                    *range(618, 687),
                    *range(699, number_of_tiles),
                ]
            )
        elif i == 54:

            def callback(tile: int) -> str:
                if 604 <= tile and tile <= 630:
                    return magenta
                elif 477 <= tile and tile <= 711:
                    return rose
                elif 464 <= tile and tile <= 476:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 110.46
            skip_tiles = set(
                [
                    *range(24, 29),
                    *range(43, 154),
                    *range(164, 464),
                    *range(493, 545),
                    *range(557, 604),
                    *range(631, 700),
                    *range(712, number_of_tiles),
                ]
            )
        elif i == 55:

            def callback(tile: int) -> str:
                if 612 <= tile and tile <= 638:
                    return magenta
                elif 489 <= tile and tile <= 718:
                    return rose
                elif 472 <= tile and tile <= 481:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 111.35
            skip_tiles = set(
                [
                    *range(40, 154),
                    *range(164, 472),
                    *range(482, 489),
                    *range(501, 553),
                    *range(565, 612),
                    *range(639, 707),
                    *range(719, number_of_tiles),
                ]
            )
        elif i == 56:

            def callback(tile: int) -> str:
                if 618 <= tile and tile <= 644:
                    return magenta
                elif 496 <= tile and tile <= 724:
                    return rose
                elif tile == 480:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 112.5
            skip_tiles = set(
                [
                    *range(36, 153),
                    *range(164, 480),
                    *range(481, 496),
                    *range(509, 559),
                    *range(572, 618),
                    *range(645, 713),
                    *range(725, number_of_tiles),
                ]
            )
        elif i == 57:

            def callback(tile: int) -> str:
                if 626 <= tile and tile <= 652:
                    return magenta
                elif 505 <= tile and tile <= 731:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 113.3
            skip_tiles = set(
                [
                    *range(33, 154),
                    *range(164, 505),
                    *range(517, 567),
                    *range(580, 626),
                    *range(653, 720),
                    *range(732, number_of_tiles),
                ]
            )
        elif i == 58:

            def callback(tile: int) -> str:
                if 632 <= tile and tile <= 658:
                    return magenta
                elif 512 <= tile and tile <= 737:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles -= 3
            rotate = 114.1
            skip_tiles = set(
                [
                    *range(33, 154),
                    *range(164, 512),
                    *range(524, 574),
                    *range(586, 632),
                    *range(659, 726),
                    *range(738, number_of_tiles),
                ]
            )
        elif i == 59:

            def callback(tile: int) -> str:
                if 640 <= tile and tile <= 666:
                    return magenta
                elif 520 <= tile and tile <= 746:
                    return rose
                elif 747 <= tile and tile <= 748:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 114.9
            skip_tiles = set(
                [
                    *range(46, 154),
                    *range(161, 520),
                    *range(532, 582),
                    *range(594, 640),
                    *range(667, 733),
                    *range(749, number_of_tiles),
                ]
            )
        elif i == 60:

            def callback(tile: int) -> str:
                if 649 <= tile and tile <= 675:
                    return magenta
                elif 530 <= tile and tile <= 755:
                    return rose
                elif 756 <= tile and tile <= 766:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 3
            rotate = 115.45
            skip_tiles = set(
                [
                    *range(50, 530),
                    *range(543, 591),
                    *range(604, 649),
                    *range(676, 742),
                    *range(767, number_of_tiles),
                ]
            )
        elif i == 61:

            def callback(tile: int) -> str:
                if 657 <= tile and tile <= 683:
                    return magenta
                elif 539 <= tile and tile <= 762:
                    return rose
                elif 763 <= tile and tile <= 773:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 116.3
            skip_tiles = set(
                [
                    *range(45, 539),
                    *range(551, 599),
                    *range(611, 657),
                    *range(684, 749),
                    *range(774, number_of_tiles),
                ]
            )
        elif i == 62:

            def callback(tile: int) -> str:
                if 664 <= tile and tile <= 690:
                    return magenta
                elif 547 <= tile and tile <= 769:
                    return rose
                elif 770 <= tile and tile <= 780:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 117
            skip_tiles = set(
                [
                    *range(40, 547),
                    *range(559, 607),
                    *range(619, 664),
                    *range(691, 756),
                    *range(781, number_of_tiles),
                ]
            )
        elif i == 63:

            def callback(tile: int) -> str:
                if 672 <= tile and tile <= 698:
                    return magenta
                elif 555 <= tile and tile <= 776:
                    return rose
                elif 777 <= tile and tile <= 787:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 117.7
            skip_tiles = set(
                [
                    *range(36, 555),
                    *range(567, 614),
                    *range(627, 672),
                    *range(699, 763),
                    *range(788, number_of_tiles),
                ]
            )
        elif i == 64:

            def callback(tile: int) -> str:
                if 680 <= tile and tile <= 706:
                    return magenta
                elif 564 <= tile and tile <= 782:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 118.15
            skip_tiles = set(
                [
                    *range(33, 564),
                    *range(576, 623),
                    *range(635, 680),
                    *range(707, 771),
                    *range(783, number_of_tiles),
                ]
            )
        elif i == 65:

            def callback(tile: int) -> str:
                if 688 <= tile and tile <= 714:
                    return magenta
                elif 573 <= tile and tile <= 788:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 118.8
            skip_tiles = set(
                [
                    *range(28, 573),
                    *range(584, 631),
                    *range(643, 688),
                    *range(715, 778),
                    *range(789, number_of_tiles),
                ]
            )
        elif i == 66:

            def callback(tile: int) -> str:
                if 695 <= tile and tile <= 721:
                    return magenta
                elif 581 <= tile and tile <= 795:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 119.43
            skip_tiles = set(
                [
                    *range(24, 581),
                    *range(592, 639),
                    *range(651, 695),
                    *range(722, 785),
                    *range(796, number_of_tiles),
                ]
            )
        elif i == 67:

            def callback(tile: int) -> str:
                if 703 <= tile and tile <= 729:
                    return magenta
                elif 589 <= tile and tile <= 803:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 120.03
            skip_tiles = set(
                [
                    *range(19, 589),
                    *range(601, 646),
                    *range(658, 703),
                    *range(730, 792),
                    *range(804, number_of_tiles),
                ]
            )
        elif i == 68:

            def callback(tile: int) -> str:
                if 711 <= tile and tile <= 737:
                    return magenta
                elif 598 <= tile and tile <= 811:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 120.53
            skip_tiles = set(
                [
                    *range(15, 598),
                    *range(610, 655),
                    *range(667, 711),
                    *range(738, 800),
                    *range(812, number_of_tiles),
                ]
            )
        elif i == 69:

            def callback(tile: int) -> str:
                if 719 <= tile and tile <= 745:
                    return magenta
                elif 606 <= tile and tile <= 818:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 121.1
            skip_tiles = set(
                [
                    *range(11, 606),
                    *range(618, 663),
                    *range(675, 719),
                    *range(746, 807),
                    *range(819, number_of_tiles),
                ]
            )
        elif i == 70:

            def callback(tile: int) -> str:
                if 726 <= tile and tile <= 752:
                    return magenta
                elif 614 <= tile and tile <= 827:
                    return rose
                elif 828 <= tile and tile <= 832:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 121.67
            skip_tiles = set(
                [
                    *range(6, 614),
                    *range(626, 670),
                    *range(683, 726),
                    *range(753, 814),
                    *range(833, number_of_tiles),
                ]
            )
        elif i == 71:

            def callback(tile: int) -> str:
                if 735 <= tile and tile <= 761:
                    return magenta
                elif 623 <= tile and tile <= 834:
                    return rose
                elif 835 <= tile and tile <= 847:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 122.04
            skip_tiles = set(
                [
                    *range(3, 623),
                    *range(635, 679),
                    *range(691, 735),
                    *range(762, 822),
                    *range(848, number_of_tiles),
                ]
            )
        elif i == 72:

            def callback(tile: int) -> str:
                if 112 <= tile and tile <= 138:
                    return magenta
                elif 0 <= tile and tile <= 211:
                    return rose
                elif 212 <= tile and tile <= 230:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 245.38
            skip_tiles = set(
                [
                    *range(13, 57),
                    *range(69, 112),
                    *range(139, 199),
                    *range(231, number_of_tiles),
                ]
            )
        elif i == 73:

            def callback(tile: int) -> str:
                if 119 <= tile and tile <= 145:
                    return magenta
                elif 7 <= tile and tile <= 215:
                    return rose
                elif 0 <= tile and tile <= 245:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 244.46
            skip_tiles = set(
                [
                    *range(20, 64),
                    *range(76, 119),
                    *range(146, 205),
                    *range(216, 220),
                    *range(246, number_of_tiles),
                ]
            )
        elif i == 74:

            def callback(tile: int) -> str:
                if 129 <= tile and tile <= 155:
                    return magenta
                elif 20 <= tile and tile <= 226:
                    return rose
                elif 0 <= tile and tile <= 262:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 242.8
            skip_tiles = set(
                [
                    *range(13, 20),
                    *range(31, 74),
                    *range(86, 129),
                    *range(156, 215),
                    *range(227, 240),
                    *range(263, number_of_tiles),
                ]
            )
        elif i == 75:

            def callback(tile: int) -> str:
                if 141 <= tile and tile <= 167:
                    return magenta
                elif 32 <= tile and tile <= 237:
                    return rose
                elif 0 <= tile and tile <= 280:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 241
            skip_tiles = set(
                [
                    *range(16, 32),
                    *range(43, 86),
                    *range(98, 141),
                    *range(168, 226),
                    *range(238, 261),
                    *range(281, number_of_tiles),
                ]
            )
        elif i == 76:

            def callback(tile: int) -> str:
                if 150 <= tile and tile <= 176:
                    return magenta
                elif 42 <= tile and tile <= 246:
                    return rose
                elif 0 <= tile and tile <= 296:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 239.6
            skip_tiles = set(
                [
                    *range(17, 42),
                    *range(53, 96),
                    *range(108, 150),
                    *range(177, 235),
                    *range(247, 280),
                    *range(297, number_of_tiles),
                ]
            )
        elif i == 77:

            def callback(tile: int) -> str:
                if 160 <= tile and tile <= 186:
                    return magenta
                elif 52 <= tile and tile <= 255:
                    return rose
                elif 0 <= tile and tile <= 311:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 238.25
            skip_tiles = set(
                [
                    *range(18, 52),
                    *range(63, 106),
                    *range(117, 160),
                    *range(187, 244),
                    *range(256, 299),
                    *range(312, number_of_tiles),
                ]
            )
        elif i == 78:

            def callback(tile: int) -> str:
                if 169 <= tile and tile <= 195:
                    return magenta
                elif 62 <= tile and tile <= 264:
                    return rose
                elif 0 <= tile and tile <= 322:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 236.95
            skip_tiles = set(
                [
                    *range(20, 62),
                    *range(73, 115),
                    *range(127, 169),
                    *range(196, 253),
                    *range(265, 317),
                    *range(323, number_of_tiles),
                ]
            )
        elif i == 79:

            def callback(tile: int) -> str:
                if 171 <= tile and tile <= 197:
                    return magenta
                elif 64 <= tile and tile <= 265:
                    return rose
                elif 0 <= tile and tile <= 12:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 237.08
            skip_tiles = set(
                [
                    *range(13, 64),
                    *range(75, 117),
                    *range(129, 171),
                    *range(198, 254),
                    *range(266, number_of_tiles),
                ]
            )
        elif i == 80:

            def callback(tile: int) -> str:
                if 170 <= tile and tile <= 197:
                    return magenta
                elif 64 <= tile and tile <= 264:
                    return rose
                elif 0 <= tile and tile <= 4:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 237.55
            skip_tiles = set(
                [
                    *range(5, 64),
                    *range(75, 117),
                    *range(128, 170),
                    *range(197, 253),
                    *range(265, number_of_tiles),
                ]
            )
        elif i == 81:

            def callback(tile: int) -> str:
                if 106 <= tile and tile <= 132:
                    return magenta
                elif 0 <= tile and tile <= 199:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 249.15
            skip_tiles = set(
                [
                    *range(11, 52),
                    *range(64, 106),
                    *range(133, 188),
                    *range(200, number_of_tiles),
                ]
            )
        elif i == 82:

            def callback(tile: int) -> str:
                if 105 <= tile and tile <= 131:
                    return magenta
                elif 0 <= tile and tile <= 198:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 249.5
            skip_tiles = set(
                [
                    *range(11, 52),
                    *range(64, 105),
                    *range(132, 187),
                    *range(199, number_of_tiles),
                ]
            )
        elif i == 83:

            def callback(tile: int) -> str:
                if 105 <= tile and tile <= 131:
                    return magenta
                elif 0 <= tile and tile <= 197:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 249.83
            skip_tiles = set(
                [
                    *range(11, 52),
                    *range(64, 105),
                    *range(132, 186),
                    *range(198, number_of_tiles),
                ]
            )
        elif i == 84:

            def callback(tile: int) -> str:
                if 104 <= tile and tile <= 131:
                    return magenta
                elif 0 <= tile and tile <= 197:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 250.14
            skip_tiles = set(
                [
                    *range(11, 52),
                    *range(63, 104),
                    *range(131, 185),
                    *range(197, number_of_tiles),
                ]
            )
        elif i == 85:

            def callback(tile: int) -> str:
                if 104 <= tile and tile <= 131:
                    return magenta
                elif 0 <= tile and tile <= 197:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 250.45
            skip_tiles = set(
                [
                    *range(11, 51),
                    *range(63, 104),
                    *range(131, 185),
                    *range(196, number_of_tiles),
                ]
            )
        elif i == 86:

            def callback(tile: int) -> str:
                if 103 <= tile and tile <= 129:
                    return magenta
                elif 0 <= tile and tile <= 197:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 250.75
            skip_tiles = set(
                [
                    *range(11, 51),
                    *range(63, 103),
                    *range(130, 184),
                    *range(195, number_of_tiles),
                ]
            )
        elif i == 87:

            def callback(tile: int) -> str:
                if 103 <= tile and tile <= 129:
                    return magenta
                elif 0 <= tile and tile <= 197:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 251.04
            skip_tiles = set(
                [
                    *range(11, 51),
                    *range(62, 103),
                    *range(130, 183),
                    *range(194, number_of_tiles),
                ]
            )
        elif i == 88:

            def callback(tile: int) -> str:
                if 102 <= tile and tile <= 128:
                    return magenta
                elif 0 <= tile and tile <= 197:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 251.35
            skip_tiles = set(
                [
                    *range(11, 50),
                    *range(62, 102),
                    *range(129, 182),
                    *range(193, number_of_tiles),
                ]
            )
        elif i == 89:

            def callback(tile: int) -> str:
                if 102 <= tile and tile <= 128:
                    return magenta
                elif 0 <= tile and tile <= 197:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 251.63
            skip_tiles = set(
                [
                    *range(11, 50),
                    *range(62, 102),
                    *range(129, 181),
                    *range(192, number_of_tiles),
                ]
            )
        elif i == 90:

            def callback(tile: int) -> str:
                if 101 <= tile and tile <= 127:
                    return magenta
                elif 0 <= tile and tile <= 197:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 2
            rotate = 251.93
            skip_tiles = set(
                [
                    *range(11, 50),
                    *range(61, 101),
                    *range(128, 180),
                    *range(191, number_of_tiles),
                ]
            )
        elif i == 91:

            def callback(tile: int) -> str:
                if 101 <= tile and tile <= 127:
                    return magenta
                elif 0 <= tile and tile <= 189:
                    return rose
                else:
                    return ""

            fill_different_when = callback
            rotate = 252.18
            skip_tiles = set(
                [
                    *range(11, 49),
                    *range(61, 101),
                    *range(128, 179),
                    *range(190, number_of_tiles),
                ]
            )
        elif i == 92:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                rose if 0 <= tile and tile <= 188 else ""
            )
            rotate = 252.45
            skip_tiles = set(
                [
                    *range(11, 41),
                    *range(66, 100),
                    *range(133, 178),
                    *range(189, number_of_tiles),
                ]
            )
        elif i == 93:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                rose if 0 <= tile and tile <= 187 else ""
            )
            rotate = 252.7
            skip_tiles = set(
                [
                    *range(12, 18),
                    *range(27, 33),
                    *range(42, 48),
                    *range(61, 67),
                    *range(77, 83),
                    *range(93, 99),
                    *range(127, 133),
                    *range(141, 147),
                    *range(156, 162),
                    *range(170, 176),
                    *range(188, number_of_tiles),
                ]
            )
        elif i == 94:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                rose if 0 <= tile and tile <= 187 else ""
            )
            rotate = 252.95
            skip_tiles = set(
                [
                    *range(187, number_of_tiles),
                ]
            )
        elif i == 95:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 185:
                    return rose
                elif tile >= 186:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 253.2
            skip_tiles = set(
                [
                    *range(186, 244),
                    *range(256, number_of_tiles),
                ]
            )
        elif i == 96:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 184:
                    return rose
                elif tile >= 185:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 253.45
            skip_tiles = set(
                [
                    *range(185, 242),
                    *range(269, number_of_tiles),
                ]
            )
        elif i == 97:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 185:
                    return rose
                elif tile >= 186:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 253.7
            skip_tiles = set(
                [
                    *range(203, 241),
                    *range(277, number_of_tiles),
                ]
            )
        elif i == 98:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 185:
                    return rose
                elif tile >= 186:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 253.94
            skip_tiles = set(
                [
                    *range(227, 239),
                    *range(277, number_of_tiles),
                ]
            )
        elif i == 99:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 183:
                    return rose
                elif tile >= 184:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 254.15
            skip_tiles = set(
                [
                    *range(276, number_of_tiles),
                ]
            )
        elif i == 100:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 183:
                    return rose
                elif tile >= 184:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 254.24
            skip_tiles = set(
                [
                    *range(277, number_of_tiles),
                ]
            )
        elif i == 101:

            def callback(tile: int) -> str:
                if 9 <= tile and tile <= 193:
                    return rose
                elif tile >= 0:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 253.05
            skip_tiles = set(
                [
                    *range(286, number_of_tiles),
                ]
            )
        elif i == 102:

            def callback(tile: int) -> str:
                if 28 <= tile and tile <= 212:
                    return rose
                elif tile >= 0:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 250.53
            skip_tiles = set(
                [
                    *range(305, number_of_tiles),
                ]
            )
        elif i == 103:

            def callback(tile: int) -> str:
                if 48 <= tile and tile <= 230:
                    return rose
                elif tile >= 0:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 248.17
            skip_tiles = set(
                [
                    *range(324, number_of_tiles),
                ]
            )
        elif i == 104:

            def callback(tile: int) -> str:
                if 64 <= tile and tile <= 244:
                    return rose
                elif tile >= 0:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 246.28
            skip_tiles = set(
                [
                    *range(339, number_of_tiles),
                ]
            )
        elif i == 105:

            def callback(tile: int) -> str:
                if 78 <= tile and tile <= 258:
                    return rose
                elif tile >= 0:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 244.54
            skip_tiles = set(
                [
                    *range(180, 195),
                    *range(355, 363),
                    *range(370, number_of_tiles),
                ]
            )
        elif i == 106:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 93:
                    return cyan
                elif 94 <= tile and tile <= 172:
                    return rose
                elif 233 <= tile and tile <= 273:
                    return rose
                elif tile >= 274:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 242.71
            skip_tiles = set(
                [
                    *range(123, 148),
                    *range(191, 216),
                    *range(406, number_of_tiles),
                ]
            )
        elif i == 107:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 92:
                    return cyan
                elif 93 <= tile and tile <= 98:
                    return rose
                elif 259 <= tile and tile <= 270:
                    return rose
                elif tile >= 274:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 243.16
            skip_tiles = set(
                [
                    *range(99, 147),
                    *range(153, 159),
                    *range(164, 170),
                    *range(175, 181),
                    *range(186, 218),
                    *range(223, 229),
                    *range(235, 241),
                    *range(247, 253),
                    *range(260, 264),
                    *range(271, 283),
                    *range(425, number_of_tiles),
                ]
            )
        elif i == 108:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 78:
                    return cyan
                elif tile >= 300:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 243.6
            skip_tiles = set(
                [
                    *range(79, 146),
                    *range(183, 218),
                    *range(269, 300),
                    *range(425, number_of_tiles),
                ]
            )
        elif i == 109:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 61:
                    return cyan
                elif tile >= 315:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            number_of_tiles += 1
            rotate = 244.04
            skip_tiles = set(
                [
                    *range(62, 145),
                    *range(181, 217),
                    *range(267, 315),
                    *range(425, number_of_tiles),
                ]
            )
        elif i == 110:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 45:
                    return cyan
                elif tile >= 327:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 244.46
            skip_tiles = set(
                [
                    *range(46, 145),
                    *range(179, 216),
                    *range(265, 327),
                    *range(424, number_of_tiles),
                ]
            )
        elif i == 111:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 32:
                    return cyan
                elif tile >= 331:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 244.62
            skip_tiles = set(
                [
                    *range(33, 146),
                    *range(180, 215),
                    *range(265, 331),
                    *range(426, number_of_tiles),
                ]
            )
        elif i == 112:

            def callback(tile: int) -> str:
                if 0 <= tile and tile <= 19:
                    return cyan
                elif tile >= 331:
                    return cyan
                else:
                    return ""

            fill_different_when = callback
            rotate = 244.91
            skip_tiles = set(
                [
                    *range(20, 146),
                    *range(181, 214),
                    *range(265, 331),
                    *range(427, number_of_tiles),
                ]
            )
        elif i == 113:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                cyan if tile >= 183 else ""
            )
            rotate = 263.58
            skip_tiles = set(
                [
                    *range(37, 64),
                    *range(119, 183),
                    *range(119, 183),
                    *range(281, 2731),
                    *range(2739, number_of_tiles),
                ]
            )
        elif i == 114:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                cyan if tile >= 155 else ""
            )
            rotate = 263.7
            skip_tiles = set(
                [
                    *range(42, 57),
                    *range(119, 155),
                    *range(282, number_of_tiles),
                ]
            )
        elif i == 115:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                cyan if tile >= 151 else ""
            )
            number_of_tiles -= 99
            rotate = 263.73
            skip_tiles = set(
                [
                    *range(111, 151),
                    *range(273, number_of_tiles),
                ]
            )
        elif i == 116:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                cyan if tile >= 159 else ""
            )
            number_of_tiles += 99
            rotate = 263.56
            skip_tiles = set(
                [
                    *range(117, 159),
                    *range(286, number_of_tiles),
                ]
            )
        elif i == 117:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                cyan if tile >= 160 else ""
            )
            rotate = 263.56
            skip_tiles = set(
                [
                    *range(117, 160),
                    *range(288, number_of_tiles),
                ]
            )
        elif i == 118:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                cyan if tile >= 158 else ""
            )
            rotate = 264.03
            skip_tiles = set(
                [
                    *range(113, 158),
                    *range(286, number_of_tiles),
                ]
            )
        elif i == 119:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                cyan if tile >= 234 else ""
            )
            rotate = 264.13
            skip_tiles = set(
                [
                    *range(112, 234),
                    *range(286, number_of_tiles),
                ]
            )
        elif i == 120:
            fill_different_when: Callable[[int], str] | None = lambda tile: (
                cyan if tile >= 269 else ""
            )
            rotate = 264.24
            skip_tiles = set(
                [
                    *range(111, 269),
                    *range(287, number_of_tiles),
                ]
            )
        elif i == 121:
            rotate = 264.23
            skip_tiles = set(range(111, number_of_tiles))
        elif i == 122:
            rotate = 264.1
            skip_tiles = set(range(25, number_of_tiles))

        elements.append(
            draw_annular_tiles(
                center=(4512, 2287),
                inner_radius=radius,
                offset=offset,
                number_of_tiles=number_of_tiles,
                skip_tiles=skip_tiles,
                tile_angle=360 / number_of_tiles,
                rotate=rotate,
                fill=fill,
                fill_different_when=fill_different_when,
            )
        )

        radius += offset

    print(svg.svg(6901, 5139, elements))


if __name__ == "__main__":
    main()
