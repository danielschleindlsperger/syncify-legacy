import { applyTo } from 'ramda'

export const applyAll = fns => data => {
  const apply = applyTo(data)
  return fns.map(apply)
}
