export type Room = {
  id: number;
  name: string;
  price: number;
  /** Public path or absolute image URL. */
  image: string;
  capacity: number;
  available: boolean;
};
