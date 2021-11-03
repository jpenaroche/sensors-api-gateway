export default async (container, payload) => {
  const bull = container.get('Queue');
  await bull.add(payload);
};
