import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const SinglePostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex min-h-screen justify-center">
        <div>
          Post View
          <p>
            <strong>{id}</strong>
          </p>
        </div>
      </main>
    </>
  );
};

export default SinglePostPage;
