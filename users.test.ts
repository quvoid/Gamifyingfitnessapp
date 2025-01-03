import { createUser, getUsersTableSchema } from './users';

describe('User API', () => {
    it('should create a new user with a username', async () => {
        const email = 'test@example.com';
        const fullName = 'Test User';
        const username = 'testuser';

        const { data, error } = await createUser(email, fullName, username);

        expect(error).toBeNull();
        expect(data).toBeDefined();
        if (data) {
            expect(data[0]).toHaveProperty('email', email);
            expect(data[0]).toHaveProperty('full_name', fullName);
            expect(data[0]).toHaveProperty('username', username);
        }
    });

    it('should fetch the users table schema', async () => {
        const { data, error } = await getUsersTableSchema();
        console.log('Users Table Schema:', data, error);
        expect(error).toBeNull();
        expect(data).toBeDefined();
    });
});
