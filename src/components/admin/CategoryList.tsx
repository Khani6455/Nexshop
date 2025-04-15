
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type CategoryListProps = {
  categories: string[];
  products: Product[];
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
};

export const CategoryList = ({ categories, products }: CategoryListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Categories</CardTitle>
            <CardDescription>
              Add products to create categories
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        categories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>
                {products.filter(p => p.category === category).length} products
              </CardDescription>
            </CardHeader>
          </Card>
        ))
      )}
    </div>
  );
};
