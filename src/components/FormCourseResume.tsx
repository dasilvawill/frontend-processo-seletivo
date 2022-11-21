import React, { Fragment, useContext, useEffect, useState } from "react"
import { RegistrationContext } from "../contexts/RegistrationContext"
import ButtonNext from "./ButtonNext"
import ButtonBack from "./ButtonBack"
import { FiMonitor, FiClock } from "react-icons/fi"
import { BsCalendarWeek } from "react-icons/bs"
import { api } from "../services/api"
import moment from "moment"
import Swal from "sweetalert2"

interface CourseResumeProps {
  courseResumeChange?: () => void
  backPage?: () => void
}

export default function FormCourseResume(props: CourseResumeProps) {
  const {
    name,
    socialName,
    email,
    phone,
    CPF,
    birthDate,
    disabilityRelief,
    cep,
    state,
    city,
    district,
    street,
    number,
    complement,
    yearEnem,
    codeEnemAndEncceja,
    objectiveTestGrade,
    redactionTestGrade,
    gender,
    selectedEntranceExam,
    entryForm,
    entryFormId,
    externalConsultant,
    selectedCourse,
    unity,
    showModalityName,
    showCourseName
  } = useContext(RegistrationContext)

  const firstName = name.split(" ")[0]
  const lastName = name.split(" ").slice(1, 20).join(" ")
  const birthDateFormatBr = moment.utc(birthDate).format("DD/MM/YYYY")

  const [ufId, setUfId] = useState()

  useEffect(() => {
    api
      .get(`/ufs/get-ufs`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then((response) => {
        const { data } = response
        setUfId(data?.find((element) => element.uf === state).uf_id)
      })
  }, [])


  async function newEnrollment() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Aguarde, estamos confirmando sua inscrição",
      showConfirmButton: false,
      timer: 6800
    })

    try {
      await api.post("/new-inscription", {
        complete_name: firstName + ' ' + lastName,
        social_name: socialName ? socialName : null,
        gender: String(gender.value),
        ethnicity_id: Number(4),
        birth_date: new Date(birthDateFormatBr).toISOString(),
        cpf: String(CPF),
        providence: String(disabilityRelief) ? String(disabilityRelief) : null,
        phone_number: String(phone),
        phone_number_2: String(phone),
        business_phone: String(phone),
        updated_by: 'inscription',
        postal_code: String(cep),
        city: String(city),
        district: String(district),
        street: String(street),
        number: Number(number),
        complement: complement ? complement : null,
        uf_id: Number(ufId),
        email: String(email),
        process_type_id: Number(entryFormId),
        course_id: Number(selectedCourse.value),
        entrance_exam_id: Number(selectedEntranceExam.value),
        user_id_consulter: Number(externalConsultant.value) ? Number(externalConsultant.value) : null,
        inscription_status_id: Number(1), /* Inscrito */
        overall_ranking_result: null,
        unity_id: Number(unity.id),
        year: Number(yearEnem) ? Number(yearEnem) : null,
        inscription: String(codeEnemAndEncceja) ? String(codeEnemAndEncceja) : null,
        objective_note: objectiveTestGrade ? objectiveTestGrade : null,
        essay_note: redactionTestGrade ? redactionTestGrade : null
      })
    props.courseResumeChange()
    } catch (err) {
      Swal.fire({
        title: "Candidato já inscrito",
        text: "O candidato já está inscrito neste processo seletivo. Escolha outro!",
        confirmButtonText: "Ok",
        icon: "warning"
      })
    }

    // let retorno = {
    //   PESSOA: 'DADOS PESSOA',
    //   complete_name: firstName + ' ' + lastName,
    //   social_name: socialName,
    //   gender: gender.value,
    //   ethnicity_id: 4,
    //   birth_date: birthDateFormatBr,
    //   cpf: CPF,
    //   providence: disabilityRelief,
    //   phone_number: phone,
    //   phone_number_2: phone,
    //   business_phone: phone,
    //   updated_by: 'inscription',

    //   ENDEREÇO: 'DADOS ENDEREÇO',
    //   cep: cep,
    //   city: city,
    //   district: district,
    //   street: street,
    //   number: number,
    //   complement: complement,
    //   uf_id: ufId,
    //   email: email,

    //   INSCRICAO: 'DADOS INSCRICAO',
    //   process_type_id: entryFormId,
    //   course_id: selectedCourse.value,
    //   entrance_exam_id: selectedEntranceExam.value,
    //   user_id_consulter: externalConsultant.value,
    //   inscription_status_id: 1, /* Inscrito */
    //   overall_ranking_result: null,
    //   unity_id: unity.i,
 
    //   // vestibular_id: entryForm.value === "enem-encceja" ? selectedEntranceExam : selectedEntranceExam.value,
      
    //   ENEM: 'DADOS ENEM',
    //   year: yearEnem,
    //   inscription: codeEnemAndEncceja,
    //   objective_note: objectiveTestGrade,
    //   essay_note: redactionTestGrade
      
    // }
    // console.log(retorno)
  }

  return (
    <Fragment>
      <div className="md:max-w-[450px] m-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <div className="flex justify-center font-light text-lg text-center border-2 border-gray-300 dark:border-gray-500 rounded-xl p-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-50">
            <p>
              <FiMonitor className="m-auto text-4xl mb-3" />
              {showCourseName}
            </p>
          </div>
          <div className="flex justify-center font-light text-lg text-center border-2 border-gray-300 dark:border-gray-500 rounded-xl p-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-50">
            <p>
              <BsCalendarWeek className="m-auto text-4xl mb-3" />
              {showModalityName}
            </p>
          </div>
          <div className="flex justify-center font-light text-lg text-center border-2 border-gray-300 dark:border-gray-500 rounded-xl p-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-50">
            <p>
              <FiClock className="m-auto text-4xl mb-3" />
              {unity.label}
            </p>
          </div>
        </div>
      </div>
      <div className="md:min-w-[550px]">
        <div className="flex flex-col mt-12">
          <ButtonNext onClick={newEnrollment}>Confirmar inscrição</ButtonNext>
        </div>
        <div className="flex flex-col mt-2">
          <ButtonBack onClick={() => props.backPage()}>Voltar</ButtonBack>
        </div>
      </div>
    </Fragment>
  )
}
