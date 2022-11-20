import Select from "react-select"

interface SelectProps {
  textLabel: string
  name: string
  id: string
  onChange: (valueOnChange: any) => void
  placeholder: string
  options:
    | { label: string; value: string; idFormFtec?: number }[]
    | { label: string; value: number }[]
  isLoading?: boolean
  noOptionsMessage?: string
  loadingMessage?: string
  className?: string
}

export default function SelectOptions(props: SelectProps) {
  return (
    <div className="flex flex-col mb-2">
      <label className="mb-2 font-light text-sm text-gray-700 dark:text-gray-50">
        {props.textLabel}
      </label>
      <Select
        name={props.name}
        id={props.id}
        instanceId="long-value-select"
        placeholder={props.placeholder}
        options={props.options}
        onChange={props.onChange}
        isSearchable={true}
        isLoading={props.isLoading}
        noOptionsMessage={() => props.noOptionsMessage}
        loadingMessage={() => props.loadingMessage}
        className={props.className + " my-react-select-container"}
        classNamePrefix="my-react-select"
      />
    </div>
  )
}
