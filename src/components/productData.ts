export interface Product {
  name: string;
  image: string;
  price: number;
  rating: number;
}

export interface Category {
  title: string;
  products: Product[];
}

export const productData: Category[] = [
  {
    title: "Animal Feed Raw Materials",
    products: [
      { name: "Rice Bran", image: "Rice bran.jpeg", price: 10, rating: 4.5 },
      { name: "White Maize", image: "white maize.jpeg", price: 15, rating: 4.8 },
      { name: "Sunflower Meal", image: "sunflower meal.jpeg", price: 12, rating: 4.2 },
      { name: "Soya Meal", image: "soyameal.jpeg", price: 18, rating: 4.6 },
      { name: "Wheat Bran", image: "wheat bran.jpeg", price: 8, rating: 4.0 },
    ],
  },
  {
    title: "Crops and Grains",
    products: [
      { name: "Sorghum", image: "sorghum.jpeg", price: 20, rating: 4.7 },
      { name: "Millet", image: "millet.jpeg", price: 22, rating: 4.5 },
      { name: "Cotton", image: "cotton.jpeg", price: 30, rating: 4.9 },
    ],
  },
  {
    title: "Nuts & Seeds",
    products: [
      { name: "Sesame Seeds", image: "sesame seeds.jpeg", price: 25, rating: 4.8 },
      { name: "Cashew Nuts", image: "cashew nuts.jpeg", price: 40, rating: 4.9 },
      { name: "Groundnuts", image: "ground nuts.jpeg", price: 8, rating: 4.2 },
    ],
  },
  {
    title: "Pulses",
    products: [
      { name: "Soya Beans", image: "soya beans.jpeg", price: 12, rating: 4.5 },
      { name: "Yellow Beans", image: "yellow beans.jpeg", price: 13, rating: 4.6 },
      { name: "Pigeon Peas", image: "pigeon peas.jpeg", price: 11, rating: 4.4 },
    ],
  },
];
