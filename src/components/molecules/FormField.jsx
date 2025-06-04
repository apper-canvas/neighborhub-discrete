import Label from '../atoms/Label'
import Input from '../atoms/Input'
import Text from '../atoms/Text'

const FormField = ({ label, type = 'text', placeholder, value, onChange, id, rows, className, disabled, showCharacterCount, maxLength, limitWarningThreshold }) => {
  return (
    <div>
      {label && <Label htmlFor={id} className="mb-2">{label}</Label>}
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`w-full px-4 py-3 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none ${className}`}
          disabled={disabled}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
        />
      )}
      {showCharacterCount && maxLength && (
        <div className="flex justify-between mt-2">
          <Text type="span" className="text-sm text-surface-500">
            {value.length}/{maxLength} characters
          </Text>
          {value.length > maxLength - limitWarningThreshold && (
            <Text type="span" className="text-sm text-accent">Almost at limit</Text>
          )}
        </div>
      )}
    </div>
  )
}

export default FormField