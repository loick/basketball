# BASKETBALL

Interactive basketball court to get easily the statistics of a player compared to his league.

## Init

`npm install`

Then

`npm start`

open your localhost on :

`http://localhost:8080/`

That's it :)

## TECH STACK

- ReactJS
- ES6/7
- Webpack
- PostCSS


##TODO

- Import / API to get the datas of the players
- Add the spidergraph to the experiment
- Enable n graph stats on the same spidergraph (current : only 1)
- Use redux
- Add a postCSS linter
- Add tests on components (Enzyme from Airbnb)
- Loader animation to the React Component
- Attach CSS to its component
- Remove player focus before switching rotate.
- Disable switch during rotation.


## Server : API
- League (Year, Name, Country, logo)
- Teams (Name, Primary color, Secondary Color, latitude, longitude)
- Players (Name, firstname, age, height, weight, country, number, position)
- Stats (points, rebounds, blocks, steals, %1pt, %2pts, %3pts, assists, turnovers, fouls, ranking)

Cross filters :
- Get highest stat of each category in a league
- Get highest stat of each category in a league only for the point gards (filter by position)
