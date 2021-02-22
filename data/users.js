import bcrypt from "bcryptjs";

const users = [
  {
    name: "Piotr Migas",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jan Kowalski",
    email: "jan@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Anna Kowalska",
    email: "anna@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
