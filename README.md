# Monopoly-live Map

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5d83f7ce-1f64-42e0-928a-1ce0defd3cb8" />

### Description
In the scouts we would all play monopoly together in London visiting all the sites in person. First time attending they would give us this <a href="https://jan-spalding.github.io/Monopoly-Run-Live-Map/upload/Da%20monopoly%20booklet.pdf">booklet.</a>  This project was created with the idea to better visualise the board and allowing for planning to help the team perform better in the game. 

Each point in the booklet was found and the co-ordinates are pinned on the map using the Google Maps API. The map functions exactly how you'd expect in google maps however, using the Location Services used for your phone we can play an indicator on the map representing where the user is in real life. 

Each local subway within a the area was also marked and can be applied on the map. The button "Subway Lines" shows all the stations and which line they are apart of. The stations that are highlighted in yellow are the ones that are closest to the current users position. Done by distance calculations on each station and the player position. 

The "Route Planner" window allows the user to plan a route out. Each scout party starts in the same location and are then free to go whichever way. By clicking on a destination in the list will add it to the route and will attempt to calculate how long the route could potentially take. An eye dropper tool is available to quickly pick the points on the map. 

A separate project looked to solve this route by using a Travelling Salesman Algorithm. Since I already had the array of coordinates I could find the distance between each and turn it into a weighted graph. I then saved the best result every time it had found a better solution. After some time it had found the solution saved into savedRoute(21.9).json. 

Each route made in the route planner can be saved and then loaded into. This allows for sharing of potential routes. Loading the savedRoute(21.9).json into the website will load the route found by the Travelling Salesman Aglorithm.

### Usage
Visit the deployment page or follow this https://jan-spalding.github.io/Monopoly-Run-Live-Map/ to view the project

A prompt will display asking if the website is allowed to use your current location services to display the icon on the map
