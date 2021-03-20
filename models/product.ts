export interface Product {
  readonly id: number;
  readonly name: string;
  readonly price: number; // in cents
}

export interface FullProduct extends Product {
  content: string;
}

export interface ProductWithSlug extends Product {
  slug: string;
}
