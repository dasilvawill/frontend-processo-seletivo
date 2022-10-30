import { Fragment, useContext, useState } from "react"
import { RegistrationContext } from "../../../../../contexts/RegistrationContext"
import Input from "../../../../../components/Input"

interface PersonalInformationProps {
  name: string
  socialName: string
  CPF: string
  birthDate: Date | string
  gender: string
  email: string
  phone: string
}

export default function PersonalInformationMobile(props: PersonalInformationProps) {
  return (
    <div>
      <h2 className="text-center text-gray-800 text-xl font-medium mb-6 mt-6">
        Informações Pessoais
      </h2>
      <div className="flex mt-6">
        <div className=" mb-4 mx-4">
          <Input
            textLabel="Nome completo"
            idInput="name"
            typeInput="text"
            valueInput={props.name}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="mb-4 mx-4">
          <Input
            textLabel="Nome Social"
            idInput="socialName"
            typeInput="text"
            valueInput={props.socialName}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="mb-4 mx-4">
          <Input
            textLabel="CPF"
            idInput="cpf"
            typeInput="text"
            valueInput={props.CPF}
            existsMask={true}
            mask={"999.999.999-99"}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="mb-4 mx-4">
          <Input
            textLabel="Data de Nascimento"
            idInput="birthDate"
            typeInput="date"
            valueInput={String(props.birthDate)}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="mb-4 mx-4">
          <Input
            textLabel="Gênero"
            idInput="gender"
            typeInput="text"
            valueInput={props.gender}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="mb-4 mx-4">
          <Input
            textLabel="E-mail"
            idInput="email"
            typeInput="email"
            valueInput={props.email}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Celular"
            idInput="phone"
            typeInput="text"
            valueInput={props.phone}
            existsMask={true}
            mask={"(99) 99999-9999"}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
