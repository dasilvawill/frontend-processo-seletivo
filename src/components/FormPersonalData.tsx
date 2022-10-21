import React, { useContext, useState } from "react"
import { RegistrationContext } from "../contexts/RegistrationContext"
import PersonalData from "../core/PersonalData"
import Input from "./Input"
import Textarea from "./TextArea"
import ButtonNext from "./ButtonNext"
import ButtonBack from "./ButtonBack"
import Swal from "sweetalert2"
import { cpf } from "cpf-cnpj-validator"
import { Switch } from "@material-tailwind/react"
import Select from "./Select"
interface PersonalDataProps {
  personalData: PersonalData
  personalDataChange?: (personalData: PersonalData) => void
  backPage?: () => void
}

export default function FormPersonalData(props: PersonalDataProps) {
  const {
    CPF,
    setCPF,
    birthDate,
    setBirthDate,
    switchShowDeficiency,
    setSwitchShowDeficiency,
    disabilityRelief,
    setDisabilityRelief,
    gender,
    setGender
  } = useContext(RegistrationContext)

  const genderOptions = [
    {
      label: "Feminino",
      value: "F"
    },
    {
      label: "Masculino",
      value: "M"
    }
  ]

  function handleIncompleteAndInvalidCpf() {
    if (CPF.includes("_")) {
      Swal.fire({
        title: "CPF incompleto",
        text: "Digite o CPF completo!",
        confirmButtonText: "Ok",
        icon: "warning"
      })
      return true
    } else {
      if (!cpf.isValid(CPF)) {
        Swal.fire({
          title: "CPF inválido",
          text: "Digite seu CPF!",
          confirmButtonText: "Ok",
          icon: "warning"
        })
        setCPF("")
        return true
      }
    }
  }

  function hanldeNotFilledSelect() {
    if (gender === null || gender === "") {
      Swal.fire({
        title: "Gênero não preenchido",
        text: "Selecione o gênero!",
        confirmButtonText: "Ok",
        icon: "warning"
      })
      return true
    }
  }

  function FormSubmit(e: any) {
    e.preventDefault()
    handleIncompleteAndInvalidCpf() || hanldeNotFilledSelect()
      ? null
      : props.personalDataChange?.(new PersonalData(CPF, new Date(birthDate), disabilityRelief))
  }

  return (
    <div>
      <form onSubmit={FormSubmit}>
        <Input
          textLabel="CPF"
          idInput="cpf"
          typeInput="text"
          valueInput={CPF}
          onChange={setCPF}
          existsMask={true}
          mask={"999.999.999-99"}
          required
        />

        <Input
          textLabel="Data de Nascimento"
          idInput="birthDate"
          typeInput="date"
          valueInput={String(birthDate)}
          onChange={setBirthDate}
          required
        />

        <Select
          textLabel={"Gênero"}
          name={gender?.value}
          id={gender?.value}
          key={gender?.value}
          placeholder={gender ? gender.label : "Selecione"}
          options={genderOptions}
          noOptionsMessage={"Desculpe! Não encontramos o que estava procurando ☹️"}
          onChange={(e) => setGender(e)}
          isLoading={!genderOptions ? true : false}
        />

        <div className="flex justify-start text-sm mb-2 ml-2">
          <div className="flex w-max gap-4">
            <Switch
              id="socialName"
              color="blue"
              label="Sou portador de necessidades especiais"
              labelProps={{
                className: "dark:text-gray-50 font-light, select-none, cursor-pointer, mt-px, ml-3"
              }}
              defaultChecked={switchShowDeficiency}
              onChange={() => (
                setSwitchShowDeficiency(!switchShowDeficiency), setDisabilityRelief("")
              )}
            />
          </div>
        </div>

        <div hidden={!switchShowDeficiency}>
          <Textarea
            textLabel="Necessito da seguinte providência:"
            valueTextArea={disabilityRelief}
            onChange={setDisabilityRelief}
            required={switchShowDeficiency}
          />
        </div>

        <div className="flex flex-col mt-12">
          <ButtonNext type="submit">Próximo</ButtonNext>
        </div>

        <div className="flex flex-col mt-2">
          <ButtonBack onClick={() => props.backPage()}>Voltar</ButtonBack>
        </div>
      </form>
    </div>
  )
}
