import { useContext, useEffect } from "react"
import Shellbar from "./components/Shellbar"
import Menu from "./components/Menu"
import { RegistrationContext } from "../../contexts/RegistrationContext"
import PersonalInformation from "./components/candidateInformation/desktop/PersonalInformation"
import AddressInformation from "./components/candidateInformation/desktop/AddressInformation"
import CourseInformation from "./components/candidateInformation/desktop/CourseInformations"
import PersonalInformationMobile from "./components/candidateInformation/mobile/PersonalInformation"
import AddressInformationMobile from "./components/candidateInformation/mobile/AddressInformations"
import CourseInformationMobile from "./components/candidateInformation/mobile/CourseInformation"
import moment from "moment"

export default function SearchCandidate() {
  const {
    name,
    setName,
    socialName,
    CPF,
    setCPF,
    birthDate,
    setBirthDate,
    gender,
    setGender,
    email,
    setEmail,
    phone,
    setPhone,
    cep,
    setCep,
    state,
    setState,
    city,
    setCity,
    district,
    setDistrict,
    street,
    setStreet,
    number,
    setNumber,
    complement,
    setComplement,
    unity,
    setUnity,
    modality,
    setModality,
    nameCourse,
    setNameCourse,
    entryFormId,
    setEntryFormId,
    selectedEntranceExam,
    setSelectedEntranceExam,
    candidateData
  } = useContext(RegistrationContext)

  useEffect(() => {
    setName(candidateData?.person.complete_name)
    setCPF(candidateData?.person.cpf)
    setBirthDate(parseDataBR(candidateData?.person.birth_date))
    setGender(candidateData?.person.gender)
    setEmail(candidateData?.person.email)
    setPhone(candidateData?.person.phone_number)

    setCep(candidateData?.person.address.postal_code)
    setState(candidateData?.person.address.uf.federation_unity)
    setCity(candidateData?.person.address.city)
    setDistrict(candidateData?.person.address.district)
    setStreet(candidateData?.person.address.street)
    setNumber(candidateData?.person.address.number)
    setComplement(candidateData?.person.address.complement)

    setModality(
      candidateData?.course.modality === "E"
        ? "EAD"
        : candidateData?.course.modality === "P"
        ? "Presencial"
        : candidateData?.course.modality === "S"
        ? "Semipresencial"
        : null
    )
    setSelectedEntranceExam(candidateData?.entrance_exam?.entrance_exam)
    setUnity(candidateData?.course?.AppliedMatrix[0].unity?.unit_name)
    setNameCourse(candidateData?.course.name)
  }, [])

  function parseDataBR(birthDate: string) {
    return moment(candidateData?.person?.birth_date).utc().format("DD/MM/YYYY")
  }

  // console.log(candidateData?.course?.AppliedMatrix[0].unity?.unit_name, "teste")
  // console.log(candidateData?.person.birth_date)
  // console.log(birthDate, "birthDate")

  return (
    <div>
      {/* DESKTOP */}
      <Shellbar />
      <div className="hidden md:flex ">
        <Menu />
        <div className="flex justify-center items-center mt-20 w-full bg-white">
          <div>
            <h1 className="text-center text-gray-800 text-2xl font-bold mb-6">
              Informações do candidato
            </h1>
            <hr /> <hr />
            <PersonalInformation
              name={name}
              socialName={socialName}
              CPF={CPF}
              birthDate={birthDate}
              gender={gender}
              email={email}
              phone={phone}
            />
            <AddressInformation
              cep={cep}
              state={state}
              city={city}
              district={district}
              street={street}
              number={number}
              complement={complement}
            />
            <CourseInformation
              modality={modality}
              unity={unity}
              nameCourse={nameCourse}
              entryFormId={entryFormId}
              selectedEntranceExam={selectedEntranceExam}
            />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex-wrap ">
        <Menu />
        <div className="flex justify-center items-center h-[92vh] mt-20 w-full bg-white">
          <div className="h-full bg-white rounded">
            <h1 className="text-center text-gray-800 text-2xl font-bold mb-6">
              Informações do candidato
            </h1>
            <PersonalInformationMobile
              name={name}
              socialName={socialName}
              CPF={CPF}
              birthDate={birthDate}
              gender={gender}
              email={email}
              phone={phone}
            />
            <AddressInformationMobile
              cep={cep}
              state={state}
              city={city}
              district={district}
              street={street}
              number={number}
              complement={complement}
            />
            <CourseInformationMobile
              modality={modality}
              unity={unity}
              nameCourse={nameCourse}
              entryFormId={entryFormId}
              selectedEntranceExam={selectedEntranceExam}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
