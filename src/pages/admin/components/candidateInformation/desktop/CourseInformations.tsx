import Input from "../../../../../components/Input"

interface CourseInformationProps {
  modality: string
  unity: string
  nameCourse: string
  entryFormId: string
  selectedEntranceExam: string
}

export default function CourseInformation(props: CourseInformationProps) {
  return (
    <div className="h-full bg-white rounded">
      <hr /> <hr />
      <h2 className="text-center text-gray-800 text-xl font-medium mb-12 mt-6">
        Informações de Curso
      </h2>
      <div className="flex mt-6">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Modalidade"
            typeInput="text"
            idInput="modality"
            valueInput={props.modality}
            className="w-[20vw]"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Unidade"
            typeInput="text"
            idInput="unity"
            valueInput={props.unity}
            className="w-[20vw]"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Curso"
            typeInput="text"
            idInput="course"
            valueInput={props.nameCourse}
            className="w-[20vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-6">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Forma de ingresso"
            typeInput="text"
            idInput="entryForm"
            valueInput={props.entryFormId === "2" ? "Enem ou Encceja" : "Vestibular"}
            className="w-[20vw]"
            disabled
          />
        </div>
        <div className="flex flex-col mb-28 mx-4">
          <Input
            textLabel="Processo Seletivo"
            typeInput="text"
            idInput="entryForm"
            valueInput={props.selectedEntranceExam}
            className="w-[20vw]"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
