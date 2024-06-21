"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const fs = __importStar(require("fs"));
const dbFile = './src/database.json';
const Routes = (app) => {
    app.get('/ping', (req, res) => {
        res.send(true);
    });
    app.post('/submit', (req, res) => {
        const newSubmission = req.body;
        const submissions = getSubmissions();
        submissions.push(newSubmission);
        saveSubmissions(submissions);
        res.status(201).send('Submission received');
    });
    app.get('/read', (req, res) => {
        const index = parseInt(req.query.index, 10);
        const submissions = getSubmissions();
        if (index >= 0 && index < submissions.length) {
            res.json(submissions[index]);
        }
        else {
            res.status(404).send('Submission not found');
        }
    });
    const getSubmissions = () => {
        try {
            if (!fs.existsSync(dbFile)) {
                fs.writeFileSync(dbFile, '[]');
            }
            const data = fs.readFileSync(dbFile, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading submissions:', error);
            return [];
        }
    };
    const saveSubmissions = (submissions) => {
        try {
            fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));
        }
        catch (error) {
            console.error('Error saving submissions:', error);
        }
    };
};
exports.Routes = Routes;
