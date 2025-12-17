const express = require('express');
const Database = require('better-sqlite3');
const cookieParser = require('cookie-parser');

async function main() {
    const { betterAuth } = await import('better-auth');

    // Initialize Express app
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Initialize database
    const db = new Database('auth.db');
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        software_background TEXT,
        hardware_background TEXT
      )
    `);

    // Initialize better-auth
    const auth = betterAuth({
        database: {
            type: 'better-sqlite3',
            source: db,
        },
        hooks: {
            // Collect extra data on signup
            signup: async (data) => {
                return {
                    ...data,
                    software_background: data.software_background || null,
                    hardware_background: data.hardware_background || null,
                };
            }
        }
    });

    // --- Routes ---

    // Signup route
    app.post('/signup', async (req, res) => {
        try {
            const { email, password, software_background, hardware_background } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }

            const user = await auth.signup(email, password, { software_background, hardware_background });
            const { session, sessionId } = await auth.createSession(user.id);
            
            res.cookie('sessionId', sessionId, { httpOnly: true, secure: false, maxAge: 3600000 }); // secure: false for localhost
            res.status(201).json({ message: 'Signup successful!', user: { id: user.id, email: user.email } });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Signin route
    app.post('/signin', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await auth.signin(email, password);
            const { session, sessionId } = await auth.createSession(user.id);
            
            res.cookie('sessionId', sessionId, { httpOnly: true, secure: false, maxAge: 3600000 });
            res.status(200).json({ message: 'Signin successful!', user: { id: user.id, email: user.email } });
        } catch (error) {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });

    // Protected route to view user profile
    app.get('/profile', async (req, res) => {
        try {
            const sessionId = req.cookies.sessionId;
            const user = await auth.getUser(sessionId);
            
            // Fetch full user profile from the database
            const userProfile = db.prepare('SELECT id, email, software_background, hardware_background FROM users WHERE id = ?').get(user.id);

            if (!userProfile) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(userProfile);
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized. Please sign in.' });
        }
    });

    // Signout route
    app.post('/signout', async (req, res) => {
        try {
            const sessionId = req.cookies.sessionId;
            await auth.deleteSession(sessionId);
            res.clearCookie('sessionId');
            res.status(200).json({ message: 'Signout successful' });
        } catch (error) {
            res.status(400).json({ message: 'Could not sign out.' });
        }
    });


    // --- Server ---
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log('\nAvailable Routes:');
        console.log('  POST /signup (email, password, software_background, hardware_background)');
        console.log('  POST /signin (email, password)');
        console.log('  GET  /profile (requires cookie)');
        console.log('  POST /signout (requires cookie)');
    });

    // Graceful shutdown
    process.on('exit', () => db.close());
    process.on('SIGHUP', () => process.exit(128 + 1));
    process.on('SIGINT', () => process.exit(128 + 2));
    process.on('SIGTERM', () => process.exit(128 + 15));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
