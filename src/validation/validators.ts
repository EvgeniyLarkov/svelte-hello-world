export type ValidatorInterface = string | true;

function requiredValidator() {
    return function required (value: string): ValidatorInterface {
      return (value !== undefined && value !== null && value !== '') || 'This field is required';
    }
}

function lengthValidator(min: number, max: number) {
    return function checkLength (value: string): ValidatorInterface {
      return (value.length > min && value.length < max) || `This field is out of range: ${min}-${max} chars`;
    }
}

export { requiredValidator, lengthValidator };