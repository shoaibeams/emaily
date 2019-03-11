const re = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/

export default emails => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false)

  if (invalidEmails.length && invalidEmails[0] !== '') {
    return `Invalid email: ${invalidEmails}`
  }
}
