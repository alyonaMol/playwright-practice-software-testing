import { faker } from '@faker-js/faker';
import { UserRegistrationData } from '../pages/RegisterPage';

export class UserGenerator {
  static generateUser(): UserRegistrationData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: '1990-01-01',
      address: faker.location.street(),
      houseNumber: faker.location.buildingNumber(),
      postcode: '49107',
      city: faker.location.city(),
      state: faker.location.state(),
      country: 'US',
      phone: '1234567890',
      email: `test_${Date.now()}@test.com`,
      password: `P@ss4!_${faker.string.alphanumeric(8)}`,
    };
  }
}
