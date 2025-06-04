const Text = ({ children, type = 'p', className }) => {
  switch (type) {
    case 'h1':
      return <h1 className={className}>{children}</h1>
    case 'h2':
      return <h2 className={className}>{children}</h2>
    case 'h3':
      return <h3 className={className}>{children}</h3>
    case 'span':
      return <span className={className}>{children}</span>
    default:
      return <p className={className}>{children}</p>
  }
}

export default Text