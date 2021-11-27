//div with class of overview
const overview = document.querySelector(".overview");
const username = "MSchack";

const profileInfo = async function() {
    const data = await fetch (`https://api.github.com/users/${username}`);
    const user = await data.json();
    console.log(user);
    display(user)
};

profileInfo()

const display = function(user){

    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML =  
        `<figure>
            <img alt="user avatar" src=${user.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${user.login}</p>
            <p><strong>Bio:</strong> ${user.bio}</p>
            <p><strong>Location:</strong> ${user.location}</p>
            <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
        </div>`;
    overview.append(div);
}