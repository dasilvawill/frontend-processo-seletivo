import InputMask from "react-input-mask"

interface InputProps {
  textLabel?: string
  idInput?: string
  typeInput?: string
  valueInput?: string
  required?: boolean
  existsMask?: boolean
  mask?: string
  onChange?: (valueInput: any) => void
  onBlur?: (valueInput: any) => void
}

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col mb-2">
      <label className="mb-2 font-light text-sm text-grey-700" htmlFor={props.idInput}>
        {props.textLabel}
      </label>
      {props.existsMask ? (
        <InputMask
          className="xl:w-[480px] h-10 mb-2 border border-grey-300 rounded-2xl focus:outline-none bg-grey-50 px-4 py-2 focus:bg-white text-grey-700 focus:border-blue-300"
          id={props.idInput}
          type={props.typeInput}
          value={props.valueInput}
          onChange={(e) => props.onChange?.(e.target.value)}
          onBlur={props.onBlur}
          required={props.required}
          mask={props.mask}
        />
      ) : (
        <input
          className="w-[480px] h-10 mb-2 border border-grey-300 rounded-2xl focus:outline-none bg-grey-50 px-4 py-2 focus:bg-white text-grey-700 focus:border-blue-300"
          id={props.idInput}
          type={props.typeInput}
          value={props.valueInput}
          onChange={(e) => props.onChange?.(e.target.value)}
          onBlur={props.onBlur}
          required={props.required}
        />
      )}
    </div>
  )
}
