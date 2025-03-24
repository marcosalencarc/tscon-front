import {
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
  UsersIcon
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BuildingStorefrontIcon,
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
    icon: UsersIcon,
    title: "Membros de associações",
    value: "1,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "na última semana",
    },
  },
  {
    color: "gray",
    icon: DocumentIcon,
    title: "Documentos cadastrados",
    value: "27",
    footer: {
      color: "text-green-500",
      value: "1%",
      label: "no último mês",
    },
  },
  {
    color: "gray",
    icon: ClipboardDocumentCheckIcon,
    title: "Documentos gerados para associações",	
    value: "621",
    footer: {
      color: "text-red-500",
      value: "-5%",
      label: "último mês",
    },
  },
];

export default statisticsCardsData;
