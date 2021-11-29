const overview = document.querySelector(".overview");
const username = "MSchak";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



const profileInfo = async function() {
    const data = await fetch (`https://api.github.com/users/${username}`);
    const user = await data.json();
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

const getRepos = async function() {
  const data = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repos = await data.json();
    displayInfo(repos)
};

getRepos();

const displayInfo = function (repos) {
    filterInput.classList.remove("hide");
  for (const repo of repos){
    const repoListItem = document.createElement("li");
    repoListItem.classList.add("repo");
    repoListItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoListItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName)
    }
});

const getRepoInfo = async function(repoName) {
    const getData = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getData.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`)
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (const language in languageData){
        if (!languages.includes(language)){
            languages.push(language);
        }
    }
    console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDataDiv = document.createElement("div");
    repoDataDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(repoDataDiv);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backButton.classList.remove("hide");

};

backButton.addEventListener("click", function(){
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");

});

filterInput.addEventListener("input", function (e) {
    const input = e.target.value;
    const reposListItem = document.querySelectorAll(".repo");
    const searchLower = input.toLowerCase();

    for (const item of reposListItem){
        const repoLI = item.innerText.toLowerCase();
        if (repoLI.includes(searchLower)){
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
    }
    }
});