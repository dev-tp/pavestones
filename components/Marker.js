import style from '../styles/Marker.module.css';

export default function Marker(props) {
  const classNames = [style.root];

  if (props.insertMode) {
    classNames.push(style.modifiable);
  }

  return (
    <div
      className={classNames.join(' ')}
      style={{ left: props.x, top: props.y }}
    />
  );
}
