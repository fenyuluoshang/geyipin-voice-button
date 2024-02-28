import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'

export function ArrayIsIn(property: string[], validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ArrayIsIn',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          // return (
          //   typeof value === 'string' &&
          //   typeof relatedValue === 'string' &&
          //   value.length > relatedValue.length
          // ) // you can return a Promise<boolean> here as well, if you want to make async validation
          return Array.isArray(value) && value.every((item) => relatedPropertyName.includes(item))
        }
      }
    })
  }
}
