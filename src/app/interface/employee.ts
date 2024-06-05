

export interface Iemployee {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthdayDate?: number;
  basicSalary?: number;
  status?: EnumEmployeeStatus;
  group?: EnumEmployeeGroup;
  description?: string;
}

export enum EnumEmployeeStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }

  export enum EnumEmployeeGroup {
    COW = 'cow',
    GOAT = 'goat',
    CAT = 'cat',
    RABBIT = 'rabbit',
    SNAKE = 'snake',
    LION = 'lion',
    BIRD = 'bird',
    WORM = 'worm',
    TIGER = 'tiger',
    BUTTERFLY = 'butterfly',
  }

