import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import CircularProgress from '@material-ui/core/CircularProgress';
import getMedia from './api/media';
import Layout from '../components/layout';

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
  if (!data)
    return (
      <Layout>
        <CircularProgress disableShrink size="4rem" />
      </Layout>
    );

  return (
    <Layout>
      <NextSeo
        openGraph={{
          type: data.type,
          url: window.location.href,
          title: data.name,
          description: data.name,
        }}
      />
      <iframe title={data.title} src={data.url} width="500px" height="500px" />
    </Layout>
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
