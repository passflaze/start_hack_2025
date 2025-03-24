# EchoAnalytics® - StartHack Project 2025

## Overview
This application listens to conversations between a financial advisor and a client via microphone input. It then predicts the optimal asset allocation, performs a backtest, calculates financial metrics and indexes, and generates a user profile text, updating the output in real-time as the conversation goes on.

## Live Demo
 [Video Link](https://www.youtube.com/watch?v=-x5jBZgiOXQ)

## Team
EchoAnalytics was developed with during March 19-20-21 in [Saint Gallen](https://www.startglobal.org/start-hack/what-is-hack)

[Leonardo Sinibaldi](https://www.linkedin.com/in/leonardo-sinibaldi-2a7414270/)

[Simone Zani](https://www.linkedin.com/in/simonezani35/)

[Giacomo Maggiore](https://www.linkedin.com/in/giacomo-maggiore-499994263/)

[Simone Ranfoni](https://www.linkedin.com/in/simoneranfoni/)

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

### Running Locally
1. Go to docker-compose.yml and put your Google AI api key

2. Build and start the backend using Docker Compose:
   ```bash
   docker compose up --build
   ```
3. Go to http://localhost:80 and try it!

## Usage
1. Enable your microphone and start speaking.
2. The app will analyze the conversation and generate an asset allocation.
3. View the backtest results and financial metrics.
4. Read the generated user profile based on the conversation.

## Contributing
Feel free to submit issues and pull requests.

## License
MIT License

