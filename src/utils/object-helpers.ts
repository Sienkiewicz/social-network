import { UserType } from './../components/common/Types'
export const updateObjInArray = (
  items: UserType[],
  objPropName: string,
  itemId: number,
  newObjProps: { followed: boolean }
): UserType[] => {
  return items.map((u) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObjProps }
    }
    return u
  })
}
