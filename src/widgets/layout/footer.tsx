import { Typography } from "@material-tailwind/react";

interface FooterProps {
  brandName: string;
  brandLink: string;
  routes: string;
}

export function Footer({ brandName, brandLink, routes }:FooterProps): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2">
        <Typography variant="h2" className="font-normal text-inherit">
        TSCON Contabilidade e Assessoria
        </Typography>
        
      </div>
    </footer>
  );
}

export default Footer;
