export type Listing = {
    propertyType: string,
    price: number,
    location: string,
    bedrooms: number,
    bathrooms: number,
    squareFootage: number,
    yearBuilt: number,
    propertyFeatures: Array<string>,
    title: string,
    description: string,
    imageUrl: string
};

export type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  cryptPassword: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  JWT?: string;
  savedListings?: Listing[];
};
