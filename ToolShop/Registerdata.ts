export type FormData = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    country: string;
    postalCode: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    phone: string;
    emailAddress: string;
    password: string;

};

export type FormScenario = {
    description: string;
    formData: Partial<FormData>;
    expectedError?: string;
};

const randomEmail = (): string => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 100);
    return `johndoe${timestamp}${randomSuffix}@mail.com`;
};

export const validScenarios: FormScenario[] = [
    {
        description: 'valid registration with all fields filled',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: randomEmail(),
            password: 'P@sswzzzzord123!',
        },
        expectedError: 'A customer with this email address already exists.',
    },
];

export const invalidScenarios: FormScenario[] = [
    {
        description: 'empty first name',
        formData: {
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'First name is required',
    },
    {
        description: 'empty last name',
        formData: {
            firstName: 'John',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'Last name is required',
    },
    {
        description: 'empty Date of Birth',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'Date of Birth is required',
    },
    {
        description: 'invalid format of Date of Birth',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-May-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'Please enter a valid date in YYYY-MM-DD format.',
    },
    {
        description: 'empty Postal Code',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'Postcode is required',
    },
    {
        description: 'empty House Number',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'House number is required',
    },
    {
        description: 'empty Street',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'Street is required',
    },
    {
        description: 'empty City',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'City is required',
    },
    {
        description: 'empty State',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'State is required',
    },
    {
        description: 'empty Phone',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            emailAddress: 'johndoe@mail.com',
            password: 'Password1!',
        },
        expectedError: 'Phone is required.',
    },
    {
        description: 'empty email',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            password: 'Password1!',
        },
        expectedError: 'Email is required',
    },
    {
        description: 'invalid email format',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoeom',
            password: 'Password1!',
        },
        expectedError: 'Email format is invalid',
    },
    {
    description: 'email already exists',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'admin@practicesoftwaretesting.com',
            password: 'P@sswzzzzord123!',
        },
        expectedError: 'A customer with this email address already exists.',
    },
    {
        description: 'empty password',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
        },
        expectedError: 'Password is required',
    },
    {
        description: 'password does not meet minimal length',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: '@aS12',
        },
        expectedError: 'Password must be minimal 6 characters long.',
    },
    {
        description: 'password includes invalid characters',
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2000-01-01',
            country: 'Canada',
            postalCode: '1234',
            houseNumber: '12',
            street: 'Vickie Hill',
            city: 'Vancouver',
            state: 'Ontario',
            phone: '12345678',
            emailAddress: 'johndoe@mail.com',
            password: '*****&',
        },
        expectedError: 'Password must be minimal 6 characters long.',
    },
];
