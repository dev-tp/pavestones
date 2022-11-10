import MarkerProps from '../types/MarkerProps';

import style from '../styles/Marker.module.css';

export default function Marker(props: MarkerProps): JSX.Element {
  const classNames = [style.root];

  if (props.insertMode) {
    classNames.push(style.modifiable);
  }

  if (props.searchResult) {
    classNames.push(style.searchResult);
  }

  return (
    <div
      className={classNames.join(' ')}
      onClick={props.onClick}
      style={{ left: props.data.coordinate?.x, top: props.data.coordinate?.y }}
      title={props.data.dedicated_to}
    />
  );
}
