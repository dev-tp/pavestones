import React from 'react';

import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { MapProps } from '../types';

let instance: HTMLDivElement | null;

export default function Map(props: MapProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);

  const lastCoordinate = { x: 0, y: 0 };
  const offset = { x: 0, y: 0 };
  const point = { x: 0, y: 0 };

  let isPanning = false;
  let scale = 1;

  function setTransform() {
    if (instance) {
      instance.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(${scale})`;
    }
  }

  React.useEffect(() => {
    if (!props.x || !props.y) {
      return;
    }

    if (props.x === lastCoordinate.x && props.y === lastCoordinate.y) {
      return;
    }

    scale = 2.5;

    // `props.coordinate` must be positive
    offset.x = -props.x * scale + window.innerWidth / 2;
    offset.y = -props.y * scale + window.innerHeight / 2;

    lastCoordinate.x = props.x;
    lastCoordinate.y = props.y;

    setTransform();
  }, [props.x, props.y]);

  React.useEffect(() => {
    instance = ref.current;

    scale = window.innerWidth / IMAGE_WIDTH;
    setTransform();

    function onMouseDown(event: MouseEvent) {
      point.x = event.clientX - offset.x;
      point.y = event.clientY - offset.y;

      isPanning = true;
    }

    function onMouseMove(event: MouseEvent) {
      event.preventDefault();

      if (!isPanning) {
        return;
      }

      offset.x = event.clientX - point.x;
      offset.y = event.clientY - point.y;

      setTransform();
    }

    function onMouseUp() {
      isPanning = false;
    }

    function onWheel(event: WheelEvent) {
      // Unable to process `preventDefault` while passive is enabled.
      // event.preventDefault();

      const x = (event.clientX - offset.x) / scale;
      const y = (event.clientY - offset.y) / scale;

      -event.deltaY > 0 ? (scale *= 1.1) : (scale /= 1.1);

      offset.x = event.clientX - x * scale;
      offset.y = event.clientY - y * scale;

      setTransform();
    }

    instance?.addEventListener('mousedown', onMouseDown, false);
    instance?.addEventListener('mousemove', onMouseMove, false);
    instance?.addEventListener('mouseup', onMouseUp, false);
    instance?.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      instance?.removeEventListener('mousedown', onMouseDown, false);
      instance?.removeEventListener('mousemove', onMouseMove, false);
      instance?.removeEventListener('mouseup', onMouseUp, false);
      instance?.removeEventListener('wheel', onWheel, false);
    };
  }, [ref]);

  return (
    <div ref={ref} style={{ transformOrigin: '0 0' }}>
      <div
        onClick={props.onClick}
        style={{
          background: 'url(/images/floor-plan.png)',
          height: IMAGE_HEIGHT,
          width: IMAGE_WIDTH,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
