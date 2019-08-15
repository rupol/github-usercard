/* Step 1: using axios, send a GET request to the following URL 
  (replacing the palceholder with your Github name):
  https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
  github info! You will need to understand the structure of this 
  data in order to use it to build your component function 

  Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
  create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
  follow this link in your browser https://api.github.com/users/<Your github name>/followers 
  , manually find some other users' github handles, or use the list found 
  at the bottom of the page. Get at least 5 different Github usernames and add them as
  Individual strings to the friendsArray below.
  
  Using that array, iterate over it, requesting data for each user, creating a new card for each
  user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
  Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

// create component function
function gitCard(
  imageUrl,
  titleText,
  usernameText,
  userLocationText,
  profileHref,
  followerCount,
  followingCount,
  userBioText
) {
  // <div class="card">
  const card = document.createElement("div");
  card.classList.add("card");

  // <img src={image url of user} />
  const image = document.createElement("img");
  image.src = imageUrl;
  card.appendChild(image);

  // <div class="card-info">
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  card.appendChild(cardInfo);

  // <h3 class="name">{users name}</h3>
  const title = document.createElement("h3");
  title.classList.add("name");
  title.textContent = titleText;
  cardInfo.appendChild(title);

  // <p class="username">{users user name}</p>
  const username = document.createElement("p");
  username.classList.add("username");
  username.textContent = usernameText;
  cardInfo.appendChild(username);

  // <p>Location: {users location}</p>
  const userLocation = document.createElement("p");
  userLocation.textContent = `Location: ${userLocationText}`;
  cardInfo.appendChild(userLocation);

  // <p>Profile:
  const userProfile = document.createElement("p");
  userProfile.textContent = "Profile: ";
  cardInfo.appendChild(userProfile);

  // <a href={address to users github page}>{address to users github page}</a>
  const profileLink = document.createElement("a");
  profileLink.href = profileHref;
  profileLink.textContent = profileHref;
  userProfile.appendChild(profileLink);

  // <p>Followers: {users followers count}</p>
  const userFollowers = document.createElement("p");
  userFollowers.textContent = `Followers: ${followerCount}`;
  cardInfo.appendChild(userFollowers);

  // <p>Following: {users following count}</p>
  const userFollowing = document.createElement("p");
  userFollowing.textContent = `Following: ${followingCount}`;
  cardInfo.appendChild(userFollowing);

  // <p>Bio: {users bio}</p>
  const userBio = document.createElement("p");
  userBio.textContent = `Bio: ${userBioText}`;
  cardInfo.appendChild(userBio);

  return card;
}

/*
// followers array
const followersArray = [
  "rupol",
  "muhkyle",
  "clifhodges13",
  "lcrt215",
  "radeleon",
  "rm-lee",
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

// create array of github user urls from followers array
const followersUrl = followersArray.map(item => {
  const url = "https://api.github.com/users/";
  return url + item;
});

// iterate over followers urls
followersUrl.forEach(item => {
  axios
    // requesting data for each user
    .get(item)
    .then(response => {
      // network request resolved
      // create a new card for each user
      const card = gitCard(
        response.data.avatar_url,
        response.data.name,
        response.data.login,
        response.data.location,
        response.data.html_url,
        response.data.followers,
        response.data.following,
        response.data.bio
      );

      // add each user card to the DOM
      const container = document.querySelector(".cards");
      container.appendChild(card);
    })
    .catch(error => {
      // network request rejected
      console.log("Network request was unsuccessful");
      console.log(error);
    });
});
*/

// stretch - programmatically create following array
axios
  .get("https://api.github.com/users/rupol/following")
  .then(response => {
    // network request resolved
    // create following array from response data
    const followingArray = response.data;

    // create array of following urls
    const followingUrl = followingArray.map(item => {
      return item.url;
    });

    // iterate over following urls
    followingUrl.forEach(item => {
      axios
        // requesting data for each user
        .get(item)
        .then(response => {
          // network request resolved
          // create a new card for each user
          const card = gitCard(
            response.data.avatar_url,
            response.data.name,
            response.data.login,
            response.data.location,
            response.data.html_url,
            response.data.followers,
            response.data.following,
            response.data.bio
          );

          // add each user card to the DOM
          const container = document.querySelector(".cards");
          container.appendChild(card);
        })
        .catch(error => {
          // network request rejected
          console.log("Network request was unsuccessful");
          console.log(error);
        });
    });
  })
  .catch(error => {
    // network request rejected
    console.log("Network request was unsuccessful");
    console.log(error);
  });
