import * as fs from 'fs';
import { Application, Request, Response } from 'express';
import { Submission } from '../models/submission';

const dbFile = './src/database.json';

export const Routes = (app: Application) => {
    app.get('/ping', (req: Request, res: Response) => {
        res.send(true);
    });

    app.post('/submit', (req: Request, res: Response) => {
        const newSubmission: Submission = req.body;
        const submissions = getSubmissions();
        submissions.push(newSubmission);
        saveSubmissions(submissions);
        res.status(201).send('Submission received');
    });

    app.get('/read', (req: Request, res: Response) => {
        const index: number = parseInt(req.query.index as string, 10);
        const submissions = getSubmissions();
        if (index >= 0 && index < submissions.length) {
            res.json(submissions[index]);
        } else {
            res.status(404).send('Submission not found');
        }
    });

    const getSubmissions = (): Submission[] => {
        try {
            if (!fs.existsSync(dbFile)) {
                fs.writeFileSync(dbFile, '[]');
            }
            const data = fs.readFileSync(dbFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading submissions:', error);
            return [];
        }
    };

    const saveSubmissions = (submissions: Submission[]) => {
        try {
            fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));
        } catch (error) {
            console.error('Error saving submissions:', error);
        }
    };
};
