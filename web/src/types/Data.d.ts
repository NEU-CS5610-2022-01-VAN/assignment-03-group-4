interface IAUth0User {
  sub: string;
}

interface IUser {
  _id: string;
  email: string;
  name: string;
  bio?: string;
  picture?: string;
  createdAt: string;
  upatedAt: string;
  recipes: IRecipe[];
  reviews: any[];
}

interface ICategory {
  _id: string;
  name: string;
}

interface IRecipe {
  _id: string;
  title: string;
  body: string;
  cookingTime: number;
  ingredients: string[];
  instructions: string[];
  youtubeVideoId: string;
  author: IUser;
  categories: ICategory[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
  rating: number;
  reviews: any[];
}

interface IReview {
  _id: string;
  title: string;
  content: string;
  rating: number;
  recipe: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}
