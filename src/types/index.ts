export type Property = {
  id: number;
  title: string;
  type: string;
  location: string;
  description: string;
  price: number;
  image: string;
  amenities: Array<string>;
  rating: number;
  reviews: number;
  maxGuest: number;
  bedrooms: number;
  beds: number;
  bath: number;
  cleaningFee: number;
  pets: boolean;
  maxPets: number;
};

export type ReservationData = {
  startDate: string;
  endDate: string;
  totalValue: number;
};

export type BookReservationProps = Pick<Property, "id"> & {
  reservations: ReservationData[];
};
