import { Property } from "@/types";

import apartmentImage from "../assets/images/f10333db-ee78-472a-a825-eb0e821ec83d.webp";
import cottageImage from "../assets/images/3e50c1ef-050c-4338-b06d-7dad82417a89.webp";
import beachfrontImage from "../assets/images/2d9f5ff2-080c-4678-92ff-d8e366fbf55c.webp";

export const propertiesMock: Property[] = [
  {
    id: 23101986,
    title: "Cozy downtown apartment",
    type: "apartment",
    location: "São Paulo, Brazil",
    description:
      "Experience the best São Paulo has to offer in this modern apartment.",
    price: 400,
    image: apartmentImage,
    amenities: [
      "High-Speed Wi-Fi",
      "Fully Equipped Kitchen",
      "Extra pillows and blankets",
      "Dryer",
    ],
    rating: 4.8,
    reviews: 154,
    maxGuest: 4,
    bedrooms: 1,
    beds: 1,
    bath: 1,
    cleaningFee: 50,
    pets: false,
    maxPets: 0,
  },
  {
    id: 14121990,
    title: "Entire chalet in Itajubá, Brazil",
    type: "cottage",
    location: "Itajubá, Brazil",
    description:
      "Forget your worries in this spacious and quiet place. Ideal place for couples seeking moments of contemplation of nature and reconnection with all the comforts of a modern house.",
    price: 925,
    image: cottageImage,
    amenities: [
      "Mountain view",
      "Waterfront",
      "Dedicated workspace",
      "Pets allowed",
      "Wifi",
    ],
    rating: 4.95,
    reviews: 39,
    maxGuest: 2,
    bedrooms: 1,
    beds: 1,
    bath: 1,
    pets: true,
    maxPets: 2,
    cleaningFee: 150,
  },
  {
    id: 23052024,
    title: "Entire home in Ilhabela, Brazil",
    type: "beachfront",
    location: "Ilhabela, Brazil",
    description:
      "Beautiful and cozy house facing the sea/coastal. One of the best views in the sunset in Ilhabela! Available for New Year's Eve 2024",
    price: 15976,
    image: beachfrontImage,
    amenities: [
      "Free parking on premises",
      "Sea view",
      "Washer",
      "Pets allowed",
      "Wifi",
    ],
    rating: 4.81,
    reviews: 1500,
    maxGuest: 10,
    bedrooms: 4,
    beds: 8,
    bath: 4,
    pets: false,
    maxPets: 0,
    cleaningFee: 220,
  },
];
