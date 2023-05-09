import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageLayout } from "~/components/layout";

const SinglePostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <PageLayout>
        <div>
          Post View
          <p>
            <strong>{id}</strong>
          </p>
        </div>
      </PageLayout>
    </>
  );
};

export default SinglePostPage;
