# Candidate Application Platform

A candidate application platform that allows users to view job
listings, **filter jobs based on various criteria**, with **infinite scroll** for a
seamless browsing experience.
Brief description of the project and its purpose.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)

## Installation

Step-by-step instructions on how to install and set up the project locally. For example:

1. Clone the repository: `git clone git@github.com:DayakarH/candidate-application-platform.git`
2. Navigate to the project directory: `cd candidate-application-platform`
3. Install dependencies: `npm i`
4. Create a `.env` file in the root directory and copy the contents of `.env.example` file into the `.env` file and assign the `API_URL` provided in the assignment PDF to `VITE_API_URL`

## Usage

- To start the local development server, run:

    ```bash
    npm run dev
    ```
- After the local development is up and running, open [this](http://localhost:5173/) link to view the instance in your browser.
- As soon as the app starts, the first 12 jobs from the API response are fetched, stored in redux state and displayed. Scrolling to the last job card dispatches an action that fetches the next set of 12 jobs.
- If any filters are selected and the newly loaded 12 jobs don't match the the active filters, no new job cards will be displayed. The user would need to scroll back up and then down again to the last visible job to trigger the intersection observer and load the next set of unfiltered jobs. (I'm currently working on fix this without causing any other breaking changes).

## Tech Stack

- ReactJS - UI Library
- Redux-Toolkit - For global synchronous state management
- TypeScript - For readability, maintainability, scalability and overall a better DX
- Material UI - Component Library
- CSS Modules - For scoped styling

## Folder Structure

Below is the project's directory structure:

    |-- /src/
        |-- /components/ # contains all the components used
            |-- /features/ # contains all the components specific to features
            |-- /layout/ # contains all the components specific to layout
        |-- /hooks/ # contains custom hooks
        |-- /lib/ # contains utility functions, reusable types and constants
        |--store # contains root redux store along with state slices
            |--features # contains folders for each state slice
        |-- App.tsx # contains top level <App />
        |-- main.tsx # entry point of the webapp
        |-- index.css # contains custom css reset along with few utility classes
    |-- README.md    # documentation for the project, how to set it up and use it
    |--.env.example   # contains the template to create local .env file
