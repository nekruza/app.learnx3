
export const isAdminOrTeacher = (userInfo: any) => {
  return userInfo?.role == "admin" || userInfo?.role == "teacher"
}

export const isAdmin = (userInfo: any) => {
  return userInfo?.role == "admin"
}

export const isTeacher = (userInfo: any) => {
  return userInfo?.role == "teacher"
}

export const isStudent = (userInfo: any) => {
  return userInfo?.role == "student"
}
