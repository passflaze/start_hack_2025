# EchoAnalytics®

## Overview
This application listens to conversations between a financial advisor and a client via microphone input. It then predicts the optimal asset allocation, performs a backtest, calculates financial metrics and indexes, and generates a user profile text, updating the output in real-time as the conversation goes on.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: FastAPI, Python
- **Containerization**: Docker, Docker Compose

## Features
- Real-time speech processing via microphone input
- AI-based asset allocation prediction
- Backtesting of asset allocations
- Calculation of financial metrics and indexes
- Automated user profile generation

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/financial-advisor-ai.git
   cd financial-advisor-ai
   ```
2. Build and start the backend using Docker Compose:
   ```bash
   docker compose up --build
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## Usage
1. Enable your microphone and start speaking.
2. The app will analyze the conversation and generate an asset allocation.
3. View the backtest results and financial metrics.
4. Read the generated user profile based on the conversation.

## Contributing
Feel free to submit issues and pull requests.

## License
MIT License

