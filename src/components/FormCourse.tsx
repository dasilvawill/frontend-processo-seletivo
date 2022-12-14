import React, { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { RegistrationContext } from "../contexts/RegistrationContext"
import Course from "../core/Course"
import useCourse from "../hooks/useCourse"
import { api } from "../services/api"
import ButtonNext from "./ButtonNext"
import ButtonBack from "./ButtonBack"
import ButtonModality from "./ButtonModality"
import Input from "./Input"
import InputFile from "./InputFile"
import ButtonNotice from "./ButtonNotice"
import Select from "./Select"

interface CourseProps {
  course: Course
  courseChange?: (course: Course) => void
  backPage?: () => void
}

export default function FormCourse(props: CourseProps) {
  const {
    nameCourse,
    CPF,
    courseModality,
    modality,
    setModality,
    unity,
    setUnity,
    entryForm,
    setEntryForm,
    yearEnem,
    setYearEnem,
    codeEnemAndEncceja,
    setCodeEnemAndEncceja,
    objectiveTestGrade,
    setObjectiveTestGrade,
    redactionTestGrade,
    setRedactionTestGrade,
    selectedCourse,
    setSelectedCourse,
    selectedEntranceExam,
    setSelectedEntranceExam,
    setShowCourseName,
    setShowModalityName,
    setFilialCourse,
    setCourseShift,
    setCourseIdShift,
    setCourseMatrix,
    setCourseModality,
    setEntryFormId
  } = useContext(RegistrationContext)

  const { offerList } = useCourse()
  const unityList = []
  const coursesList = []
  const [coursesOptions, setCoursesOptions] = useState([])
  const [selectedEntranceExamEnem] = useState([])
  const [unityOptions, setUnityOptions] = useState([])
  const [listVestibular, setListVestibular] = useState<any>([])
  const [notice, setNotice] = useState([])
  const [entranceExamOptions, setEntranceExamOptions] = useState<any>([])

  const entryFormsOptions = [
    {
      label: "Vestibular",
      value: "vestibular",
      idFormFtec: 1
    },
    {
      label: "Enem/Encceja",
      value: "enem-encceja",
      idFormFtec: 2
    },
    {
      label: "TransferĂȘncia",
      value: "transferencia",
      idFormFtec: 1
    },
    {
      label: "Reingresso",
      value: "reingresso",
      idFormFtec: 1
    },
    {
      label: "Segunda GraduaĂ§ĂŁo",
      value: "segunda-graduacao",
      idFormFtec: 1
    }
  ]

  function handleModality(e: any) {
    setUnity("")
    setSelectedCourse("")
    setEntryForm("")
    setSelectedEntranceExam("")
    setNotice([])

    setModality(e.target.value)
    setShowModalityName(e.target.id)
  }

  function fillUnityByModality() {
    offerList.forEach((unity) => {
      unity.modalidade === modality
        ? !unityList.find((value) => value.label === unity.unidade)
          ? unityList.push({
              label: unity["unidade"],
              value: unity["unidade"],
              id: unity["unidade_id"]
            })
          : null
        : null
    })
    setUnityOptions(unityList)
  }

  useEffect(() => {
    fillUnityByModality()
  }, [modality])

  function fillCourseByModalityAndUnity() {
    offerList.forEach((course) => {
      course.modalidade === modality && course.unidade === unity?.value
        ? !coursesList.find((value) => value.label === course.curso)
          ? coursesList.push({
              label: course["curso"],
              value: course["curso_id"]
            })
          : null
        : null
    })
    setCoursesOptions(coursesList)
  }

  useEffect(() => {
    fillCourseByModalityAndUnity()
  }, [unity])

  useEffect(() => {
    setListVestibular([])
    setListVestibular(
      offerList.find((value) => value.curso_id === selectedCourse?.value)?.VESTIBULARES
    )
  }, [selectedCourse])

  function fillEntranceExamByModalityAndUnity() {
    if (entryForm?.value === "vestibular") {
      setEntranceExamOptions(listVestibular)
    }
    // if (entryForm?.value === "vestibular") {
    //   setEntranceExamOptions(listVestibular.label)
    //   console.log(entranceExamOptions, "wwww")
    // }
    // if (entryForm?.value === "transferencia" || entryForm?.value === "reingresso") {
    //   setEntranceExamOptions("")
    //   listVestibular?.map((vestibular) => {
    //     setListVestibular((vestibularesOptions) => [
    //       ...vestibularesOptions,
    //       {
    //         value: vestibular.value,
    //         label: vestibular.label
    //       }
    //     ])
    //   })
    //   // setEntranceExamOptions(
    //   //   listVestibular.filter((value) =>
    //   //     value.label
    //   //       ?.normalize("NFD")
    //   //       .replace(/[\u0300-\u036f]/g, "")
    //   //       .toLowerCase()
    //   //       .includes("transferencia")
    //   //   )
    //   // )
    // }
    // if (entryForm?.value === "enem-encceja") {
    //   setEntranceExamOptions([])
    //   setEntranceExamOptions(listVestibular?.filter((value) => value.permitir_nota_enem === "1"))
    // }
  }

  useEffect(() => {
    fillEntranceExamByModalityAndUnity()
  }, [entryForm])

  function handleEntryForms(e: any) {
    setSelectedEntranceExam("")
    setEntryForm(e)
    if (entryForm.value === "enem-encceja") {
      setEntryFormId("2")
    } else {
      setEntryFormId("1")
      setYearEnem("")
      setCodeEnemAndEncceja("")
      setObjectiveTestGrade("")
      setRedactionTestGrade("")
    }
  }

  function handleCourses(e: any) {
    setSelectedEntranceExam("")
    setSelectedCourse(e)
    let selectedCourse = offerList.find((value) => value.curso_id === e?.value)
    setCourseModality(selectedCourse?.modalidade_descricao)
    setFilialCourse(selectedCourse?.filial)
    setCourseShift(selectedCourse?.turno)
    setCourseIdShift(selectedCourse?.turno_id)
    setCourseMatrix(selectedCourse?.matriz_aplicada)
    setShowCourseName(selectedCourse?.descricao_inscricao)
  }

  // useEffect(() => {
  //   setListVestibular([])
  //   setListVestibular(
  //     offerList.find((value) => value.curso === selectedCourse?.value)?.VESTIBULARES
  //   )

  //   console.log(listVestibular, "aaaaaaa")
  // }, [selectedCourse])

  function setSelectedEntranceExamEnemFunction() {
    if (courseModality === "Presencial" || courseModality === "EAD") {
      switch (unity.label) {
        case "Caxias do Sul":
          setSelectedEntranceExam("1448")
          break
        case "Bento GonĂ§alves":
          setSelectedEntranceExam("1452")
          break
        case "Novo Hamburgo":
          setSelectedEntranceExam("1456")
          break
        case "Porto Alegre":
          setSelectedEntranceExam("1459")
          break
        case "IBGEN":
          setSelectedEntranceExam("1502")
          break
        case "Uniftec Caxias do Sul/RS":
          setSelectedEntranceExam("1461")
          break
        case "FTEC Bento GonĂ§alves/RS":
          setSelectedEntranceExam("1464")
          break
        case "FTEC Novo Hamburgo/RS":
          setSelectedEntranceExam("1466")
          break
        case "FTEC Porto Alegre/RS":
          setSelectedEntranceExam("1468")
          break
        case "FTEC Ibgen":
          setSelectedEntranceExam("1470")
          break
        case "Polo Uniftec Arroio dos Ratos/RS":
          setSelectedEntranceExam("1472")
          break
        case "Polo Infox InformĂĄtica SĂŁo Marcos/RS":
          setSelectedEntranceExam("1488")
          break
        case "Polo Master InformĂĄtica Jaguari/RS":
          setSelectedEntranceExam("1484")
          break
        case "Polo YĂĄzigi - GravataĂ­/RS":
          setSelectedEntranceExam("1482")
          break
        case "Polo Neuron - Casca/RS":
          setSelectedEntranceExam("1474")
          break
        case "Polo MuĂ§um":
          setSelectedEntranceExam("1486")
          break
        case "Polo Capital do Saber Feliz/RS":
          setSelectedEntranceExam("1478")
          break
        case "Polo Question Flores da Cunha RS":
          setSelectedEntranceExam("1480")
          break
        case "Polo PetrĂłpolis Porto Alegre":
          setSelectedEntranceExam("1507")
          break
        case "Polo Porto Alegre":
          setSelectedEntranceExam("1468")
          break
        case "Polo Arroio dos Ratos":
          setSelectedEntranceExam("1472")
          break
        case "Polo Casca":
          setSelectedEntranceExam("1474")
          break
        case "Polo Infoserv Treinamento- Farroupilha":
          setSelectedEntranceExam("1476")
          break
        case "Polo Feliz":
          setSelectedEntranceExam("1478")
          break
        case "Polo Flores da Cunha":
          setSelectedEntranceExam("1480")
          break
        case "Polo GravataĂ­/RS":
          setSelectedEntranceExam("1482")
          break
        case "Jaguari":
          setSelectedEntranceExam("1484")
          break
        case "Polo de MuĂ§um":
          setSelectedEntranceExam("1486")
          break
        case "Polo SĂŁo Marcos":
          setSelectedEntranceExam("1488")
          break
        case "Polo Bento GonĂ§alves":
          setSelectedEntranceExam("1464")
          break
        case "Polo Caxias do Sul":
          setSelectedEntranceExam("1461")
          break
        case "IBGEN":
          setSelectedEntranceExam("1470")
          break
        case "Polo Novo Hamburgo":
          setSelectedEntranceExam("1466")
          break
        case "Polo Farroupilha/RS":
          setSelectedEntranceExam("1476")
          break
      }
    } else if (courseModality === "Semi Presencial") {
      switch (unity.label) {
        case "FTEC Ibgen":
          setSelectedEntranceExam("1497")
          break
        case "FTEC Porto Alegre ZN":
          setSelectedEntranceExam("1495")
          break
        case "FTEC Novo Hamburgo/RS":
          setSelectedEntranceExam("1493")
          break
        case "Uniftec Caxias do Sul/RS":
          setSelectedEntranceExam("1489")
          break
        case "FTEC Bento GonĂ§alves/RS":
          setSelectedEntranceExam("1491")
          break
        case "Polo Paideia":
          setSelectedEntranceExam("1550")
          break
        case "Polo Bento GonĂ§alves":
          setSelectedEntranceExam("1491")
          break
        case "Polo Caxias do Sul":
          setSelectedEntranceExam("1489")
          break
        case "Polo Feliz":
          setSelectedEntranceExam("1500")
          break
        case "Polo Flores da Cunha":
          setSelectedEntranceExam("1501")
          break
      }
    }
    return selectedEntranceExamEnem
  }

  function handleSelectedEntranceExam(e: any) {
    entryForm?.value != "enem-encceja"
      ? setSelectedEntranceExam(e)
      : setSelectedEntranceExamEnemFunction()
    setNotice(offerList.find((value) => value.curso_id === selectedCourse?.value)?.edital)
  }

  function hanldeNotFilledSelect() {
    if (
      unity === null ||
      unity === "" ||
      selectedCourse === null ||
      selectedCourse === "" ||
      entryForm === null ||
      entryForm === "" ||
      selectedEntranceExam === null ||
      selectedEntranceExam === ""
    ) {
      Swal.fire({
        title: "OpĂ§ĂŁo nĂŁo preenchida",
        text: "Selecine todas as opĂ§Ă”es!",
        confirmButtonText: "Ok",
        icon: "warning"
      })
      return true
    }
  }

  function FormSubmit(e: any) {
    e.preventDefault()
    hanldeNotFilledSelect()
      ? null
      : props.courseChange?.(new Course(modality, unity, entryForm, yearEnem, nameCourse))
  }

  async function fileValidation(e: any) {
    let fileType = ["application/pdf"]
    let selectedFile = e.target.files[0]
    if (selectedFile && !fileType.includes(selectedFile.type)) {
      e.target.value = null
      Swal.fire({
        title: "<strong>Selecione um arquivo em formato PDF</strong>",
        html:
          "Caso precise converter o seu documento, " +
          '<a target="_blank" href="//smallpdf.com/pt/conversor-de-pdf"><b>CLIQUE AQUI</b></a> ',
        confirmButtonText: "Ok",
        icon: "info"
      })
    } else {
      if (!e.target.files[0]) {
        Swal.fire({
          title: "Escolha um arquivo!",
          confirmButtonText: "Ok",
          icon: "info"
        })
      } else if (e.target.files[0].size / 1024 / 1024 <= 2) {
        const formData = new FormData()
        formData.append("fileEnem", e.target.files[0])
        formData.append("cpf", CPF)

        await api.post("/upload-enem", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      } else if (e.target.files[0].size / 1024 / 1024 > 2) {
        e.target.value = null
        Swal.fire({
          title: "Arquivo muito grande!",
          text: "Limite mĂĄximo de 2MB",
          confirmButtonText: "Ok",
          icon: "info"
        })
      }
    }
  }

  return (
    <div>
      <form onSubmit={FormSubmit}>
        <div id="modality">
          <label className="font-light text-sm text-gray-700">Modalidade</label>
          <div className="flex mt-1 space-x-2 justify-center">
            <ButtonModality
              label="Semipresencial"
              className="sr-only peer"
              value="S"
              name="answer"
              id="Semipresencial"
              htmlFor="Semipresencial"
              onClick={handleModality}
            />

            <ButtonModality
              label="Presencial"
              className="sr-only peer"
              value="P"
              name="answer"
              id="Presencial"
              htmlFor="Presencial"
              onClick={handleModality}
            />

            <ButtonModality
              label="EAD"
              className="sr-only peer"
              value="E"
              name="answer"
              id="EAD"
              htmlFor="EAD"
              onClick={handleModality}
            />
          </div>
        </div>

        <Select
          textLabel={"Unidade/Polo"}
          name={unity?.value}
          id={unity?.value}
          key={unity?.value}
          placeholder={unity ? unity.label : "Selecione"}
          options={unityOptions}
          noOptionsMessage={"Desculpe! NĂŁo encontramos o que estava procurando âčïž"}
          onChange={(e) => setUnity(e)}
          isLoading={unityOptions.length === 0 ? true : false}
          loadingMessage={"Selecione a modalidade para ver as unidades"}
        />

        <Select
          textLabel={"Curso"}
          name={selectedCourse?.value}
          id={selectedCourse?.value}
          key={selectedCourse?.value}
          placeholder={selectedCourse ? selectedCourse?.label : "Selecione"}
          options={unity ? coursesOptions : []}
          noOptionsMessage={"Desculpe! NĂŁo encontramos o que estava procurando âčïž"}
          onChange={handleCourses}
          isLoading={coursesOptions.length === 0 ? true : false}
          loadingMessage={"Selecione a unidade ou o polo para ver os cursos"}
        />

        <Select
          textLabel={"Forma de Ingresso"}
          name={entryForm?.value}
          id={entryForm?.value}
          key={entryForm?.value}
          placeholder={entryForm ? entryForm.label : "Selecione"}
          options={selectedCourse ? entryFormsOptions : []}
          noOptionsMessage={"Desculpe! NĂŁo encontramos o que estava procurando âčïž"}
          onChange={handleEntryForms}
          isLoading={selectedCourse?.length === 0 ? true : false}
          loadingMessage={"Selecione o curso para ver as formas de ingresso"}
        />

        <div hidden={entryForm?.value === "enem-encceja"}>
          <Select
            textLabel={"Processo Seletivo"}
            name={selectedEntranceExam?.label}
            id={selectedEntranceExam?.value}
            key={selectedEntranceExam?.value}
            placeholder={selectedEntranceExam ? selectedEntranceExam.label : "Selecione"}
            options={entryForm ? entranceExamOptions : []}
            noOptionsMessage={"Desculpe! NĂŁo encontramos o que estava procurando âčïž"}
            onChange={handleSelectedEntranceExam}
            isLoading={entryForm?.length === 0 ? true : false}
            loadingMessage={"Selecione a forma de ingresso para ver os processos seletivos"}
          />
        </div>

        <div hidden={entryForm?.value != "enem-encceja"}>
          <div className="mb-2 font-light text-sm ">
            <Input
              valueInput={yearEnem || ""}
              textLabel="Informe o ano do Enem/Encceja"
              typeInput="text"
              onChange={setYearEnem}
              required={entryForm === "enem-encceja"}
            />

            <Input
              valueInput={codeEnemAndEncceja || ""}
              textLabel="Informe o cĂłdigo da inscriĂ§ĂŁo do Enem/Encceja"
              typeInput="text"
              onChange={setCodeEnemAndEncceja}
              required={entryForm === "enem-encceja"}
            />

            <Input
              valueInput={objectiveTestGrade || ""}
              textLabel="Informe a nota da prova objetiva"
              typeInput="text"
              onChange={setObjectiveTestGrade}
              required={entryForm === "enem-encceja"}
            />

            <Input
              valueInput={redactionTestGrade || ""}
              textLabel="Informe a nota da redaĂ§ĂŁo"
              typeInput="text"
              onChange={setRedactionTestGrade}
              required={entryForm === "enem-encceja"}
            />

            <InputFile
              typeInput="file"
              textLabel="Selecione o comprovante do Enem"
              onChange={fileValidation}
              accept="application/pdf"
              required={entryForm === "enem-encceja"}
              onClick={handleSelectedEntranceExam}
            />
          </div>
        </div>

        {notice?.length > 0 ? <ButtonNotice notice={notice} /> : null}

        <div className="flex flex-col mt-12">
          <ButtonNext type="submit">PrĂłximo</ButtonNext>
        </div>
        <div className="flex flex-col mt-2">
          <ButtonBack onClick={() => props.backPage()}>Voltar</ButtonBack>
        </div>
      </form>
    </div>
  )
}
