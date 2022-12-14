import { Fragment, useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { RegistrationContext } from "../contexts/RegistrationContext"
import Lead from "../core/Lead"
import Input from "./Input"
import { useRouter } from "next/router"
import { api } from "../services/api"
import { Switch } from "@material-tailwind/react"
import validator from "validator"
import ButtonNext from "./ButtonNext"
import React from "react"
import Select from "./Select"

interface FormProps {
  lead: Lead
  leadChange?: (lead: Lead) => any
}

export default function Form(props: FormProps) {
  const {
    socialName,
    setSocialName,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    switchShowSocialName,
    setSwitchShowSocialName,
    switchShowExternalConsultant,
    setSwitchShowExternalConsultant,
    setModality,
    setUnity,
    setSelectedCourse,
    setEntryForm,
    setSelectedEntranceExam,
    setShowCourseName,
    setShowModalityName,
    setFilialCourse,
    setEntryFormId,
    setCourseModality,
    setCourseShift,
    setCourseIdShift,
    setCourseMatrix,
    externalConsultant,
    setExternalConsultant,
    consultantsOptionsList,
    setConsultantsOptionsList
  } = useContext(RegistrationContext)

  const [consultantsOptions, setConsultantsOptions] = useState([])

  const router = useRouter()
  //Somente se tiver completeName na rota, setar com o que vem da rota
  if (router.query.completeName) {
    setName(String(router.query.completeName))
    setEmail(String(router.query.email))
    setPhone(String(router.query.phone))
  }

  //Somente se tiver entryForm na rota, setar com o que vem da rota
  if (router.query.entryForm) {
    setCourseMatrix(String(router.query.courseMatrix))
    setCourseShift(String(router.query.courseShift))
    setCourseIdShift(String(router.query.idCourseShift))
    setCourseModality(String(router.query.modalidadeDescricao))
    setFilialCourse(String(router.query.courseFilial))
    setModality(String(router.query.modality))
    setUnity(String(router.query.unity))
    setSelectedCourse(String(router.query.course))
    setEntryForm(String(router.query.entryForm))
    setEntryFormId(String(router.query.entryFormId))
    setSelectedEntranceExam(String(router.query.selectedEnrollment))
    setShowCourseName(String(router.query.showCourseName))
    setShowModalityName(String(router.query.showModalityName))
  }

  function handleIncompleteName() {
    if (!name.split(" ")[1]) {
      Swal.fire({
        title: "Nome incompleto",
        text: "Informe nome e sobrenome!",
        icon: "warning"
      })
      return true
    }
  }

  function handleInvalidEmail() {
    if (!validator.isEmail(email)) {
      Swal.fire({
        title: "E-mail inv??lido",
        text: "Digite seu e-mail!",
        confirmButtonText: "Ok",
        icon: "warning"
      })
      return true
    }
  }

  function handleIncompletePhone() {
    if (phone.includes("_")) {
      Swal.fire({
        title: "Celular incompleto",
        text: "Digite seu celular completo!",
        confirmButtonText: "Ok",
        icon: "warning"
      })
      return true
    }
  }

  function hanldeNotFilledSelect() {
    if (switchShowExternalConsultant) {
      if (externalConsultant === null || externalConsultant === "") {
        Swal.fire({
          title: "Consultor n??o preenchido",
          text: "Selecione o consultor!",
          confirmButtonText: "Ok",
          icon: "warning"
        })
        return true
      }
    }
  }

  function fillConsultantsOptions() {
    consultantsOptionsList.map((consultant) => {
      setConsultantsOptions((consultantsOptions) => [
        ...consultantsOptions,
        {
          value: consultant.user.user_name,
          label: consultant.complete_name
        }
      ])
    })
  }

  useEffect(() => {
    api.get("/person/get-consulters").then((response) => {
      setConsultantsOptionsList(response.data)
    })
  }, [])

  function FormSubmit(e: any) {
    e.preventDefault()
    handleIncompleteName() ||
    handleInvalidEmail() ||
    handleIncompletePhone() ||
    hanldeNotFilledSelect()
      ? null
      : props.leadChange?.(new Lead(name, email, phone))
  }

  return (
    <Fragment>
      <form onSubmit={FormSubmit} autoComplete="off" className=" mx-auto">
        <div className="flex flex-col mb-2">
          <Input
            textLabel="Nome completo"
            idInput="name"
            typeInput="text"
            valueInput={name}
            onChange={setName}
            onBlur={() => setName(name.trim())}
            required
          />

          <Input
            textLabel="E-mail"
            idInput="email"
            typeInput="email"
            valueInput={email}
            onChange={setEmail}
            required
          />

          <Input
            textLabel="Celular"
            idInput="phone"
            typeInput="text"
            valueInput={phone}
            onChange={setPhone}
            existsMask={true}
            mask={"(99) 99999-9999"}
            required
          />
        </div>

        <div className="flex justify-start text-sm mb-2 ml-2 w-max gap-4">
          <Switch
            label="Utilizar um nome social"
            labelProps={{
              className: "dark:text-gray-50 font-light, select-none, cursor-pointer, mt-px, ml-3"
            }}
            id="socialName"
            color="blue"
            defaultChecked={switchShowSocialName}
            onChange={() => (setSwitchShowSocialName(!switchShowSocialName), setSocialName(""))}
          />
        </div>

        <div hidden={!switchShowSocialName}>
          <Input
            textLabel="Nome Social"
            idInput="socialName"
            typeInput="text"
            valueInput={socialName}
            onChange={setSocialName}
            required={switchShowSocialName}
          />
        </div>

        <div className="flex ustify-start text-sm mb-2 ml-2 w-max gap-4">
          <Switch
            label="Tive ajuda de um consultor externo"
            labelProps={{
              className: "dark:text-gray-50 font-light, select-none, cursor-pointer, mt-px, ml-3"
            }}
            id="externalConsultant"
            color="blue"
            defaultChecked={switchShowExternalConsultant}
            onClick={fillConsultantsOptions}
            onChange={() => (
              setSwitchShowExternalConsultant(!switchShowExternalConsultant),
              setExternalConsultant("")
            )}
          />
        </div>

        <div hidden={!switchShowExternalConsultant}>
          <Select
            textLabel={"Consultor"}
            name={externalConsultant?.value}
            id={externalConsultant?.value}
            placeholder={externalConsultant ? externalConsultant.label : "Selecione"}
            options={consultantsOptions}
            noOptionsMessage={"Desculpe! N??o encontramos o que estava procurando ??????"}
            onChange={(e) => setExternalConsultant(e)}
            isLoading={!consultantsOptions ? true : false}
            key={externalConsultant.value}
          />
        </div>

        <div className="flex flex-col mt-12">
          <ButtonNext type="submit">Pr??ximo</ButtonNext>
        </div>
      </form>
    </Fragment>
  )
}
