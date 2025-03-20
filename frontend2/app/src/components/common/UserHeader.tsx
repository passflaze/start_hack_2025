import { Card } from "@/components/ui/card";

export interface UserHeaderProps {
  user: {
    name: string;
    age: number;
    netWorth: string;
  };
  className?: string;
}

export function UserHeader({ user, className }: UserHeaderProps) {
  return (
    <Card className={`bg-gradient-to-r from-primary/5 to-primary/10 p-6 mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-7xl font-bold text-primary mb-1 mt-1">{user.name}</h1>
          <div className="text-sm text-gray-500">
            <span className="mr-2">Age: {user.age}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-right">
            <div className="text-sm text-gray-500">Net Worth</div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              {user.netWorth}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}