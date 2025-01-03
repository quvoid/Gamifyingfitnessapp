import express, { Request, Response } from 'express';
import { createUser, getUsers } from './api/users';
import { createActivity, getActivities } from './api/activities';
import { createReward, getRewards } from './api/rewards';
import { createUserReward, getUserRewards } from './api/userRewards';

const app = express();
app.use(express.json());

// User routes
app.post('/api/users', async (req: Request, res: Response) => {
    const { email, fullName } = req.body;
    const { data, error } = await createUser(email, fullName);
    if (error) return res.status(400).json({ error });
    res.status(201).json(data);
});

app.get('/api/users', async (req: Request, res: Response) => {
    const { data, error } = await getUsers();
    if (error) return res.status(400).json({ error });
    res.status(200).json(data);
});

// Activity routes
app.post('/api/activities', async (req: Request, res: Response) => {
    const { userId, activityType, duration, pointsEarned } = req.body;
    const { data, error } = await createActivity(userId, activityType, duration, pointsEarned);
    if (error) return res.status(400).json({ error });
    res.status(201).json(data);
});

app.get('/api/activities', async (req: Request, res: Response) => {
    const { data, error } = await getActivities();
    if (error) return res.status(400).json({ error });
    res.status(200).json(data);
});

// Reward routes
app.post('/api/rewards', async (req: Request, res: Response) => {
    const { name, description, pointsRequired } = req.body;
    const { data, error } = await createReward(name, description, pointsRequired);
    if (error) return res.status(400).json({ error });
    res.status(201).json(data);
});

app.get('/api/rewards', async (req: Request, res: Response) => {
    const { data, error } = await getRewards();
    if (error) return res.status(400).json({ error });
    res.status(200).json(data);
});

// User reward routes
app.post('/api/user_rewards', async (req: Request, res: Response) => {
    const { userId, rewardId } = req.body;
    const { data, error } = await createUserReward(userId, rewardId);
    if (error) return res.status(400).json({ error });
    res.status(201).json(data);
});

app.get('/api/user_rewards', async (req: Request, res: Response) => {
    const { data, error } = await getUserRewards();
    if (error) return res.status(400).json({ error });
    res.status(200).json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});