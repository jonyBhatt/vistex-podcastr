const Podcast = ({ params }: { params: { podcast: string } }) => {
  const { podcast } = params;
  return <div>Podcast for {podcast}</div>;
};
export default Podcast;
