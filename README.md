# Get Organization Code Scanning Alerts

A script to retrieve code scanning alerts from a GitHub organization and write
them to a CSV file.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- A GitHub Personal Access Token (PAT) with the full set of 'repo' permissions
- Your GitHub organization name

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/inspirational-impala-inc/get-code-scanning-alerts.git
	 ```
2. Navigate to the cloned repository:
	 ```sh
	 cd get-code-scanning-alerts
	 ```
2. Install the dependencies:
	 ```sh
	 npm install
	 ```

## Configuration
1. Open the `getAlerts.js` file.
2. Replace 'your-pat' with your GitHub Personal Access Token.
3. Replace 'your-organization' with your GitHub organization name.

## Usage
Run the script using Node.js:
```sh
npm start
```

This will retrieve code scanning alerts from your GitHub organization and write
them to a file named `alerts.csv`.