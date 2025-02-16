import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { email: string };
        }
    }
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb+srv://admin-joshua:Atanuje99@cluster0.fgvv9ms.mongodb.net/test';
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectDB();

const db = client.db('spacey');
const usersCollection = db.collection('users');
const eventsCollection = db.collection('events');

const SECRET_KEY = 'your-secret-key';

// Middleware to verify JWT
const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded as { email: string };
        next();
    });
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, username } = req.body;
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ email, password: hashedPassword, username });
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Signup successful', token });
});

app.post('/api/auth/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Signin successful', token, user });
});

// Profile Routes
app.get('/api/profile', authenticate, async (req, res) => {
    const user = await usersCollection.findOne({ email: req.user?.email });
    res.json(user);
});

app.put('/api/profile', authenticate, async (req, res) => {
    const { username, profileImage } = req.body;
    await usersCollection.updateOne(
        { email: req.user?.email },
        { $set: { username, profileImage } }
    );
    res.json({ message: 'Profile updated' });
});

// Event Routes
app.get('/api/events', async (req, res) => {
    const events = await eventsCollection.find().toArray();
    res.json(events);
});

app.post('/api/events', authenticate, async (req, res) => {
    const event = req.body;
    await eventsCollection.insertOne(event);
    res.json({ message: 'Event created', event });
});

app.listen(5000, () => console.log('Server running on port 5000'));