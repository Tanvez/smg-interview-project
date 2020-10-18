import { useRouter } from 'next/router';

export default function Media() {
  const router = useRouter();
  console.log(router.query);
  return <div>Media goes here</div>;
}
