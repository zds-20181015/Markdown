import purify from "dompurify";
const isValidAttribute = purify().isValidAttribute;
const sanitize = purify.sanitize;

export { isValidAttribute };
export default sanitize;
