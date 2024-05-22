import { api } from "@/lib/axios"

type GetManagedRestaurantResponse = {
  name: string;
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export const getManagedRestaurant = async () => {
  const { data } = await api.get<GetManagedRestaurantResponse>('/managed-restaurant');
  return data;
}