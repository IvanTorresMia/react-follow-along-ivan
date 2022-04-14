var faker = require("faker");

module.exports = () => {
  faker.seed(1234567890);
  let data = { contacts: [] };
  for (let i = 0; i < 10; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    data.contacts.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: faker.internet.exampleEmail(firstName, lastName),
      phone: faker.phone.phoneNumber(),
      avatar: `${i}.png`,
    });
  }
  return data;
};
