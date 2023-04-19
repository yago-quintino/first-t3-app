import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  // const router = useRouter()
  // const {slug } = router.query

  const { data: user, isLoading } = api.profile.getUserByUsername.useQuery({
    username: "yago-quintino",
  });

  if (isLoading) return <LoadingSpinner size={40} />;

  if (!user) return <div>404</div>;

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="flex min-h-screen min-w-full flex-col items-center">
        <div className="self-start">
          <Image
            className="h-12 w-12 rounded-full"
            src={user.profileImageUrl}
            alt="Post user profile picture"
            width={48}
            height={48}
          />
          <p>{user.username}</p>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
