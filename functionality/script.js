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

const loadingAllIssues = async () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const response = await fetch(url);
  const data = await response.json();
  showLoadedData(data.data);
};
// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }
const showLoadedData = (issues) => {
  const cards = document.getElementById("cards");
  for (iss of issues) {
    const card = document.createElement("div");
    card.innerHTML = `<div
          id="card"
          class="bg-[#FFFFFF] p-4 rounded-lg drop-shadow-xl space-y-3 border-t-5 h-full border-t-green-500"
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
              >${iss.labels[0]}</span
            >
            <span
              class="text-[#D97706] px-2 py-1.5 border border-[#d977069e] bg-[#d977063b] rounded-full"
              ><i class="mr-2 fa-solid fa-hands-holding-circle"></i>${iss.labels[1]}</span
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
