import style from '../styles/Marker.module.css';

export default function Marker(props) {
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
      style={{ left: props.data.x, top: props.data.y }}
      title={props.data.dedicated_to}
    />
  );
}
