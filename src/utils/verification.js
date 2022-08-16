export function CheckEmail(data) {
  let reg = /^([a-zA-z]|[0-9])(\w|-)+@[a-zA-z0-9]+\.([a-zA-Z]{2,4})$/
  return !reg.test(data) ? true : false
}

export function CheckPwd(data) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/
  return !reg.test(data) ? true : false
}
