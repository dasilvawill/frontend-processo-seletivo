import Input from "../../../../../components/Input"

interface CourseInformationProps {
  modality: string
  unity: string
  nameCourse: string
  entryFormId: string
  selectedEntranceExam: string
}

export default function CourseInformationMobile(props: CourseInformationProps) {
  return (
    <div>
      <hr />
      <h2 className="text-center text-gray-800 text-xl font-medium mb-6 mt-6">
        Informações de Curso
      </h2>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Modalidade"
            typeInput="text"
            idInput="modality"
            valueInput={props.modality}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Unidade"
            typeInput="text"
            idInput="unity"
            valueInput={props.unity}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Curso"
            typeInput="text"
            idInput="course"
            valueInput={props.nameCourse}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Forma de ingresso"
            typeInput="text"
            idInput="entryForm"
            valueInput={props.entryFormId === "2" ? "Enem ou Encceja" : "Vestibular"}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Processo Seletivo"
            typeInput="text"
            idInput="entryForm"
            valueInput={props.selectedEntranceExam}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
