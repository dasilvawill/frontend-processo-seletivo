import Input from "../../../../../components/Input"

interface AddressInformationProps {
  cep: string
  state: string
  city: string
  district: string
  street: string
  number: string
  complement: string
}

export default function AddressInformationMobile(props: AddressInformationProps) {
  return (
    <div>
      <hr />
      <h2 className="text-center text-gray-800 text-xl font-medium mb-6 mt-6">
        Informações de Endereço
      </h2>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="CEP"
            idInput="cep"
            typeInput="cep"
            valueInput={props.cep}
            existsMask={true}
            mask="99999-999"
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Estado"
            typeInput="text"
            idInput="state"
            valueInput={props.state}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Cidade"
            typeInput="text"
            idInput="city"
            valueInput={props.city}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Bairro"
            typeInput="text"
            idInput="district"
            valueInput={props.district}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Rua"
            typeInput="text"
            idInput="street"
            valueInput={props.street}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Número"
            typeInput="text"
            idInput="number"
            valueInput={props.number}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mb-4 mx-4">
          <Input
            textLabel="Complemento"
            typeInput="text"
            idInput="complement"
            valueInput={props.complement}
            className="w-[72vw]"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
