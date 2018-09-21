import { length } from 'ramda'

export const normalizeCCNumber = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (length(onlyNums) <= 4) {
    return onlyNums
  }
  if (length(onlyNums) <= 8) {
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`
  }
  if (length(onlyNums) <= 12) {
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 8)}-${onlyNums.slice(8)}`
  }
  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 8)}-${onlyNums.slice(8,12)}-${onlyNums.slice(12)}`
}

export const normalizeExpiry = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (length(onlyNums) <= 2) {
    return onlyNums
  }
  return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2,4)}`
}

export const normalizeCVV = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (length(onlyNums) <= 3) {
    return onlyNums
  }
  return `${onlyNums.slice(0, 3)}`
}
