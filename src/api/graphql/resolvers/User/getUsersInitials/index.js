async function getUsersInitials({ email, username }, args, { models }, info) {
  return username ? username[0] : email[0];
}

export { getUsersInitials };
