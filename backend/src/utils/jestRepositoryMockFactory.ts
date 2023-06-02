import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => ({
      ...entity,
      validateInputPassword: (password: string) => {
        switch (password) {
          case 'caseIncorrectPassword':
            return false;
          default:
            return true;
        }
      },
    })),
    save: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    validateInputPassword: jest.fn((entity) => entity),
  }),
);

export const sharingRepositoryMockFactory: () => MockType<Repository<any>> =
  jest.fn(() => ({
    save: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    find: jest.fn(() => [
      { id: 123, link: 'https://www.youtube.com/watch?v=-4rfUS9fCEw' },
    ]),
  }));
