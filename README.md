# Statisticx
The project demonstrates my technical skills by creating a React application in TypeScript, using Ant Design for UI components, to analyze and visualize ML Engineer salary data from 2020 to 2024.
## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
## Features
### Task 1: Basic Table
- **Main Table**: Displays ML Engineer salary data with the following columns:
  1. Year
  2. Number of total jobs for that year
  3. Average salary in USD
- **Sorting**: Users can sort the table by any column.
### Task 2: Analytics
- **Line Graph**: Visualizes the change in the number of jobs from 2020 to 2024.
- **Aggregated Table**: When a row from the main table is clicked, a second table appears displaying aggregated job titles and the number of jobs for the selected year.
## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript for static type checking.
- **Ant Design**: UI library for React.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Query**: Library for fetching, caching, and updating data in React applications.
- **Express**: Web framework for Node.js.
- **CSVtoJSON**: Library for converting CSV data to JSON.
- **Unzipper**: Library for extracting files from zip archives.
## Installation
1. **Clone the repository:**
  ```git clone https://github.com/shivamb11/statisticx.git
  cd statisticx
  ```
2. **Install server dependencies:**
  ```cd api
  npm install
  ```
3. **Install client dependencies:**
  ```cd client
  npm install
  ```
## Usage

1. **Start the server:**
  ```
  npm run api (outside api directory)
  ```

3. **Start the client:**
  ```
  npm run client (outside client directory)
  ```
