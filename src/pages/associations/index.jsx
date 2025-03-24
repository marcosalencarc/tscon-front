import { getAssociations } from "@/data/associations-data";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tooltip,
  Typography
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Associations() {
  const navigate = useNavigate();
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between">
          <Typography variant="h6" color="white">
            Associações
          </Typography>
          <button onClick={() => navigate("/dashboard/new-association")} type="button" className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-gray-400 rounded-lg hover:bg-blue-gray-600">
            <PlusCircleIcon className="w-6 h-6" />
            Nova Associação
          </button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["nome","nome fantasia", "CNPJ", "membros", "status", "data de fundação", "data de criação"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getAssociations().map(
                ({ id, name, fantasyName, cnpj, members, status, foundationDate, createdAt }, key) => {
                  const className = `py-3 px-5 ${key === getAssociations().length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {fantasyName}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {cnpj}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status ? "green" : "blue-gray"}
                          value={status ? "ativo" : "inativo"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {createdAt.toLocaleString()}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {createdAt.toLocaleString()}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
export default Associations;
