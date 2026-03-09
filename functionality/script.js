// User Credential Validation
// const user = {
//   userName: "admin",
//   password: "admin123",
// };

// const userLogin = () => {
//   const loginForm = document.getElementById("login-form");
//   const mainSection = document.getElementById("main-section");
//   const username = document
//     .getElementById("username")
//     .value.trim()
//     .toLowerCase();
//   const password = document.getElementById("password").value.trim();
//   if (username === user.userName && password === user.password) {
//     loginForm.classList.add("hidden");
//     mainSection.classList.remove("hidden");
//   } else {
//     alert("Wrong credentials. Please try again");
//   }
// };

// Loading All Issues
const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");
const issueCounter = document.getElementById("issue-counter");
const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const loadingSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cards").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("cards").classList.remove("hidden");
  }
};
const loadingAllIssues = async () => {
  loadingSpinner(true);
  btnOpen.classList.remove("btn-active");
  btnClosed.classList.remove("btn-active");
  btnAll.classList.add("btn-active");
  const response = await fetch(url);
  const data = await response.json();
  issueCounter.innerText = `${data.data.length} Issues`;
  showLoadedData(data.data);
  loadingSpinner(false);
};
const cards = document.getElementById("cards");
const showLoadedData = (issues) => {
  cards.innerHTML = "";
  for (iss of issues) {
    const card = document.createElement("div");
    card.innerHTML = `<div onclick="openIssueInfo(${iss.id})"
          id="card"
          class="bg-[#FFFFFF] p-4 rounded-lg drop-shadow-xl space-y-3 border-t-5 h-full ${iss.status === "open" ? `border-t-green-500` : `border-t-red-500`} cursor-pointer hover:${iss.status === "open" ? `bg-green-100` : `bg-red-100`}"
        >
        <div class="flex justify-between">
            <div>${iss.status === "open" ? `<img src="assets/Open-Status.png">` : `<img src="assets/Closed- Status .png">`}</div>
            <div class="text-red-500 bg-red-200 px-6 py-1.5 rounded-full">
              ${iss.priority}
            </div>
          </div>
          <div>
            <h3 class="text-[14px] font-semibold">
              ${iss.title}
            </h3>
            <p class="text-[12px] text-[#64748B]">
              ${iss.description}
            </p>
          </div>
          <div
            class="flex justify-center gap-3 items-center border-b border-b-gray-200 pb-4"
          >
            <span
              class="text-[#EF4444] border px-2 py-1.5 border-[#ef444486] bg-[#ef44442b] rounded-full"
              ><i class="fa-solid fa-bug mr-2 font-medium text-[12px]"></i
              >${typeof iss.labels[0] === "undefined" ? `Not found` : iss.labels[0]}</span
            >
            <span
              class="text-[#D97706] px-2 py-1.5 border border-[#d977069e] bg-[#d977063b] rounded-full"
              ><i class="mr-2 fa-solid fa-hands-holding-circle"></i>${typeof iss.labels[1] === "undefined" ? `Not found` : iss.labels[1]}</span
            >
          </div>
          <div class="p-4 text-[#64748B] grid grid-cols-1">
            <span>${iss.author}</span>
            <span>${iss.createdAt}</span>
          </div>
          </div>
    `;
    cards.appendChild(card);
  }
};
loadingAllIssues();

// Loading Open Issues
const loadingOpenIssues = async () => {
  loadingSpinner(true);
  btnOpen.classList.add("btn-active");
  btnClosed.classList.remove("btn-active");
  btnAll.classList.remove("btn-active");
  const response = await fetch(url);
  const data = await response.json();
  showOpenIssues(data.data);
  loadingSpinner(false);
};

const showOpenIssues = async (openIss) => {
  const data = openIss.filter((data) => data.status === "open");
  issueCounter.innerText = `${data.length} Issues`;
  showLoadedData(data);
};

// Loading Closed Issues
const loadingClosedIssues = async () => {
  loadingSpinner(true);
  btnOpen.classList.remove("btn-active");
  btnClosed.classList.add("btn-active");
  btnAll.classList.remove("btn-active");
  const response = await fetch(url);
  const data = await response.json();
  showClosedIssues(data.data);
  loadingSpinner(false);
};

const showClosedIssues = async (openIss) => {
  const data = openIss.filter((data) => data.status === "closed");
  issueCounter.innerText = `${data.length} Issues`;
  showLoadedData(data);
};

// Search Functionality

const searchIssue = async () => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const input = searchField.value.trim().toLowerCase();
  btnOpen.classList.remove("btn-active");
  btnClosed.classList.remove("btn-active");
  btnAll.classList.remove("btn-active");
  const response = await fetch(url);
  const data = await response.json();
  const search = data.data.filter((info) => info.title.includes(input));
  issueCounter.innerText = `${search.length} Issues`;
  showLoadedData(search);
  if (search.length === 0) {
    const card = document.createElement("div");
    card.innerHTML = `<h1 class="text-center w-full">No Issues Found</h1>`;
    cards.classList.remove("grid");
    cards.appendChild(card);
  }
  loadingSpinner(false);
};

// Opening Issue Info
const openIssueInfo = async (id) => {
  const infoContainer = document.getElementById("info-container");
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const info = data.data;
  infoContainer.innerHTML = `
    <div class="space-y-5">
      <h3 class="text-2xl">${info.title}</h3>
      ${info.status === "open" ? `<span class="bg-green-500 text-white px-2 py-1 rounded-full">Opened</span>` : `<span class="bg-red-500 text-white py-1 px-2 rounded-full">Closed</span>`}
      <span>&bull; ${info.status === "open" ? `Opened` : `Closed`} by ${info.author} &bull; ${info.createdAt}</span>
      <div
            class="flex gap-3 items-center mt-5"
          >
            <span
              class="text-[#EF4444] border px-1 py-.5 border-[#ef444486] bg-[#ef44442b] rounded-full"
              ><i class="fa-solid fa-bug mr-2 font-medium text-[12px]"></i
              >${typeof iss.labels[0] === "undefined" ? `Not found` : iss.labels[0]}</span
            >
            <span
              class="text-[#D97706] px-1 py-.5 border border-[#d977069e] bg-[#d977063b] rounded-full"
              ><i class="mr-2 fa-solid fa-hands-holding-circle"></i>${typeof iss.labels[1] === "undefined" ? `Not found` : iss.labels[1]}</span
            >
          </div>
          <div>
            <p class="text-[#64748B]">${info.description}</P>
          </div>
          <div class="bg-[#64748B10] grid grid-cols-2 items-center p-5">
            <div>
              <p>Assignee:</p>
              <p>${info.author}</P>
            </div>
            <div class="space-y-2">
              <p>Priority:</p>
              <span class="text-red-500 bg-red-200 rounded-full px-2 py-1.5">
              ${info.priority}
            </span>
            </div>
          </div>
    </div>
  `;
  document.getElementById("my_modal_5").showModal();
};
