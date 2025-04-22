import type { AssociationFilter } from "@/model/statistics-cards.model";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import type { color } from "@material-tailwind/react/types/components/card";
import PropTypes from "prop-types";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface StatisticsCardProps {
  color: color | undefined;
  icon: ReactNode;
  title: string;
  value: string;
  footer: ReactNode;
  route: string;
  filter?: AssociationFilter;
}

export function StatisticsCard({ color, icon, title, value, footer, filter, route }: StatisticsCardProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route && filter) {
      navigate(route, {
        state: { filter }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };
    return (
    <Card 
        className={`
          border border-blue-gray-100 shadow-sm 
          transition-all duration-200
          ${filter ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : 'cursor-default'}
        `}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={filter ? "button" : "article"}
        tabIndex={filter ? 0 : -1}
        aria-label={filter ? `Ver ${title}` : title}>
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
