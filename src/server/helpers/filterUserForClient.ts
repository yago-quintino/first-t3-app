import type { User } from "@clerk/nextjs/dist/api";
import * as z from "zod";

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  profileImageUrl: z.string(),
});

type SafeUser = z.infer<typeof UserSchema>;

export const filterUserForClient = (user: User): SafeUser => {
  return {
    id: user.id,
    username: user.username as string,
    profileImageUrl: user.profileImageUrl,
  };
};
