import { api } from "@/lib/axios"

type GetManagedRestaurantResponse = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const getManagedRestaurant = async () => {
  const { data } = await api.get<GetManagedRestaurantResponse>('/managed-restaurant');
  return data;
}