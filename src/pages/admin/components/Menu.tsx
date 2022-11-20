import Link from "next/link"
import { useContext, useState } from "react"
import Swal from "sweetalert2"
import Input from "../../../components/Input"
import { RegistrationContext } from "../../../contexts/RegistrationContext"
import { api } from "../../../services/api"

export default function Menu() {
  const { candidateData, setCandidateData, authName = 'TESTE' } = useContext(RegistrationContext)
  const [redirect, setRedirect] = useState("")
  const [cpf, setCpf] = useState("")

  function handleSearchCandidate(cpf: string) {
    api
      .get("/person/" + cpf + "/inscriptions", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then((response) => {
        setCandidateData(response.data[0])
        console.log(candidateData, "candidate")
        setRedirect("/admin/search-candidate")
      })
      .catch(() => {
        Swal.fire({
          title: "CPF não encontrado",
          text: "O candidato não existe na base de dados!",
          confirmButtonText: "Ok",
          icon: "warning"
        })
      })
  }

  return (
    <>
      <div className="hidden md:block flex-col bg-[#bccbcf] w-[23vw] border-r-[#bccbcf] border-r-4 drop-shadow-2xl">
        <p className="p-4 text-2xl">Olá, {authName} </p>
        <div className="flex-wrap flex-shrink md:flex pt-2 mx-auto text-gray-600">
          <Input
            idInput="userCpf"
            typeInput="text"
            valueInput={cpf}
            onChange={setCpf}
            placeholder="Pesquise o candidato"
            onBlur={() => !cpf.includes("_") && handleSearchCandidate(cpf)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 ml-4 rounded-lg text-sm focus:outline-none w-36 2xl:w-56"
            existsMask={true}
            mask={"999.999.999-99"}
            required
          />

          <Link href={redirect}>
            <button
              type="submit"
              className="mr-50 ml-2 -mt-2"
              onClick={() => handleSearchCandidate(cpf)}
            >
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-500 mx-2">
          <Link href="/admin/course-list">
            <button className="flex p-4 text-xl border-">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              <p className="pl-4">Cursos</p>
            </button>
          </Link>
          <Link href="/admin/registration-entrance-exam">
            <button className="flex p-4 text-xl border-">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              <p className="pl-4">Cadastro de Vestibular</p>
            </button>
          </Link>
          <button className="flex p-4 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
              />
            </svg>

            <p className="pl-4">Sincronia</p>
          </button>
          <button className="flex p-4 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
              />
            </svg>

            <p className="pl-4">Relatórios</p>
          </button>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden bg-gray-300 w-full h-38 flex-col">
        <p className="pl-4 py-5">Olá, Wymblia!</p>
        <div className="flex flex-wrap justify-center bg-gray-300">
          <button className="text-md">
            <p className="pl-4">Cadastro de Vestibular</p>
          </button>
          <button className="text-md">
            <p className="pl-4">Sincronia</p>
          </button>
          <button className="text-md">
            <p className="pl-4">Relatórios</p>
          </button>
        </div>
        <div className="pt-2 relative mx-auto text-gray-600">
          <Input
            idInput="userCpf"
            typeInput="text"
            valueInput={cpf}
            onChange={setCpf}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 sm:mx-32 rounded-lg text-sm focus:outline-none max-w-56"
            existsMask={true}
            mask={"999.999.999-99"}
            required
          />
          <Link href="/admin/search-candidate">
            <button
              type="submit"
              className="absolute -right-20 sm:right-16 top-2 mt-5 mr-24"
              onClick={() => handleSearchCandidate(cpf)}
            >
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
