import React from 'react';

export default function Map(props) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const offset = { x: 0, y: 0 };
    const point = { x: 0, y: 0 };

    let isPanning = false;
    let scale = 1;

    function onMouseDown(event) {
      point.x = event.clientX - offset.x;
      point.y = event.clientY - offset.y;

      isPanning = true;
    }

    function onMouseMove(event) {
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

    function onWheel(event) {
      event.preventDefault();

      const x = (event.clientX - offset.x) / scale;
      const y = (event.clientY - offset.y) / scale;

      const delta = event.wheelDelta ? event.wheelDelta : -event.deltaY;

      delta > 0 ? (scale *= 1.1) : (scale /= 1.1);

      offset.x = event.clientX - x * scale;
      offset.y = event.clientY - y * scale;

      setTransform();
    }

    function setTransform() {
      ref.current.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(${scale})`;
    }

    ref.current.addEventListener('mousedown', onMouseDown, false);
    ref.current.addEventListener('mousemove', onMouseMove, false);
    ref.current.addEventListener('mouseup', onMouseUp, false);
    ref.current.addEventListener('wheel', onWheel, false);

    return () => {
      ref.current.removeEventListener('mousedown', onMouseDown, false);
      ref.current.removeEventListener('mousemove', onMouseMove, false);
      ref.current.removeEventListener('mouseup', onMouseUp, false);
      ref.current.removeEventListener('wheel', onWheel, false);
    };
  }, [ref]);

  return (
    <div ref={ref} style={{ transformOrigin: '0 0' }}>
      <div
        onClick={props.onClick}
        style={{
          background: 'url(/images/floor-plan.png)',
          height: 5500,
          width: 7000,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
