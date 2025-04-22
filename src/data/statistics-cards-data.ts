import type { IconType, StatisticsCardProps } from "@/model/statistics-cards.model";
import {
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
  UsersIcon
} from "@heroicons/react/24/solid";

export const statisticsCardsData: StatisticsCardProps[] = [
  {
    color: "gray",
    icon: BuildingStorefrontIcon as unknown as IconType,
    title: "Associações Cadastradas",
    value: "123",
    footer: {
      color: "text-green-500",
      value: "+10%",
      label: "na última semana",
    },
  },
  {
    color: "gray",
    icon: UsersIcon as unknown as IconType,
    title: "Associações com mandato a vencer",
    value: "12",
    footer: {
      color: "text-red-500",
      value: "3",
      label: "essa semana",
    },
  },
  {
    color: "gray",
    icon: DocumentIcon as unknown as IconType,
    title: "Associações com certificado a vencer",
    value: "6",
    footer: {
      color: "text-red-500",
      value: "1",
      label: "nessa semana",
    },
  },
];
export default statisticsCardsData;
