// import { sanitize, isValidAttribute } from 'dompurify'
import DOMPurify from 'dompurify'

const isValidAttribute = DOMPurify.isValidAttribute
export { isValidAttribute }

export default DOMPurify.sanitize
