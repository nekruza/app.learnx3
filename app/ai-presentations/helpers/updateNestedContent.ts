import { set } from "lodash"
import { cloneDeep } from "lodash"


export const updateNestedContent = ({ path, value, presentation }: any) => {
  const newPresentation = cloneDeep(presentation)
  const updatedPath = ['content', ...path]
  set(newPresentation, updatedPath, value)
  return newPresentation
}
