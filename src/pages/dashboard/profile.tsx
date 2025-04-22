// import {
//   Card,
//   CardBody,
//   CardHeader,
//   CardFooter,
//   Avatar,
//   Typography,
//   Tabs,
//   TabsHeader,
//   Tab,
//   Switch,
//   Tooltip,
//   Button,
// } from "@material-tailwind/react";
// import {
//   HomeIcon,
//   ChatBubbleLeftEllipsisIcon,
//   Cog6ToothIcon,
//   PencilIcon,
// } from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";
// import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
// import { platformSettingsData, conversationsData, projectsData } from "@/data";

// export function Profile() {
//   return (
//     <>
//       <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
//         <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
//       </div>
//       <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
//         <CardBody className="p-4">
//           <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
//             <div className="flex items-center gap-6">
//               <Avatar
//                 src="/img/bruce-mars.jpeg"
//                 alt="bruce-mars"
//                 size="xl"
//                 variant="rounded"
//                 className="rounded-lg shadow-lg shadow-blue-gray-500/40"
//               />
//               <div>
//                 <Typography variant="h5" color="blue-gray" className="mb-1">
//                   Richard Davis
//                 </Typography>
//                 <Typography
//                   variant="small"
//                   className="font-normal text-blue-gray-600"
//                 >
//                   CEO / Co-Founder
//                 </Typography>
//               </div>
//             </div>
//             <div className="w-96">
//               <Tabs value="app">
//                 <TabsHeader>
//                   <Tab value="app">
//                     <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
//                     App
//                   </Tab>
//                   <Tab value="message">
//                     <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
//                     Message
//                   </Tab>
//                   <Tab value="settings">
//                     <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
//                     Settings
//                   </Tab>
//                 </TabsHeader>
//               </Tabs>
//             </div>
//           </div>
//           <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
//             <div>
//               <Typography variant="h6" color="blue-gray" className="mb-3">
//                 Platform Settings
//               </Typography>
//               <div className="flex flex-col gap-12">
//                 {platformSettingsData.map(({ title, options }) => (
//                   <div key={title}>
//                     <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
//                       {title}
//                     </Typography>
//                     <div className="flex flex-col gap-6">
//                       {options.map(({ checked, label }) => (
//                         <Switch
//                           key={label}
//                           id={label}
//                           label={label}
//                           defaultChecked={checked}
//                           labelProps={{
//                             className: "text-sm font-normal text-blue-gray-500",
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <ProfileInfoCard
//               title="Profile Information"
//               description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
//               details={{
//                 "first name": "Alec M. Thompson",
//                 mobile: "(44) 123 1234 123",
//                 email: "alecthompson@mail.com",
//                 location: "USA",
//                 social: (
//                   <div className="flex items-center gap-4">
//                     <i className="fa-brands fa-facebook text-blue-700" />
//                     <i className="fa-brands fa-twitter text-blue-400" />
//                     <i className="fa-brands fa-instagram text-purple-500" />
//                   </div>
//                 ),
//               }}
//               action={
//                 <Tooltip content="Edit Profile">
//                   <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
//                 </Tooltip>
//               }
//             />
//             <div>
//               <Typography variant="h6" color="blue-gray" className="mb-3">
//                 Platform Settings
//               </Typography>
//               <ul className="flex flex-col gap-6">
//                 {conversationsData.map((props) => (
//                   <MessageCard
//                     key={props.name}
//                     {...props}
//                     action={
//                       <Button variant="text" size="sm">
//                         reply
//                       </Button>
//                     }
//                   />
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="px-4 pb-4">
//             <Typography variant="h6" color="blue-gray" className="mb-2">
//               Projects
//             </Typography>
//             <Typography
//               variant="small"
//               className="font-normal text-blue-gray-500"
//             >
//               Architects design houses
//             </Typography>
//             <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
//               {projectsData.map(
//                 ({ img, title, description, tag, route, members }) => (
//                   <Card key={title} color="transparent" shadow={false}>
//                     <CardHeader
//                       floated={false}
//                       color="gray"
//                       className="mx-0 mt-0 mb-4 h-64 xl:h-40"
//                     >
//                       <img
//                         src={img}
//                         alt={title}
//                         className="h-full w-full object-cover"
//                       />
//                     </CardHeader>
//                     <CardBody className="py-0 px-1">
//                       <Typography
//                         variant="small"
//                         className="font-normal text-blue-gray-500"
//                       >
//                         {tag}
//                       </Typography>
//                       <Typography
//                         variant="h5"
//                         color="blue-gray"
//                         className="mt-1 mb-2"
//                       >
//                         {title}
//                       </Typography>
//                       <Typography
//                         variant="small"
//                         className="font-normal text-blue-gray-500"
//                       >
//                         {description}
//                       </Typography>
//                     </CardBody>
//                     <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
//                       <Link to={route}>
//                         <Button variant="outlined" size="sm">
//                           view project
//                         </Button>
//                       </Link>
//                       <div>
//                         {members.map(({ img, name }, key) => (
//                           <Tooltip key={name} content={name}>
//                             <Avatar
//                               src={img}
//                               alt={name}
//                               size="xs"
//                               variant="circular"
//                               className={`cursor-pointer border-2 border-white ${
//                                 key === 0 ? "" : "-ml-2.5"
//                               }`}
//                             />
//                           </Tooltip>
//                         ))}
//                       </div>
//                     </CardFooter>
//                   </Card>
//                 )
//               )}
//             </div>
//           </div>
//         </CardBody>
//       </Card>
//     </>
//   );
// }

// export default Profile;



import { Button, Dialog, Input } from "@material-tailwind/react";
import { useState } from "react";

export function Profile() {
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

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Cadastro de Associação</h2>
      <Input placeholder="Nº da Pasta" value={folderNumber} onChange={(e) => setFolderNumber(e.target.value)} />
      <Input placeholder="Nome da Associação" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Nome de Fantasia" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} />
      <Input placeholder="Nº do CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
      <Input placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Input type="date" placeholder="Data da Fundação" value={foundationDate} onChange={(e) => setFoundationDate(e.target.value)} />
      <Input type="date" placeholder="Data Alteração Estatuto" value={statuteChangeDate} onChange={(e) => setStatuteChangeDate(e.target.value)} />
      <Input type="date" placeholder="Data do registro cartório" value={registryDate} onChange={(e) => setRegistryDate(e.target.value)} />
      <Input placeholder="Número do Registro Cartório" value={registryNumber} onChange={(e) => setRegistryNumber(e.target.value)} />
      <Input type="date" placeholder="Data Eleição Diretoria" value={electionDate} onChange={(e) => setElectionDate(e.target.value)} />
      <Input type="file" className="mt-2" onChange={(e) => setPhoto(e.target.files[0])} />
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Membros</h3>
        <Button className="mt-2" onClick={() => setIsModalOpen(true)}>Adicionar Membro</Button>
        <ul className="mt-2">
          {members.map((member, index) => (
            <li key={`${member}`} className="border-b py-1">
              {member.memberName} - {member.memberNationality} - {member.memberMaritalStatus} - {member.memberAddress} - {member.memberRg} - {member.memberCpf}
            </li>
          ))}
        </ul>
      </div>
      
      <Dialog  open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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

export default Profile;