import { type NextPage } from "next";
import { api } from "~/utils/api";
import { SignInButton, useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/PostView";

const CreatePostWizard = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      toast.success("Success to post!");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Fail to post!Please try again later");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex gap-3">
      <Image
        src={user.profileImageUrl}
        alt={`${user.username as string} profile image`}
        className="h-12 w-12 rounded-full"
        width={48}
        height={48}
      />
      <input
        type="text"
        placeholder="Type some emojis!"
        className="rounded-lg border bg-transparent px-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button
          className="rounded-sm bg-slate-100 p-2 text-black"
          type="submit"
          onClick={() => {
            mutate({ content: input });
          }}
        >
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={24} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: isPostsLoading } = api.posts.getAll.useQuery();

  if (isPostsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong!</div>;
  return (
    <div className="flex flex-col">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: isUserLoaded, isSignedIn } = useUser();

  if (!isUserLoaded) return <div />;

  return (
    <PageLayout>
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {isSignedIn && (
          <div className="flex w-full justify-between">
            <CreatePostWizard />
            <SignOutButton />
          </div>
        )}
      </div>

      <Feed />
    </PageLayout>
  );
};

export default Home;
