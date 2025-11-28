import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  thumbnail: string;
  price: number;
  duration: number;
}

const CourseCard = ({
  _id,
  title,
  description,
  category,
  difficulty_level,
  thumbnail,
  price,
  duration,
}: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="flex flex-col h-full hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/courses/${_id}`)}
    >
      {thumbnail && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex gap-2 mb-2">
          <Badge variant="secondary">{category}</Badge>
          <Badge variant="outline">{difficulty_level}</Badge>
        </div>

        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          {duration} hours
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-bold">
          {price === 0 ? "Free" : `USD ${price}`}
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/courses/${_id}`);
          }}
        >
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
