import app from './express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3001;
app().listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
 });
