import type { User } from "@clerk/nextjs/dist/api";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username as string,
    profileImageUrl: user.profileImageUrl,
  };
};
