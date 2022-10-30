import { Fragment, useContext, useState } from "react"
import { RegistrationContext } from "../../../../../contexts/RegistrationContext"
import Input from "../../../../../components/Input"

interface PersonalInformationProps {
  name: string
  socialName: string
  CPF: string
  birthDate: string | Date
  gender: string
  email: string
  phone: string
}

export default function PersonalInformation(props: PersonalInformationProps) {
  return (
    <div className="h-full bg-white rounded">
      <h2 className="text-center text-gray-800 text-xl font-medium mb-12 mt-6">
        Informações Pessoais
      </h2>
      <div className="flex mt-6">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Nome completo"
            idInput="name"
            typeInput="text"
            valueInput={props.name}
            className="w-[20vw]"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="CPF"
            idInput="cpf"
            typeInput="text"
            valueInput={props.CPF}
            existsMask={true}
            mask={"999.999.999-99"}
            className="w-[20vw]"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Data de Nascimento"
            idInput="birthDate"
            typeInput="string"
            valueInput={String(props.birthDate)}
            className="w-[20vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-6">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Gênero"
            idInput="gender"
            typeInput="text"
            valueInput={props.gender}
            className="w-[20vw]"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="E-mail"
            idInput="email"
            typeInput="email"
            valueInput={props.email}
            className="w-[20vw]"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Celular"
            idInput="phone"
            typeInput="text"
            valueInput={props.phone}
            existsMask={true}
            mask={"(99) 99999-9999"}
            className="w-[20vw]"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
