import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import { PostView } from "~/components/postView";
import { generateSSRHelper } from "~/server/helpers/serverSideHelpers";
import Head from "next/head";
import { PageLayout } from "~/components/layout";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const SinglePostPage: NextPage<PageProps> = ({ id }) => {
  const { data, isLoading } = api.posts.getSinglePostById.useQuery(
    {
      id,
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  if (isLoading) return <LoadingSpinner size={40} />;

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView author={data.author} key={data.post.id} post={data.post} />
      </PageLayout>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const helpers = generateSSRHelper();

  const postId = context.params?.id;

  if (typeof postId !== "string") throw new Error("No post id");

  await helpers.posts.getSinglePostById.prefetch({ id: postId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id: postId,
    },
  };
};

export default SinglePostPage;
