import Shellbar from "./components/Shellbar"
import Menu from "./components/Menu"

export default function HomeAdmin() {
  return (
    <div>
      <Shellbar />
      {/* DESKTOP */}
      <div className="hidden md:block">
        <div className="flex h-[92vh]">
          <Menu />
          <div className="flex justify-center items-center bg-gray-100 w-full">
            <div>
              <p className="flex items-center justify-center text-6xl pb-8">Seja bem-vindo!</p>
              <p className="text-xl">
                Pesquise o candidato desejado ou clique em algum dos menus à esquerda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex-col h-[100vh] bg-gray-100 w-full md:hidden">
        <Menu />
        <div className="flex ">
          <div>
            <p className="flex justify-center text-6xl pb-8 pt-32 sm:pt-96">Seja bem-vindo!</p>
            <p className="text-xl">
              Pesquise o candidato desejado ou clique em algum dos menus à esquerda.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
