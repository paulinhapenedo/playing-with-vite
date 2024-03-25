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

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type ReservationData = Pick<Property, "id"> & DateRange;

export type BookReservationProps = Pick<Property, "id"> & {
  reservations: DateRange[];
};
