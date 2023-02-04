## Star Wars Encyclopedia

Build a small app in React Native, displaying info taken the Star Wars API.

The two important things are:

- it's easy to build and test
- you send us a link to a Github repository with your code.

### Specs

This app will use the graphql star wars API (located at https://graphql.org/swapi-graphql) to get data.
The app is composed of 3 screens:

- home screen: composed of 2 tabs:

  - episode tab: display the list of available movies, with a toggle on the side to change the order by release date (from oldest to newest or from newest to oldest). Each movie will be displayed by title, release date and the first 50 characters of the opening scroll (truncated). When a user taps on a movie, he's redirected to the movie screen

  - liked characters tab: display list of liked characters by the user. When a user taps on one character, he's redirected to the character screen

- movie screen: display the following information: title, release date, full opening scroll, total species count, total planet count, total vehicle count and an infinite scroll of characters. Each character cell will display the character name. When the user taps on a character, he's redirected to the character screen. He can also back out of this screen to go back to the home screen.
- character screen: display the following information: character name, birthyear, height, mass, homeworld and movies he has appeared in. There's also a like/unlike button. When the user likes a character, he will appear in the liked characters tab on the home screen. When the user unlikes a character, he will be removed from the liked characters tab on the home screen. The user can also back out of this screen (and returns to the previous screen) or tap on one of the movies and be redirected to that particular movie screen. If the user double taps on the Character page, it will like/unlike this character (a la instagram) and display an animation (like a heart that fades in/scales up and go from empty to full in the middle of the screen)

### Additional details

The app is portrait mode only, but we should make sure everything scales correctly, from phone to tablets.

Libraries encouraged to use:

- apollo
- react-navigation
- react-native-reanimated

Let me know if you have any question (you can email me at crenn@freshplanet.com), we also value how long it takes candidates to do the test and are generally looking for submission in less than two weeks

Good luck
