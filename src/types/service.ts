export interface Service {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  currency: string;
  pricePrefix?: string;
  durationPrefix?: string;
  order: number;
  isActive: boolean;
}

export type CreateServiceInput = Omit<Service, "id">;

export type UpdateServiceInput = Partial<CreateServiceInput>;
