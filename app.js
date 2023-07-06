// element selectors

const githubForm = document.getElementById('github-form');
const nameInput = document.getElementById('githubname');
const clearLastUsers = document.getElementById('clear-last-users');
const lastUsers = document.getElementById('last-users');

const github = new Github();
const ui = new UI();

addEventListener();

function addEventListener() {
  githubForm.addEventListener('submit', getData);
  clearLastUsers.addEventListener('click', clearAllSearched);
  document.addEventListener('DOMContentLoaded', getAllSearched);
}

function getData(event) {
  event.preventDefault();

  let userName = nameInput.value.trim();

  if (userName === '') {
    ui.showError('Please enter a valid username.');
  } else {
    github
      .getGithubData(userName)
      .then((response) => {
        if (response.user.message === 'Not Found') {
          ui.showError('User not found.');
        } else {
          ui.addSearchedUserToUI(userName);
          Storage.addSearchedUserToStorage(userName);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo);
        }
      })
      .catch((err) => ui.showError(err));
  }

  ui.clearInput();
}

function clearAllSearched() {
  // Clear all searched

  if (confirm('Are you sure?')) {
    Storage.clearAllSearchedUsersFromStorage(); // clear from storage
    ui.clearAllSearchedFromUI(); // clear from UI
  }
}

function getAllSearched() {
  // Get searched from Storage and add to UI

  let users = Storage.getSearchedUsersFromStorage();

  let result = '';
  users.map((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });

  lastUsers.innerHTML = result;
}
