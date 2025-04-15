
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardStatsProps = {
  productsCount: number;
  categoriesCount: number;
  usersCount: number;
};

export const DashboardStats = ({ productsCount, categoriesCount, usersCount }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{productsCount}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{categoriesCount}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{usersCount}</p>
        </CardContent>
      </Card>
    </div>
  );
};
