export default function handler(_, response) {
  response.status(200).json({ message: 'Hello, World!' });
}
