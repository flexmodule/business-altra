// 正则参考 assets\seed\docs\regexp
// https://wiki.dxy.net/pages/viewpage.action?pageId=31031578

// realname
export const REALNAME = /^[\u4e00-\u9fa5][\u4e00-\u9fa5·]{1,6}$|^[a-zA-Z][a-zA-Z\s]{1,31}$/

// cellphone
export const CELLPHONE = /(13\d|14[57]|15[^4,\D]|17[3678]|18\d)\d{8}|170[059]\d{7}/

// email
export const EMAIL = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/

// company
export const COMPANY = /^[\u4e00-\u9fa5][a-zA-Z\u4e00-\u9fa5（）]{2,63}$|^[a-zA-Z][a-zA-Z\(\) ]{5,63}$/

// position
export const POSITION = /^[\u4e00-\u9fa5]{1,64}$/

// telephone
export const TELEPHONE = /^\d{3,4}\-?\d{7,8}(\-?\d{3,4})?$/

// address
export const ADDRESS = /.{4,120}/

// pid
export const PID = /\d{15}|\d{17}[0-9Xx]/

// certificateno
export const CERTIFICATENO = /(19|20)[0-9]{2}(1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])[1-4]{1}([1-3]0|4[1-6])/

// qualificationno
export const QUALIFICATIONNP_COMMON = /(?:(?:[1-4]{1}(?:[1-3]0|4[1-8]))|(?:[x]{1}(?:10|4[1-8])))(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])[0-9]{4}[0-9a-z]{6}/
export const QUALIFICATIONNP_ARMY = /^[0-9]{16,17}$/
export const QUALIFICATIONNP_GAT = /^[1-3](?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])[0-9]{10}$/
