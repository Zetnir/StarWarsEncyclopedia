## Star Wars Encyclopedia

I built a small app in React Native, displaying info taken the Star Wars API.


## Install and start

It should be really easy to install and start the application 
For installation do 

`npm install`

For starting the application do

`npm start`

That's it!


### Specs

This app will use the graphql star wars API (located at https://graphql.org/swapi-graphql) to get data.
The app is composed of 3 screens:

- home screen: composed of 2 tabs:

  - episode tab: display the list of available movies, with a toggle on the side to change the order by release date (from oldest to newest or from newest to oldest). Each movie will be displayed by title, release date and the first 50 characters of the opening scroll (truncated). When a user taps on a movie, he's redirected to the movie screen

  - liked characters tab: display list of liked characters by the user. When a user taps on one character, he's redirected to the character screen

- movie screen: display the following information: title, release date, full opening scroll, total species count, total planet count, total vehicle count and an infinite scroll of characters. Each character cell will display the character name. When the user taps on a character, he's redirected to the character screen. He can also back out of this screen to go back to the home screen.
- character screen: display the following information: character name, birthyear, height, mass, homeworld and movies he has appeared in. There's also a like/unlike button. When the user likes a character, he will appear in the liked characters tab on the home screen. When the user unlikes a character, he will be removed from the liked characters tab on the home screen. The user can also back out of this screen (and returns to the previous screen) or tap on one of the movies and be redirected to that particular movie screen. If the user double taps on the Character page, it will like/unlike this character (a la instagram) and display an animation (like a heart that fades in/scales up and go from empty to full in the middle of the screen)

code écrit par Ludovic Bonheur