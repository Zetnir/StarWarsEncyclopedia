## Star Wars Encyclopedia

This project is a mobile app in React Native, displaying info taken from the Star Wars API.


## Install and start

To use Expo CLI, you need to have the following tools installed on your developer machine:

- Node.js LTS release - Only Node.js LTS releases (even-numbered) are recommended. As Node.js officially states, "Production applications should only use Active LTS or Maintenance LTS releases".
- Git

Install all the packages and dependencies 

`npm install`

Then start the application

`npm start`

The expo app should start and you can scan the QR code to run it on your phone.

Install the Expo Go app on your iOS or Android phone and connect to your computer by scanning the QR code.

The npm start command use expo start --tunnel command to start the application. If you want to start the app on the local network you can use

`npm run start local`

That's it!

### Specs

This app will use the graphql star wars API (located at https://graphql.org/swapi-graphql) to get data.
The app is composed of 3 screens:

- home screen: composed of 2 tabs:

  - episode tab: display the list of available movies, with a toggle on the side to change the order by release date (from oldest to newest or from newest to oldest). Each movie will be displayed by title, release date and the first 50 characters of the opening scroll (truncated). When a user taps on a movie, he's redirected to the movie screen

  - liked characters tab: display list of liked characters by the user. When a user taps on one character, he's redirected to the character screen

- movie screen: display the following information: title, release date, full opening scroll, total species count, total planet count, total vehicle count and an infinite scroll of characters. Each character cell will display the character name. When the user taps on a character, he's redirected to the character screen. He can also back out of this screen to go back to the home screen.
- character screen: display the following information: character name, birthyear, height, mass, homeworld and movies he has appeared in. There's also a like/unlike button. When the user likes a character, he will appear in the liked characters tab on the home screen. When the user unlikes a character, he will be removed from the liked characters tab on the home screen. The user can also back out of this screen (and returns to the previous screen) or tap on one of the movies and be redirected to that particular movie screen. If the user double taps on the Character page, it will like/unlike this character (a la instagram) and display an animation (like a heart that fades in/scales up and go from empty to full in the middle of the screen)

code written by Ludovic Bonheur (allias: Zetnir)