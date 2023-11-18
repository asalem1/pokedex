# Pokedex

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

This Pokedex serves as an encyclopedia or database of information about various Pokemon species. Trainers in the Pokemon world use the Pokedex to obtain information about Pokemon they encounter during their journeys. The device provides details such as a Pokemon's type, height, weight, and a brief description of its characteristics.

This Pokedex allows the user to search pokemon by their name, finding all their associated metadata. The pokedex also stores their past searches for easier pokemon retrieval.

## How to Get Started

Before you begin, ensure you have the following installed:

### Prerequisites

[Node.js](https://nodejs.org/en):

### Installation

Clone the repository: git clone https://github.com/asalem1/pokedex.git

Navigate to the project directory:

`cd pokedex`

Install dependencies:

### `npm install`

Installs the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
Open your browser and visit http://localhost:3000 to view the Pokedex.

### `npm run format`

Formats the project to align with the linter specifications

## How to Use

When the app is up and running, you can search for the pokemon you want to find out about by typing in the input field in the right panel.
Selecting a pokemon from the dropdown will populate the pokedex with all the information you need to know about the pokemon
Once you've selected an pokemon from the list, that selection will be saved in the past searches

## Future Improvements

- Add tests
- Flesh out the TS types
- Update the API to allow for partial name matching
- Update the UI to handle various loading states differently through each section
- Add a randomize button to randomly select a pokemon
