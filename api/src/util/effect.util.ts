import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

export const logAndRethrow = (message: string) =>
  catchError((error: Error) => {
    console.error(message, error)
    return throwError(error)
  })
