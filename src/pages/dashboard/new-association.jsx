import { addItem, getAssociations } from "@/data/associations-data";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewAssociation() {
  const navigate = useNavigate();

  const [folderNumber, setFolderNumber] = useState("");
  const [name, setName] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState("");
  const [foundationDate, setFoundationDate] = useState("");
  const [statuteChangeDate, setStatuteChangeDate] = useState("");
  const [registryDate, setRegistryDate] = useState("");
  const [registryNumber, setRegistryNumber] = useState("");
  const [electionDate, setElectionDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberNationality, setMemberNationality] = useState("");
  const [memberMaritalStatus, setMemberMaritalStatus] = useState("");
  const [memberAddress, setMemberAddress] = useState("");
  const [memberRg, setMemberRg] = useState("");
  const [memberCpf, setMemberCpf] = useState("");

  const handleAddMember = () => {
    if (memberName.trim() !== "") {
      setMembers([...members, { memberName, memberNationality, memberMaritalStatus, memberAddress, memberRg, memberCpf }]);
      setMemberName("");
      setMemberNationality("");
      setMemberMaritalStatus("");
      setMemberAddress("");
      setMemberRg("");
      setMemberCpf("");
      setIsModalOpen(false);
    }
  };

  function handleSumit(){
    const id = getAssociations().length+1
    const association = {
      id,
      folderNumber, 
      name, 
      fantasyName, 
      cnpj, 
      address, foundationDate: new Date(foundationDate), 
      statuteChangeDate: new Date(statuteChangeDate), 
      registryDate: new Date(registryDate), 
      registryNumber, 
      electionDate: new Date(electionDate),
      photo, 
      members, 
      createdAt: new Date()};
    addItem(association);
    
    navigate("/dashboard/associations");
  }

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-2">
      <h2 className="text-2xl font-semibold mb-4">Cadastro de Associação</h2>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <Typography
            variant="small"
            className=" text-blue-gray-400 font-bold"
          >
            Nº da Pasta:
          </Typography>
          <Input placeholder="Nº da Pasta" value={folderNumber} onChange={(e) => setFolderNumber(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <Typography
            variant="small"
            className=" text-blue-gray-400 font-bold"
          >
            Nº do CNPJ:
          </Typography>
          <Input placeholder="Nº do CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <Typography
          variant="small"
          className=" text-blue-gray-400 font-bold"
        >
          Nome da Associação:
        </Typography>
        <Input placeholder="Nome da Associação" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <Typography
          variant="small"
          className=" text-blue-gray-400 font-bold"
        >
          Nome de Fantasia:
        </Typography>
        <Input placeholder="Nome de Fantasia" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} />
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <Typography
          variant="small"
          className=" text-blue-gray-400 font-bold"
        >
          Endereço:
        </Typography>
        <Input placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <Typography
            variant="small"
            className=" text-blue-gray-400 font-bold"
          >
            Data da Fundação:
          </Typography>
          <Input type="date" placeholder="Data da Fundação" value={foundationDate} onChange={(e) => setFoundationDate(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <Typography
            variant="small"
            className=" text-blue-gray-400 font-bold"
          >
            Data de alteração do estatuto:
          </Typography>
          <Input type="date" placeholder="Data Alteração Estatuto" value={statuteChangeDate} onChange={(e) => setStatuteChangeDate(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <Typography
            variant="small"
            className=" text-blue-gray-400 font-bold"
          >
            Data Eleição Diretoria:
          </Typography>
          <Input type="date" placeholder="Data Eleição Diretoria" value={electionDate} onChange={(e) => setElectionDate(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <Typography
            variant="small"
            className=" text-blue-gray-400 font-bold"
          >
            Número do Registro Cartório:
          </Typography>
          <Input placeholder="Número do Registro Cartório" value={registryNumber} onChange={(e) => setRegistryNumber(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <Typography
            variant="small"
            className=" text-blue-gray-400 font-bold"
          >
            Data do registro cartório:
          </Typography>
          <Input type="date" placeholder="Data do registro cartório" value={registryDate} onChange={(e) => setRegistryDate(e.target.value)} />
        </div>
      </div>

      {/* <div className="flex flex-col gap-1 flex-1">
        <Typography
          variant="small"
          className=" text-blue-gray-400 font-bold"
        >
          Logomarca:
        </Typography>
        <Input type="file" className="mt-2" onChange={(e) => setPhoto(e.target.files[0])} />
      </div> */}


      <div className="mt-4">
        <h3 className="text-lg font-semibold">Membros</h3>
        <Button className="mt-2" onClick={() => setIsModalOpen(true)}>Adicionar Membro</Button>

        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Nome", "Nacionalidade", "Estado Civil", "Endereço", "RG", "CPF"].map((header) => (
                <th
                  key={header}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {header}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {members.map((member, index) => (
              <tr key={`${member}`} className="border-b py-1">
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {member.memberName}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {member.memberNationality}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {member.memberMaritalStatus}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {member.memberAddress}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {member.memberRg}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {member.memberCpf}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Button className="mt-5 px-8 flex items-center gap-3 justify-center" onClick={handleSumit}>
          <DocumentCheckIcon className="h-6 w-6" /> Salvar
        </Button>
      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Adicionar Membro</h2>
          <Input placeholder="Nome Completo" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
          <Input placeholder="Nacionalidade" value={memberNationality} onChange={(e) => setMemberNationality(e.target.value)} />
          <Input placeholder="Estado Civil" value={memberMaritalStatus} onChange={(e) => setMemberMaritalStatus(e.target.value)} />
          <Input placeholder="Endereço" value={memberAddress} onChange={(e) => setMemberAddress(e.target.value)} />
          <Input placeholder="Número de RG/Órgão Expedidor/Estado Emissor" value={memberRg} onChange={(e) => setMemberRg(e.target.value)} />
          <Input placeholder="Número de CPF" value={memberCpf} onChange={(e) => setMemberCpf(e.target.value)} />
          <Button className="mt-2" onClick={handleAddMember}>Adicionar</Button>
        </div>
      </Dialog>
    </div>
  );
}

export default NewAssociation;