export default function Marker(props) {
  return (
    <div
      style={{
        background: '#f00',
        borderRadius: '50%',
        height: 6,
        left: props.x,
        position: 'absolute',
        top: props.y,
        width: 6,
      }}
    />
  );
}
