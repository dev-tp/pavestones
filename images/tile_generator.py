#!/usr/bin/python

import math
import svg


# https://stackoverflow.com/questions/11479185/svg-donut-slice-as-path-element-annular-sector
def annular_sector(
    center: tuple[int, int],
    start_angle: int,
    end_angle: int,
    inner_radius: int,
    outer_radius: int,
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
        ]
    )


def draw_annular_tiles(
    inner_radius: int = 50,
    offset: int = 50,
    center: tuple[int, int] = None,
    rotate: int = 0,
    number_of_tiles: int = 4,
    skip_tiles: set[int] = set([]),
    tile_angle: int = 90,
):
    outer_radius = inner_radius + offset

    if center is None:
        center = (outer_radius, outer_radius)

    elements = []

    for tile in range(number_of_tiles):
        if tile not in skip_tiles:
            elements.append(
                annular_sector(
                    center=center,
                    start_angle=tile_angle * tile,
                    end_angle=tile_angle * (tile + 1),
                    inner_radius=inner_radius,
                    outer_radius=outer_radius,
                )
            )

    return svg.g(
        style="fill-opacity: 0; stroke: #fff",
        transform=f"rotate({rotate}, {center[0]}, {center[1]})",
        elements=elements,
    )


def main():
    elements = [svg.image("cathedral-color.png")]

    number_of_tiles = 12
    radius = 35

    for i in range(123):
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
            skip_tiles = set(range(132, 149))
        elif i == 7:
            rotate = 0.8
            skip_tiles = set(range(142, 177))
        elif i == 8:
            rotate = 4
            skip_tiles = set(
                [
                    *range(18, 23),
                    *range(42, 47),
                    *range(66, 71),
                    *range(90, 95),
                    *range(114, 119),
                    *range(151, 201),
                    *range(233, 238),
                ]
            )
        elif i == 9:
            skip_tiles = set(range(165, 230))
        elif i == 10:
            rotate = 0.2
            skip_tiles = set(
                [
                    *range(177, 206),
                    *range(225, 252),
                ]
            )
        elif i == 11:
            rotate = 0.4
            skip_tiles = set(
                [
                    *range(154, 157),
                    *range(189, 212),
                    *range(257, 271),
                ]
            )
        elif i == 12:
            rotate = 0.7
            skip_tiles = set(
                [
                    *range(48, 51),
                    *range(167, 170),
                    *range(201, 222),
                    *range(278, 289),
                ]
            )
        elif i == 13:
            rotate = 0.9
            skip_tiles = set(
                [
                    *range(179, 182),
                    *range(212, 232),
                    *range(296, 309),
                ]
            )
        elif i == 14:
            skip_tiles = set(
                [
                    *range(226, 244),
                    *range(317, 334),
                    *range(362, 371),
                ]
            )
        elif i == 15:
            rotate = 1.1
            skip_tiles = set(
                [
                    *range(16, 21),
                    *range(58, 62),
                    *range(99, 104),
                    *range(141, 145),
                    *range(163, 165),
                    *range(182, 187),
                    *range(204, 206),
                    *range(240, 255),
                    *range(338, 357),
                    *range(374, 394),
                    *range(411, 413),
                ]
            )
        elif i == 16:
            number_of_tiles += 1
            rotate = 0.3
            skip_tiles = set(
                [
                    *range(259, 272),
                    *range(365, 384),
                    *range(391, 410),
                ]
            )
        elif i == 17:
            rotate = 0.4
            skip_tiles = set(
                [
                    *range(271, 288),
                    *range(390, 422),
                ]
            )
        elif i == 18:
            rotate = 0.6
            skip_tiles = set(
                [
                    *range(120, 122),
                    *range(283, 300),
                    *range(414, 437),
                    *range(455, 470),
                ]
            )
        elif i == 19:
            skip_tiles = set(
                [
                    *range(296, 313),
                    *range(440, 453),
                    *range(470, 492),
                ]
            )
        elif i == 20:
            rotate = 0.2
            skip_tiles = set(
                [
                    *range(309, 325),
                    *range(457, 469),
                    *range(485, 502),
                ]
            )
        elif i == 21:
            rotate = 0.3
            skip_tiles = set(
                [
                    *range(321, 337),
                    *range(478, 486),
                    *range(500, 516),
                    *range(534, 537),
                ]
            )
        elif i == 22:
            rotate = 0.5
            skip_tiles = set(
                [
                    *range(55, 60),
                    *range(114, 119),
                    *range(173, 178),
                    *range(232, 237),
                    *range(291, 296),
                    *range(333, 349),
                    *range(406, 428),
                    *range(454, 469),
                    *range(517, 531),
                ]
            )
        elif i == 23:
            rotate = 5.2
            skip_tiles = set(
                [
                    *range(338, 353),
                    *range(402, 438),
                    *range(465, 493),
                    *range(526, 539),
                    *range(568, 571),
                    *range(581, number_of_tiles),
                ]
            )
        elif i == 24:
            rotate = 11.3
            skip_tiles = set(
                [
                    *range(3, 7),
                    *range(106, 108),
                    *range(170, 172),
                    *range(339, 354),
                    *range(407, 445),
                    *range(473, 511),
                    *range(533, 544),
                    *range(577, number_of_tiles),
                ]
            )
        elif i == 25:
            number_of_tiles += 1
            rotate = 17.4
            skip_tiles = set(
                [
                    *range(198, 202),
                    *range(341, 355),
                    *range(406, 453),
                    *range(480, 528),
                    *range(546, 562),
                    *range(577, number_of_tiles),
                ]
            )
        elif i == 26:
            rotate = 23.1
            skip_tiles = set(
                [
                    *range(194, 199),
                    *range(230, 232),
                    *range(341, 356),
                    *range(406, 459),
                    *range(487, 543),
                    *range(564, number_of_tiles),
                ]
            )
        elif i == 27:
            rotate = 24.9
            skip_tiles = set(
                [
                    *range(198, 202),
                    *range(349, 364),
                    *range(398, 404),
                    *range(418, 473),
                    *range(500, 565),
                    *range(589, number_of_tiles),
                ]
            )
        elif i == 28:
            rotate = 27.6
            skip_tiles = set(
                [
                    *range(15, 18),
                    *range(355, 370),
                    *range(401, 416),
                    *range(430, 484),
                    *range(512, 580),
                    *range(613, number_of_tiles),
                ]
            )
        elif i == 29:
            rotate = 30.6
            skip_tiles = set(
                [
                    *range(38, 39),
                    *range(56, 60),
                    *range(316, 318),
                    *range(366, 380),
                    *range(403, 427),
                    *range(441, 495),
                    *range(522, 597),
                    *range(632, number_of_tiles),
                ]
            )
        elif i == 30:
            rotate = 35.2
            skip_tiles = set(
                [
                    *range(25, 32),
                    *range(42, 53),
                    *range(236, 240),
                    *range(370, 380),
                    *range(402, 434),
                    *range(448, 501),
                    *range(529, 611),
                    *range(647, number_of_tiles),
                ]
            )
        elif i == 31:
            rotate = 36
            skip_tiles = set(
                [
                    *range(21, 33),
                    *range(36, 55),
                    *range(242, 248),
                    *range(375, 386),
                    *range(409, 449),
                    *range(463, 516),
                    *range(543, 629),
                    *range(650, 657),
                    *range(670, number_of_tiles),
                ]
            )
        elif i == 32:
            number_of_tiles += 1
            rotate = 36.55
            skip_tiles = set(
                [
                    *range(2, 4),
                    *range(17, 57),
                    *range(244, 256),
                    *range(291, 294),
                    *range(314, 396),
                    *range(417, 465),
                    *range(479, 531),
                    *range(559, 646),
                    *range(663, 682),
                    *range(689, number_of_tiles),
                ]
            )
        elif i == 33:
            rotate = 39.35
            skip_tiles = set(
                [
                    *range(8, 54),
                    *range(241, 258),
                    *range(303, 392),
                    *range(423, 475),
                    *range(489, 541),
                    *range(568, 654),
                    *range(670, number_of_tiles),
                ]
            )
        elif i == 34:
            rotate = 40
            skip_tiles = set(
                [
                    *range(4, 56),
                    *range(243, 265),
                    *range(302, 398),
                    *range(431, 490),
                    *range(503, 555),
                    *range(583, 667),
                    *range(683, number_of_tiles),
                ]
            )
        elif i == 35:
            rotate = 63.7
            skip_tiles = set(
                [
                    *range(141, 177),
                    *range(186, 204),
                    *range(209, 214),
                    *range(241, 346),
                    *range(381, 446),
                    *range(459, 511),
                    *range(538, 622),
                    *range(637, number_of_tiles),
                ]
            )
        elif i == 36:
            number_of_tiles -= 25
            rotate = 64.3
            skip_tiles = set(
                [
                    *range(131, 198),
                    *range(209, 213),
                    *range(233, 341),
                    *range(377, 447),
                    *range(460, 509),
                    *range(537, 616),
                    *range(631, number_of_tiles),
                ]
            )
        elif i == 37:
            number_of_tiles += 26
            rotate = 64.5
            skip_tiles = set(
                [
                    *range(138, 142),
                    *range(162, 166),
                    *range(191, 207),
                    *range(221, 226),
                    *range(238, 357),
                    *range(399, 474),
                    *range(487, 538),
                    *range(565, 647),
                    *range(661, number_of_tiles),
                ]
            )
        elif i == 38:
            rotate = 65.1
            skip_tiles = set(
                [
                    *range(140, 144),
                    *range(165, 169),
                    *range(226, 231),
                    *range(237, 369),
                    *range(386, 394),
                    *range(415, 487),
                    *range(500, 550),
                    *range(578, 658),
                    *range(672, number_of_tiles),
                ]
            )
        elif i == 39:
            rotate = 64.3
            skip_tiles = set(
                [
                    *range(33, 92),
                    *range(146, 150),
                    *range(236, 415),
                    *range(434, 504),
                    *range(517, 567),
                    *range(594, 674),
                    *range(688, number_of_tiles),
                ]
            )
        elif i == 40:
            rotate = 62.2
            skip_tiles = set(
                [
                    *range(24, 118),
                    *range(156, 160),
                    *range(249, 439),
                    *range(457, 525),
                    *range(537, 587),
                    *range(615, 693),
                    *range(707, number_of_tiles),
                ]
            )
        elif i == 41:
            rotate = 58.1
            skip_tiles = set(
                [
                    *range(29, 144),
                    *range(172, 176),
                    *range(268, 469),
                    *range(486, 551),
                    *range(564, 590),
                    *range(647, 719),
                    *range(732, number_of_tiles),
                ]
            )
        elif i == 42:
            rotate = 57.9
            skip_tiles = set(
                [
                    *range(26, 155),
                    *range(177, 181),
                    *range(194, 197),
                    *range(277, 487),
                    *range(503, 567),
                    *range(691, 734),
                    *range(747, number_of_tiles),
                ]
            )
        elif i == 43:
            rotate = 58.3
            skip_tiles = set(
                [
                    *range(16, 160),
                    *range(180, 184),
                    *range(196, 210),
                    *range(283, 503),
                    *range(519, 575),
                    *range(722, 746),
                    *range(759, number_of_tiles),
                ]
            )
        elif i == 44:
            rotate = 58.6
            skip_tiles = set(
                [
                    *range(15, 165),
                    *range(183, 187),
                    *range(200, 216),
                    *range(218, 220),
                    *range(289, 519),
                    *range(534, 576),
                    *range(749, 759),
                    *range(772, number_of_tiles),
                ]
            )
        elif i == 45:
            number_of_tiles += 1
            rotate = 59.2
            skip_tiles = set(
                [
                    *range(15, 168),
                    *range(186, 189),
                    *range(202, 233),
                    *range(241, 243),
                    *range(295, 534),
                    *range(549, 578),
                    *range(786, number_of_tiles),
                ]
            )
        elif i == 46:
            rotate = 59.5
            skip_tiles = set(
                [
                    *range(16, 171),
                    *range(189, 192),
                    *range(205, 250),
                    *range(302, 549),
                    *range(564, 581),
                    *range(803, number_of_tiles),
                ]
            )
        elif i == 47:
            number_of_tiles += 74
            rotate = 59.85
            skip_tiles = set(
                [
                    *range(10, 185),
                    *range(203, 207),
                    *range(221, 284),
                    *range(327, 598),
                    *range(614, 620),
                    *range(689, 739),
                    *range(769, 805),
                    *range(874, number_of_tiles),
                ]
            )
        elif i == 48:
            number_of_tiles -= 75
            rotate = 111.94
            skip_tiles = set(
                [
                    *range(16, 19),
                    *range(33, 97),
                    *range(135, 400),
                    *range(461, 470),
                    *range(484, 531),
                    *range(559, 611),
                    *range(659, number_of_tiles),
                ]
            )
        elif i == 49:
            number_of_tiles += 1
            rotate = 112.08
            skip_tiles = set(
                [
                    *range(16, 19),
                    *range(33, 106),
                    *range(139, 411),
                    *range(458, 481),
                    *range(495, 542),
                    *range(570, 638),
                    *range(669, number_of_tiles),
                ]
            )
        elif i == 50:
            rotate = 112.2
            skip_tiles = set(
                [
                    *range(16, 19),
                    *range(33, 125),
                    *range(142, 419),
                    *range(456, 492),
                    *range(506, 552),
                    *range(580, 649),
                    *range(678, number_of_tiles),
                ]
            )
        elif i == 51:
            rotate = 112.3
            skip_tiles = set(
                [
                    *range(16, 19),
                    *range(34, 133),
                    *range(145, 423),
                    *range(456, 503),
                    *range(516, 563),
                    *range(591, 660),
                    *range(674, 683),
                    *range(688, number_of_tiles),
                ]
            )
        elif i == 52:
            number_of_tiles += 1
            rotate = 112.55
            skip_tiles = set(
                [
                    *range(15, 19),
                    *range(33, 137),
                    *range(148, 430),
                    *range(461, 513),
                    *range(527, 573),
                    *range(601, 670),
                    *range(684, number_of_tiles),
                ]
            )
        elif i == 53:
            rotate = 111.08
            skip_tiles = set(
                [
                    *range(21, 25),
                    *range(40, 147),
                    *range(158, 448),
                    *range(479, 530),
                    *range(544, 590),
                    *range(618, 686),
                    *range(699, number_of_tiles),
                ]
            )
        elif i == 54:
            rotate = 110.46
            skip_tiles = set(
                [
                    *range(24, 28),
                    *range(43, 153),
                    *range(164, 463),
                    *range(493, 544),
                    *range(557, 603),
                    *range(631, 699),
                    *range(712, number_of_tiles),
                ]
            )
        elif i == 55:
            rotate = 111.35
            skip_tiles = set(
                [
                    *range(40, 153),
                    *range(164, 471),
                    *range(482, 488),
                    *range(501, 552),
                    *range(565, 611),
                    *range(639, 706),
                    *range(719, number_of_tiles),
                ]
            )
        elif i == 56:
            rotate = 112.5
            skip_tiles = set(
                [
                    *range(36, 152),
                    *range(164, 479),
                    *range(481, 495),
                    *range(509, 558),
                    *range(572, 617),
                    *range(645, 712),
                    *range(725, number_of_tiles),
                ]
            )
        elif i == 57:
            rotate = 113.3
            skip_tiles = set(
                [
                    *range(33, 153),
                    *range(164, 504),
                    *range(517, 566),
                    *range(580, 625),
                    *range(653, 719),
                    *range(732, number_of_tiles),
                ]
            )
        elif i == 58:
            number_of_tiles -= 3
            rotate = 114.1
            skip_tiles = set(
                [
                    *range(33, 153),
                    *range(164, 511),
                    *range(524, 573),
                    *range(586, 631),
                    *range(659, 725),
                    *range(738, number_of_tiles),
                ]
            )
        elif i == 59:
            rotate = 114.9
            skip_tiles = set(
                [
                    *range(46, 153),
                    *range(161, 519),
                    *range(532, 581),
                    *range(594, 639),
                    *range(667, 732),
                    *range(749, number_of_tiles),
                ]
            )
        elif i == 60:
            number_of_tiles += 3
            rotate = 115.45
            skip_tiles = set(
                [
                    *range(50, 529),
                    *range(543, 590),
                    *range(604, 648),
                    *range(676, 741),
                    *range(767, number_of_tiles),
                ]
            )
        elif i == 61:
            number_of_tiles += 1
            rotate = 116.3
            skip_tiles = set(
                [
                    *range(45, 538),
                    *range(551, 598),
                    *range(611, 656),
                    *range(684, 748),
                    *range(774, number_of_tiles),
                ]
            )
        elif i == 62:
            rotate = 117
            skip_tiles = set(
                [
                    *range(40, 546),
                    *range(559, 606),
                    *range(619, 663),
                    *range(691, 755),
                    *range(781, number_of_tiles),
                ]
            )
        elif i == 63:
            rotate = 117.7
            skip_tiles = set(
                [
                    *range(36, 554),
                    *range(567, 613),
                    *range(627, 671),
                    *range(699, 762),
                    *range(788, number_of_tiles),
                ]
            )
        elif i == 64:
            rotate = 118.15
            skip_tiles = set(
                [
                    *range(33, 563),
                    *range(576, 622),
                    *range(635, 679),
                    *range(707, 770),
                    *range(783, number_of_tiles),
                ]
            )
        elif i == 65:
            rotate = 118.8
            skip_tiles = set(
                [
                    *range(28, 572),
                    *range(584, 630),
                    *range(643, 687),
                    *range(715, 777),
                    *range(789, number_of_tiles),
                ]
            )
        elif i == 66:
            rotate = 119.43
            skip_tiles = set(
                [
                    *range(24, 580),
                    *range(592, 638),
                    *range(651, 694),
                    *range(722, 784),
                    *range(796, number_of_tiles),
                ]
            )
        elif i == 67:
            rotate = 120.03
            skip_tiles = set(
                [
                    *range(19, 588),
                    *range(601, 645),
                    *range(658, 702),
                    *range(730, 791),
                    *range(804, number_of_tiles),
                ]
            )
        elif i == 68:
            number_of_tiles += 1
            rotate = 120.53
            skip_tiles = set(
                [
                    *range(15, 597),
                    *range(610, 654),
                    *range(667, 710),
                    *range(738, 799),
                    *range(812, number_of_tiles),
                ]
            )
        elif i == 69:
            rotate = 121.1
            skip_tiles = set(
                [
                    *range(11, 605),
                    *range(618, 662),
                    *range(675, 718),
                    *range(746, 806),
                    *range(819, number_of_tiles),
                ]
            )
        elif i == 70:
            rotate = 121.67
            skip_tiles = set(
                [
                    *range(6, 613),
                    *range(626, 669),
                    *range(683, 725),
                    *range(753, 813),
                    *range(833, number_of_tiles),
                ]
            )
        elif i == 71:
            rotate = 122.04
            skip_tiles = set(
                [
                    *range(3, 622),
                    *range(635, 678),
                    *range(691, 734),
                    *range(762, 821),
                    *range(848, number_of_tiles),
                ]
            )
        elif i == 72:
            rotate = 245.38
            skip_tiles = set(
                [
                    *range(13, 56),
                    *range(69, 111),
                    *range(139, 198),
                    *range(231, number_of_tiles),
                ]
            )
        elif i == 73:
            rotate = 244.46
            skip_tiles = set(
                [
                    *range(20, 63),
                    *range(76, 118),
                    *range(146, 204),
                    *range(216, 219),
                    *range(246, number_of_tiles),
                ]
            )
        elif i == 74:
            rotate = 242.8
            skip_tiles = set(
                [
                    *range(13, 19),
                    *range(31, 73),
                    *range(86, 128),
                    *range(156, 214),
                    *range(227, 239),
                    *range(263, number_of_tiles),
                ]
            )
        elif i == 75:
            rotate = 241
            skip_tiles = set(
                [
                    *range(16, 31),
                    *range(43, 85),
                    *range(98, 140),
                    *range(168, 225),
                    *range(238, 260),
                    *range(281, number_of_tiles),
                ]
            )
        elif i == 76:
            rotate = 239.6
            skip_tiles = set(
                [
                    *range(17, 41),
                    *range(53, 95),
                    *range(108, 149),
                    *range(177, 234),
                    *range(247, 279),
                    *range(297, number_of_tiles),
                ]
            )
        elif i == 77:
            rotate = 238.25
            skip_tiles = set(
                [
                    *range(18, 51),
                    *range(63, 105),
                    *range(117, 159),
                    *range(187, 243),
                    *range(256, 298),
                    *range(312, number_of_tiles),
                ]
            )
        elif i == 78:
            rotate = 236.95
            skip_tiles = set(
                [
                    *range(20, 61),
                    *range(73, 114),
                    *range(127, 168),
                    *range(196, 252),
                    *range(265, 316),
                    *range(323, number_of_tiles),
                ]
            )
        elif i == 79:
            rotate = 237.08
            skip_tiles = set(
                [
                    *range(13, 63),
                    *range(75, 116),
                    *range(129, 170),
                    *range(198, 253),
                    *range(266, number_of_tiles),
                ]
            )
        elif i == 80:
            rotate = 237.55
            skip_tiles = set(
                [
                    *range(6, 63),
                    *range(75, 116),
                    *range(128, 169),
                    *range(197, 252),
                    *range(265, number_of_tiles),
                ]
            )
        elif i == 81:
            rotate = 249.15
            skip_tiles = set(
                [
                    *range(11, 51),
                    *range(64, 105),
                    *range(133, 187),
                    *range(200, number_of_tiles),
                ]
            )
        elif i == 82:
            rotate = 249.5
            skip_tiles = set(
                [
                    *range(11, 51),
                    *range(64, 104),
                    *range(132, 186),
                    *range(199, number_of_tiles),
                ]
            )
        elif i == 83:
            rotate = 249.83
            skip_tiles = set(
                [
                    *range(11, 51),
                    *range(64, 104),
                    *range(132, 185),
                    *range(198, number_of_tiles),
                ]
            )
        elif i == 84:
            rotate = 250.14
            skip_tiles = set(
                [
                    *range(11, 51),
                    *range(63, 103),
                    *range(131, 184),
                    *range(197, number_of_tiles),
                ]
            )
        elif i == 85:
            rotate = 250.45
            skip_tiles = set(
                [
                    *range(11, 50),
                    *range(63, 103),
                    *range(131, 184),
                    *range(196, number_of_tiles),
                ]
            )
        elif i == 86:
            rotate = 250.75
            skip_tiles = set(
                [
                    *range(11, 50),
                    *range(63, 102),
                    *range(130, 183),
                    *range(195, number_of_tiles),
                ]
            )
        elif i == 87:
            rotate = 251.04
            skip_tiles = set(
                [
                    *range(11, 50),
                    *range(62, 102),
                    *range(130, 182),
                    *range(194, number_of_tiles),
                ]
            )
        elif i == 88:
            rotate = 251.35
            skip_tiles = set(
                [
                    *range(11, 49),
                    *range(62, 101),
                    *range(129, 181),
                    *range(193, number_of_tiles),
                ]
            )
        elif i == 89:
            rotate = 251.63
            skip_tiles = set(
                [
                    *range(11, 49),
                    *range(62, 101),
                    *range(129, 180),
                    *range(192, number_of_tiles),
                ]
            )
        elif i == 90:
            number_of_tiles += 2
            rotate = 251.93
            skip_tiles = set(
                [
                    *range(11, 49),
                    *range(61, 100),
                    *range(128, 179),
                    *range(191, number_of_tiles),
                ]
            )
        elif i == 91:
            rotate = 252.18
            skip_tiles = set(
                [
                    *range(11, 48),
                    *range(61, 100),
                    *range(128, 178),
                    *range(190, number_of_tiles),
                ]
            )
        elif i == 92:
            rotate = 252.45
            skip_tiles = set(
                [
                    *range(11, 40),
                    *range(66, 99),
                    *range(133, 177),
                    *range(189, number_of_tiles),
                ]
            )
        elif i == 93:
            rotate = 252.7
            skip_tiles = set(
                [
                    *range(12, 17),
                    *range(27, 32),
                    *range(42, 47),
                    *range(61, 66),
                    *range(77, 82),
                    *range(93, 98),
                    *range(127, 132),
                    *range(141, 146),
                    *range(156, 161),
                    *range(170, 175),
                    *range(188, number_of_tiles),
                ]
            )
        elif i == 94:
            rotate = 252.95
            skip_tiles = set(
                [
                    *range(187, number_of_tiles),
                ]
            )
        elif i == 95:
            rotate = 253.2
            skip_tiles = set(
                [
                    *range(186, 243),
                    *range(256, number_of_tiles),
                ]
            )
        elif i == 96:
            rotate = 253.45
            skip_tiles = set(
                [
                    *range(185, 241),
                    *range(269, number_of_tiles),
                ]
            )
        elif i == 97:
            number_of_tiles += 1
            rotate = 253.7
            skip_tiles = set(
                [
                    *range(203, 240),
                    *range(277, number_of_tiles),
                ]
            )
        elif i == 98:
            rotate = 253.94
            skip_tiles = set(
                [
                    *range(227, 238),
                    *range(277, number_of_tiles),
                ]
            )
        elif i == 99:
            rotate = 254.15
            skip_tiles = set(
                [
                    *range(276, number_of_tiles),
                ]
            )
        elif i == 100:
            rotate = 254.24
            skip_tiles = set(
                [
                    *range(277, number_of_tiles),
                ]
            )
        elif i == 101:
            rotate = 253.05
            skip_tiles = set(
                [
                    *range(286, number_of_tiles),
                ]
            )
        elif i == 102:
            number_of_tiles += 1
            rotate = 250.53
            skip_tiles = set(
                [
                    *range(305, number_of_tiles),
                ]
            )
        elif i == 103:
            rotate = 248.17
            skip_tiles = set(
                [
                    *range(324, number_of_tiles),
                ]
            )
        elif i == 104:
            rotate = 246.28
            skip_tiles = set(
                [
                    *range(339, number_of_tiles),
                ]
            )
        elif i == 105:
            rotate = 244.54
            skip_tiles = set(
                [
                    *range(180, 194),
                    *range(355, 362),
                    *range(370, number_of_tiles),
                ]
            )
        elif i == 106:
            rotate = 242.71
            skip_tiles = set(
                [
                    *range(123, 147),
                    *range(191, 215),
                    *range(406, number_of_tiles),
                ]
            )
        elif i == 107:
            rotate = 243.16
            skip_tiles = set(
                [
                    *range(99, 146),
                    *range(153, 158),
                    *range(164, 169),
                    *range(175, 180),
                    *range(186, 217),
                    *range(223, 228),
                    *range(235, 240),
                    *range(247, 252),
                    *range(260, 263),
                    *range(271, 282),
                    *range(425, number_of_tiles),
                ]
            )
        elif i == 108:
            rotate = 243.6
            skip_tiles = set(
                [
                    *range(79, 145),
                    *range(183, 217),
                    *range(269, 299),
                    *range(425, number_of_tiles),
                ]
            )
        elif i == 109:
            number_of_tiles += 1
            rotate = 244.04
            skip_tiles = set(
                [
                    *range(62, 144),
                    *range(181, 216),
                    *range(267, 314),
                    *range(425, number_of_tiles),
                ]
            )
        elif i == 110:
            rotate = 244.46
            skip_tiles = set(
                [
                    *range(46, 144),
                    *range(179, 215),
                    *range(265, 326),
                    *range(424, number_of_tiles),
                ]
            )
        elif i == 111:
            rotate = 244.62
            skip_tiles = set(
                [
                    *range(33, 145),
                    *range(180, 214),
                    *range(265, 330),
                    *range(426, number_of_tiles),
                ]
            )
        elif i == 112:
            rotate = 244.91
            skip_tiles = set(
                [
                    *range(20, 145),
                    *range(181, 213),
                    *range(265, 330),
                    *range(427, number_of_tiles),
                ]
            )
        elif i == 113:
            rotate = 263.58
            skip_tiles = set(
                [
                    *range(37, 63),
                    *range(119, 182),
                    *range(119, 182),
                    *range(281, 2730),
                    *range(2739, number_of_tiles),
                ]
            )
        elif i == 114:
            rotate = 263.7
            skip_tiles = set(
                [
                    *range(42, 56),
                    *range(119, 154),
                    *range(282, number_of_tiles),
                ]
            )
        elif i == 115:
            number_of_tiles -= 99
            rotate = 263.73
            skip_tiles = set(
                [
                    *range(111, 150),
                    *range(273, number_of_tiles),
                ]
            )
        elif i == 116:
            number_of_tiles += 99
            rotate = 263.56
            skip_tiles = set(
                [
                    *range(117, 158),
                    *range(286, number_of_tiles),
                ]
            )
        elif i == 117:
            rotate = 263.56
            skip_tiles = set(
                [
                    *range(117, 159),
                    *range(288, number_of_tiles),
                ]
            )
        elif i == 118:
            rotate = 264.03
            skip_tiles = set(
                [
                    *range(113, 157),
                    *range(286, number_of_tiles),
                ]
            )
        elif i == 119:
            rotate = 264.13
            skip_tiles = set(
                [
                    *range(112, 233),
                    *range(286, number_of_tiles),
                ]
            )
        elif i == 120:
            rotate = 264.24
            skip_tiles = set(
                [
                    *range(111, 268),
                    *range(287, number_of_tiles),
                ]
            )
        elif i == 121:
            rotate = 264.23
            skip_tiles = set(
                [
                    *range(111, number_of_tiles),
                ]
            )
        elif i == 122:
            rotate = 264.1
            skip_tiles = set(
                [
                    *range(25, number_of_tiles),
                ]
            )

        elements.append(
            draw_annular_tiles(
                center=(4512, 2287),
                inner_radius=radius,
                offset=offset,
                number_of_tiles=number_of_tiles,
                skip_tiles=skip_tiles,
                tile_angle=360 / number_of_tiles,
                rotate=rotate,
            )
        )

        radius += offset

    print(svg.svg(7000, 5500, elements))


if __name__ == "__main__":
    main()
