import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "../server/db";
import superjson from "superjson";
import { PageLayout } from "~/components/layout";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProfilePage: NextPage<PageProps> = ({ slug }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery(
    {
      username: slug,
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  if (isLoading) {
    console.log(slug);
    console.log("Is loading!!!");
    return <LoadingSpinner size={40} />;
  }
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 border-slate-400 bg-slate-600">
          <Image
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
            src={data.profileImageUrl}
            alt={`${data.username}'s profile picture`}
            width={128}
            height={128}
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl">{`@${data.username}`}</div>
        <div className="w-full border-b border-slate-400"></div>
      </PageLayout>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ slug: string }>
) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, //  optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("No slug");

  const safeSlug = slug.replace("@", "");

  await helpers.profile.getUserByUsername.prefetch({ username: safeSlug });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug: safeSlug,
    },
  };
};

export default ProfilePage;
