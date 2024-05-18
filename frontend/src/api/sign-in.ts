import { api } from "@/lib/axios";

type SignInBody = {
  email: string;
}

export const signIn = async ({ email }: SignInBody) => {
  await api.post('/authenticate', { email })
} 