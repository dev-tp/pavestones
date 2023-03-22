import MarkerProps from '../types/MarkerProps';

export default function Marker(props: MarkerProps): JSX.Element {
  const backgroundColor = props.insertMode
    ? 'bg-yellow-500'
    : props.searchResult
    ? 'bg-blue-500'
    : 'bg-red-500';

  return (
    <div
      className={`absolute h-2 w-2 rounded-full ${backgroundColor}`}
      onClick={props.onClick}
      style={{ left: props.data.coordinate?.x, top: props.data.coordinate?.y }}
      title={props.data.dedicated_to}
    />
  );
}
