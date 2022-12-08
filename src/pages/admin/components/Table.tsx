import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { Switch } from "@material-tailwind/react"
// import ReactHTMLTableToExcel from "react-html-table-to-excel"

export default function Table() {
  const [coursesData, setCoursesData] = useState<any>()
  useEffect(() => {
    api
      .get("/courses/get-courses", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then((response) => {
        setCoursesData(response.data)
      })
  }, [])

  return (
    <div className="flex flex-col w-[76vw]">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4 mt-2">
            {/* <ReactHTMLTableToExcel
              className="max-w-screen-sm w-[10vw] bg-blue-200 shadow-md shadow-gray-400 dark:shadow-gray-900 text-gray-800 font-medium rounded-2xl p-3"
              table="emp-table"
              filename="lista-de-cursos"
              sheet="Sheet"
              buttonText="Exportar para Excel"
            /> */}
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full border-2" id="emp-table">
              <thead className="border-b bg-gray-500">
                <tr className="border-b ">
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"
                    colSpan={2}
                  >
                    Código do Totvs
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"
                    colSpan={2}
                  >
                    Curso
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"
                    colSpan={2}
                  >
                    Modalidade
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"
                    colSpan={2}
                  >
                    Situação
                  </td>
                </tr>
              </thead>
              <tbody>
                {coursesData &&
                  coursesData.map((item) => (
                    <tr className="bg-gray-100 border-b">
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center bg-gray-100"
                        colSpan={2}
                      >
                        {item.totvs_code}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
                        colSpan={2}
                      >
                        {item.name}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
                        colSpan={2}
                      >
                        {item.modality === "P"
                          ? "Presencial"
                          : item.modality === "S"
                          ? "Semipresencial"
                          : item.modality === "E"
                          ? "EAD"
                          : null}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"
                        colSpan={2}
                      >
                        <p hidden>Ativo</p>
                        <Switch
                          className="ml-2 text-center mx-auto"
                          color="blue"
                          defaultChecked={item.active}
                          disabled
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
