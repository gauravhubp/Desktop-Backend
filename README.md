# Backend Server for Submission Handling

This project implements a backend server using Node.js, Express.js, and TypeScript to handle submissions for a desktop application.

## Features

- **Endpoints**:
  - `/ping`: A GET request that always returns true.
  - `/submit`: A POST request to submit new form entries.
  - `/read`: A GET request to retrieve submitted form entries by index.

- **Data Storage**: Uses a JSON file (`db.json`) to store submissions persistently.

## Prerequisites

Before running this application, ensure you have the following installed on your machine:

- Node.js (v14.x or higher)
- npm (Node Package Manager)
- TypeScript

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd backend
Install dependencies:
npm install

Build the TypeScript code:
npx tsc

Start the server:
node dist/server.js
This will start the server at http://localhost:3000.
