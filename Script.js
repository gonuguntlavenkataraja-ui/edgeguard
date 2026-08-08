const BACKEND_URL = "http://172.24.94.208:5000"; // change to your PC / Pi IP

function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "admin") {
    localStorage.setItem("auth", "true");
    window.location = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

function checkAuth() {
  if (localStorage.getItem("auth") !== "true") {
    window.location = "index.html";
  }
}

function logout() {
  localStorage.removeItem("auth");
  window.location = "index.html";
}

function loadLive() {
  document.getElementById("video").src = BACKEND_URL + "/video";
}

function loadAlerts() {
  fetch(BACKEND_URL + "/events_api")
    .then(res => res.json())
    .then(data => {
      let table = document.getElementById("alertsTable");
      table.innerHTML = "";
      data.forEach(e => {
        table.innerHTML += `
          <tr>
            <td>${e.time}</td>
            <td>${e.event}</td>
            <td><img src="${BACKEND_URL}/${e.image}" width="120"></td>
          </tr>`;
      });
    });
}
