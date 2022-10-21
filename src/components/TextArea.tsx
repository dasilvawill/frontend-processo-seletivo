interface TextAreaProps {
  textLabel?: string
  forLabel?: string
  idTextarea?: string
  valueTextArea?: string
  required?: boolean
  onChange?: (valueInput: any) => void
}

export default function Textarea(props: TextAreaProps) {
  return (
    <div className="flex flex-col mb-2">
      <label
        className="mb-2 font-light text-sm text-gray-700 dark:text-gray-50"
        htmlFor={props.idTextarea}
      >
        {props.textLabel}
      </label>
      <textarea
        id={props.idTextarea}
        value={props.valueTextArea}
        onChange={(e) => props.onChange?.(e.target.value)}
        className="h-15 mb-2 border border-gray-300 dark:border-gray-500 rounded-2xl focus:outline-none bg-gray-50 dark:bg-gray-700 px-4 py-2 focus:bg-white dark:focus:bg-gray-600 text-gray-700 dark:text-gray-50"
        required={props.required}
      />
    </div>
  )
}
