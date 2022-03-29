import Factory from '@ioc:Adonis/Lucid/Factory';
import Contact from 'App/api/models/Contact';

export const ContactFactory = Factory
  .define(Contact, ({ faker }) => {
    return {
        firstName: faker.lorem.word(),
        lastName: faker.lorem.word(),
        phoneNumber: faker.phone.phoneNumber(),
        workPlace: faker.lorem.word(),
        notes: faker.lorem.sentences(2)
    }
  })
  .build();
