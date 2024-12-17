import { z, ZodErrorMap } from 'zod'

const errorMap: ZodErrorMap = (issue, ctx) => {
  if (ctx.defaultError === 'Required') {
    return { message: 'Campo obrigatório' }
  }

  // Strings

  if (issue.code === 'too_small' && issue.type === 'string') {
    return { message: `Mínimo de ${issue.minimum} caracteres` }
  }

  if (issue.code === 'too_big' && issue.type === 'string') {
    return { message: `Máximo de ${issue.maximum} caracteres` }
  }

  if (issue.code === 'invalid_string' && issue.validation === 'email') {
    return { message: `E-mail inválido` }
  }

  // Numbers

  if (issue.code === 'too_small' && issue.type === 'number') {
    return { message: `Valor mínimo de ${issue.minimum}` }
  }

  if (issue.code === 'too_big' && issue.type === 'number') {
    return { message: `Valor máximo de ${issue.maximum}` }
  }

  if (issue.code === 'not_multiple_of') {
    return { message: `Não é multiplo de ${issue.multipleOf}` }
  }

  // Arrays

  if (issue.code === 'too_small' && issue.type === 'array') {
    return { message: `Selecione pelo menos ${issue.minimum}` }
  }

  if (issue.code === 'too_big' && issue.type === 'array') {
    return { message: `Selecione até ${issue.maximum}` }
  }

  return { message: ctx.defaultError }
}

z.setErrorMap(errorMap)

export { z }
