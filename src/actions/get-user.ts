import { auth } from "@/auth";

const getUser = async () => {
  const user = await auth();
  return user;
};

export default getUser;
