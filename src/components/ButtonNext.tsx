interface ButtonProps {
  children: any
  type?: "submit"
  onClick?: () => any
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className="max-w-screen-sm w-full bg-[#4B6BFB] shadow-md shadow-gray-300 dark:shadow-gray-900 text-white font-medium rounded-2xl p-3"
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
