import { DEFAULT_PAPER_WIDTH, IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';

import styles from '../styles/Certificate.module.css';

const MAP_WIDTH = DEFAULT_PAPER_WIDTH;
const MAP_HEIGHT = `calc(${IMAGE_HEIGHT} * ${MAP_WIDTH} / ${IMAGE_WIDTH})`;

const MINI_MAP_WIDTH = 360;
const MINI_MAP_HEIGHT = (IMAGE_HEIGHT * MINI_MAP_WIDTH) / IMAGE_WIDTH;

function centerMap(data) {
  if (data) {
    const x = `calc(-${data.x}px + ${MAP_WIDTH} * 0.5)`;
    const y = `calc(-${data.y}px + ${MAP_HEIGHT} * 0.5)`;

    return `translate(${x}, ${y})`;
  }

  return null;
}

export default function Certificate(props) {
  return (
    <div
      className={props.className}
      style={{ margin: 'auto', width: DEFAULT_PAPER_WIDTH }}
    >
      <div className={styles.header}>
        <img alt="Logo" className={styles.logo} src="/images/logo.png" />
        <p>Cathedral Pave Stone designated for:</p>
        <p>{props.data?.dedicated_to}</p>
      </div>
      <div className={styles.map} style={{ height: MAP_HEIGHT }}>
        <span className={styles.tip}>Enlarged area</span>
        <div
          style={{
            backgroundImage: 'url(/images/cert-floor-plan.png)',
            height: IMAGE_HEIGHT,
            transform: centerMap(props.data),
            transformOrigin: '0 0',
            width: IMAGE_WIDTH,
          }}
        >
          <div
            className={styles.marker}
            style={{ left: props.data?.x, top: props.data?.y }}
          />
        </div>
        <div
          className={styles.miniMap}
          style={{ height: MINI_MAP_HEIGHT, width: MINI_MAP_WIDTH }}
        >
          <span className={styles.tip}>Overall floor plan</span>
          <div
            style={{
              border: '1px solid #f00',
              height: 20,
              left: (props.data?.x / IMAGE_WIDTH) * MINI_MAP_WIDTH - 20 * 0.5,
              position: 'absolute',
              top: (props.data?.y / IMAGE_HEIGHT) * MINI_MAP_HEIGHT - 20 * 0.5,
              width: 20,
            }}
          />
        </div>
      </div>
      <div className={styles.twoColumnGrid}>
        <div>
          <p>
            Thank you for your gift to the Cathedral of Our Lady of the Angels.
            Your designated paving stone is an enduring symbol of faith and
            devotion. We sincerely appreciate your generosity and invite you to
            use this map of the Cathedral floor plan to locate your stone.
          </p>
          <p>
            Your stone is indicated by the red dot in the &quot;Enlarged
            Area.&quot; The image labeled &quot;Overall Plan&quot; shows the
            entire floor plan and the red rectangle indicated the area being
            enlarged.
          </p>
        </div>
        <div>
          <ul className={styles.twoColumnGrid}>
            <li>Grand Doors</li>
            <li>South Ambulatory</li>
            <li>Baptismal Font</li>
            <li>Main Aisle</li>
            <li>Altar</li>
            <li>Organ Chancel</li>
            <li>North Doors</li>
            <li>North Ambulatory</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
