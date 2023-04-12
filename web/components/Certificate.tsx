import React from 'react';

import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../constants';
import { PaveStoneProps } from '../types';

const MAP_WIDTH = '7.5in';
const MAP_HEIGHT = `calc((${IMAGE_HEIGHT} * ${MAP_WIDTH}) / ${IMAGE_WIDTH})`;

const MINI_MAP_HEIGHT = 275;
const MINI_MAP_WIDTH = 350;

const label: React.CSSProperties = {
  background: '#fff',
  fontSize: '0.8rem',
  left: '0.1rem',
  padding: '0.1rem',
  position: 'absolute',
  top: '0.1rem',
  zIndex: 1,
};

export default function Certificate({
  data,
}: {
  data: PaveStoneProps;
}): JSX.Element {
  function centerOnPoint(data: PaveStoneProps) {
    const x = `calc(-${data.coordinate?.x}px + ${MAP_WIDTH} * 0.5)`;
    const y = `calc(-${data.coordinate?.y}px + ${MAP_HEIGHT} * 0.5)`;

    return `translate(${x}, ${y})`;
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          height: '1in',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <img
          alt="Logo"
          src="/images/logo.png"
          style={{ height: '1in', width: '1in', position: 'absolute' }}
        />
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <p>Cathedral Pave Stone designated for:</p>
          <p>{data.dedicated_to}</p>
        </div>
      </div>
      <div
        style={{
          border: '1px solid',
          boxSizing: 'border-box',
          height: MAP_HEIGHT,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <span style={label}>Enlarged area</span>
        <div
          style={{
            backgroundImage: 'url(/images/cert-floor-plan.png)',
            height: IMAGE_HEIGHT,
            transform: centerOnPoint(data),
            transformOrigin: '0 0',
            width: IMAGE_WIDTH,
          }}
        >
          <div
            style={{
              background: '#f00',
              height: 4,
              left: data.coordinate?.x,
              position: 'absolute',
              top: data.coordinate?.y,
              width: 4,
            }}
          />
        </div>
        <div
          style={{
            backgroundImage: 'url(/images/mini-floor-plan.png)',
            borderLeft: '1px solid',
            borderTop: '1px solid',
            bottom: 0,
            height: MINI_MAP_HEIGHT,
            position: 'absolute',
            right: 0,
            width: MINI_MAP_WIDTH,
          }}
        >
          <span style={label}>Overall floor plan</span>
          <div
            style={{
              border: '1px solid #f00',
              height: 20,
              left: `calc(${(data.coordinate!.x / IMAGE_WIDTH) * 100}% - 12px)`,
              position: 'absolute',
              top: `calc(${(data.coordinate!.y / IMAGE_HEIGHT) * 100}% - 25px)`,
              width: 20,
            }}
          />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
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
        <ul style={{ columns: 2, listStyle: 'upper-latin' }}>
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
  );
}
