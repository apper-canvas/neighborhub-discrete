const Label = ({ children, className, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-surface-700 ${className}`}>
      {children}
    </label>
  )
}

export default Label