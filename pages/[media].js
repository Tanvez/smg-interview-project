import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import getMedia from './api/media';

export default function Media({ id }) {
  const [data, setData] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    const response = async () => {
      const media = await getMedia(id);
      setData(media);
    };
    response();
  }, [id, router]);
  if (!data) return <div>Loading..</div>;
  return (
    <div>
      <iframe title={data.title} src={data.url} width="100%" height="500" />
    </div>
  );
}
// router.query.media is undefined on initial page load and cause errors
// get query params before the page loads - its a nextjs thing
export async function getServerSideProps(ctx) {
  const { media } = ctx.query;
  return {
    props: {
      id: media,
    },
  };
}
