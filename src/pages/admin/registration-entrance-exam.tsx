import moment from "moment"
import { useContext, useEffect, useState } from "react"
import Input from "../../components/Input"
import Select from "../../components/Select"
import { RegistrationContext } from "../../contexts/RegistrationContext"
import { api } from "../../services/api"
import Menu from "./components/Menu"
import Shellbar from "./components/Shellbar"
import Table from "./components/Table"

export default function SearchCandidate() {
  const { candidateData } = useContext(RegistrationContext)
  const [entranceExamType, setEntranceExamType] = useState<any>()
  const [testType, setTestType] = useState<any>()
  const [academicPeriod, setAcademicPeriod] = useState<any>()
  const [allowEnemGrade, setAllowEnemGrade] = useState(false)

  const [entranceExamName, setEntranceExamName] = useState<string>()
  const [testDate, setTestDate] = useState(new Date("2000-01-01") || "")
  const [inscriptionsStartDate, setInscriptionsStartDate] = useState(new Date("2000-01-01") || "")
  const [inscriptionsEndDate, setInscriptionsEndDate] = useState(new Date("2000-01-01") || "")
  const [noticeLink, setNoticeLink] = useState<string>()

  function parseDataBR(birthDate: string) {
    return moment(candidateData?.person?.birth_date).utc().format("DD/MM/YYYY")
  }

  const entranceExam = [
    { label: "Normal", value: 1 },
    { label: "Privado", value: 2 },
    { label: "Continuado", value: 3 }
  ]

  const test = [
    { label: "Mérito (EAD)", value: 1 },
    { label: "Mérito (Presencial)", value: 2 },
    { label: "Redação", value: 3 }
  ]

  const academicPeriodList = [
    { label: "2022/2 CX", value: 1 },
    { label: "2022/2 BG", value: 2 },
    { label: "2022/2 NH", value: 3 },
    { label: "2022/2 POA", value: 4 },
    { label: "2022/2 IBGEN", value: 5 },
    { label: "2022/2 EAD", value: 6 }
  ]

  const timeElapsed = Date.now()
  const currentDate = new Date(timeElapsed)
  // const today2 = new Date(timeElapsed)

  currentDate.toISOString() // "2022-01-30T18:30:00.000Z"
  // today2.toLocaleDateString()
  // console.log(currentDate, "todayyyy")

  // console.log(timeElapsed, "AAAAAAAAAAAAA")

  const onRegistrationsEntranceExam = () => {
    console.log(
      "post",
      entranceExamName,
      testDate,
      inscriptionsStartDate,
      inscriptionsEndDate,
      allowEnemGrade,
      entranceExamType?.value,
      testType?.value,
      noticeLink,
      academicPeriod?.value
    )
    api.post(
      "/entranceExam",
      {
        entrance_exam: entranceExamName,
        test_date: new Date(testDate).toISOString(),
        inscriptions_start_date: new Date(inscriptionsStartDate).toISOString(),
        inscriptions_end_date: new Date(inscriptionsEndDate).toISOString(),
        allow_enem_grade: allowEnemGrade,
        type_of_entrance_exam_id: entranceExamType?.value,
        type_of_test_id: testType?.value,
        notice: noticeLink,
        academic_period_id: academicPeriod?.value,
        updated_at: currentDate,
        created_at: currentDate
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
    )
  }

  return (
    <div>
      <Shellbar />
      <div className="hidden md:flex ">
        <Menu />
        <div className="flex justify-center mt-20 w-full h-[86vh] items-start bg-white">
          <div>
            <h1 className="text-center text-gray-800 text-2xl font-bold mb-6">
              Cadastro de Vestibular
            </h1>
            <hr /> <hr />
            <div className="bg-white rounded h-full ">
              <div className="flex mt-6">
                <div className="flex flex-col mb-4 mx-4">
                  <Input
                    textLabel="Nome do Vestibular"
                    idInput="name"
                    typeInput="text"
                    valueInput={entranceExamName}
                    onChange={setEntranceExamName}
                    className="w-[20vw]"
                  />
                </div>
                <div className="flex flex-col mb-4 mx-4">
                  <Input
                    textLabel="Data do Vestibular"
                    idInput="testDate"
                    typeInput="date"
                    valueInput={String(testDate)}
                    onChange={setTestDate}
                    className="w-[20vw]"
                  />
                </div>
                <div className="flex flex-col mb-4 mx-4">
                  <Input
                    textLabel="Data Inicial das Inscrições"
                    idInput="inscriptionsStartDate"
                    typeInput="date"
                    valueInput={String(inscriptionsStartDate)}
                    onChange={setInscriptionsStartDate}
                    className="w-[20vw]"
                  />
                </div>
              </div>
              <div className="flex mt-6">
                <div className="flex flex-col mb-4 mx-4">
                  <Input
                    textLabel="Data Final das Inscrições"
                    idInput="inscriptionsEndDate"
                    typeInput="date"
                    valueInput={String(inscriptionsEndDate)}
                    onChange={setInscriptionsEndDate}
                    className="w-[20vw]"
                  />
                </div>
                <div className="flex flex-col mb-4 mx-4">
                  <Select
                    textLabel="Tipo de Vestibular"
                    placeholder="Selecione"
                    name={entranceExamType?.label}
                    id={entranceExamType?.value}
                    options={entranceExam}
                    onChange={(e) => setEntranceExamType(e)}
                    className="w-[20vw]"
                  />
                </div>
                <div className="flex flex-col mb-4 mx-4">
                  <Select
                    textLabel="Tipo de Prova"
                    placeholder="Selecione"
                    name={testType?.label}
                    id={testType?.value}
                    options={test}
                    onChange={(e) => setTestType(e)}
                    className="w-[20vw]"
                  />
                </div>
              </div>
              <div className="flex mt-6">
                <div className="flex flex-col mb-4 mx-4">
                  <Input
                    textLabel="Link do Edital"
                    idInput="noticeLink"
                    typeInput="string"
                    valueInput={noticeLink}
                    onChange={setNoticeLink}
                    className="w-[41.3vw]"
                  />
                </div>
                <div className="flex flex-col mb-4 mx-4">
                  <Select
                    textLabel="Período Letivo"
                    placeholder="Selecione"
                    name={academicPeriod?.label}
                    id={academicPeriod?.value}
                    options={academicPeriodList}
                    onChange={(e) => setAcademicPeriod(e)}
                    className="w-[20vw]"
                  />
                </div>
              </div>

              <div className="flex mt-6">
                <div className="flex flex-col mb-4 mx-4">
                  <div className="form-check w-[20vw]">
                    <input
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      onClick={(e) => setAllowEnemGrade(!allowEnemGrade)}
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="flexCheckDefault"
                    >
                      Permitir Nota do Enem
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-44 mb-20">
                <button
                  className="max-w-screen-sm w-full bg-[#4B6BFB] shadow-md shadow-gray-300 dark:shadow-gray-900 text-white font-medium rounded-2xl p-3"
                  // type={props.type}
                  onClick={onRegistrationsEntranceExam}
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE
      <div className="md:hidden flex-wrap ">
        <Menu />
        <div className="flex justify-center items-center mt-20 w-full bg-white">
          <div>
            <h1 className="text-center text-gray-800 text-2xl font-bold mb-6">Lista de Cursos</h1>
            <hr /> <hr />
            <Table />
          </div>
        </div>
      </div> */}
    </div>
  )
}
