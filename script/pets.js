// Sorting Tracks variable
let isAscending = true;
const loadPets = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  displayPets(data.pets);
};

function hideLoaderShowContent() {
  setTimeout(function () {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("section-content").classList.remove("hidden");
    document.getElementById("section-content").classList.add("grid");
  }, 2000);
}

window.addEventListener("load", hideLoaderShowContent(), 2000);

const displayPets = (pets) => {
  const petContainer = document.getElementById("petContainer");
  petContainer.innerHTML = "";
  if (pets.length == 0) {
    petContainer.classList.remove("grid");
    const noPet = document.createElement("div");
    noPet.classList = "bg-[#13131308] p-10 rounded-lg text-center";
    noPet.innerHTML = `
            <div class = "mb-3">
              <img src="../images/no-pet.webp" alt="" class="mx-auto">
            </div>
            <h1 class="text-center font-bold text-3xl mb-3">No Information Available</h1>
            <p class="text-center text-base text-[#131313B3]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</p>
        `;
    petContainer.appendChild(noPet);
    return;
  }

  petContainer.classList.add("grid");
  pets.forEach((pet) => {
    const newPet = document.createElement("div");
    const content = `
            <div id="pet-${pet.petId}" class="card shadow-md mb-3 md:mb-0 p-1">
                <figure>
                <img
                    src="${pet.image}"
                    alt="${pet.category}"
                    class="w-fit object-cover rounded-lg"
                 />    
                </figure>
                <div class="card-body p-1 lg:p-2 xl:p-3">
                <h2 class="font-[900] text-xl">
                    ${pet.pet_name ? pet.pet_name : "Not Available"}
                </h2>
                <div>
                    <div class="flex items-center gap-3">
                        <img src="../images/breed.png" alt="" class="w-6 h-6">
                        <h2 class="font-normal text-xl text-[#131313B3]">Breed: <span class="text-lg"> ${
                          pet.breed ? pet.breed : "Not Available"
                        }</span> 
                        </h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="../images/birth.png" alt="" class="w-6 h-6">
                        <h2 class="font-normal text-xl text-[#131313B3]">Birth: <span class="text-lg"> ${
                          pet.date_of_birth
                            ? pet.date_of_birth
                            : "Not Available"
                        }</span></h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="../images/gender.png" alt="" class="w-6 h-6">
                        <h2 class="font-normal text-xl text-[#131313B3]" >Gender: <span class="text-lg"> ${
                          pet.gender ? pet.gender : "Not Available"
                        }</span></h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="../images/price.png" alt="" class="w-6 h-6">
                        <h2 class="font-normal text-xl text-[#131313B3]">Price: <span 
                          class="text-lg price"> $${
                            pet.price ? pet.price : "Not Available"
                          }</span></h2>
                    </div>
                </div>
                <div class="divider my-1"></div>
                <div class="flex justify-between items-center">
                    <button id="love-btn-${pet.petId}" onclick="loveEffect('${
      pet.image
    }', ${
      pet.petId
    })" class="px-3 py-1 rounded-lg border-[1px] border-gray-300">
                      <img src="../images/love.svg" class="m-1 h-4 w-4">
                    </button>
                    <button id="adopt-${
                      pet.petId
                    }" onclick="displayAdoptDetails(${
      pet.petId
    })" class="px-3 py-1 rounded-lg text-btnPrimary font-bold border-[1px] border-gray-300">Adopt</button>
                    <button id="details-${pet.petId}" onclick="loadDetails(${
      pet.petId
    })" class="px-3 py-1 rounded-lg text-btnPrimary font-bold border-[1px] border-gray-300">Details</button>
                </div>
            </div>
        `;

    newPet.innerHTML = content;
    petContainer.appendChild(newPet);
  });
};

const categoryBtnStyle = (category) => {
  const categoryBtn = document.getElementById(`category-${category}`);
  const allCategoryBtns = document.querySelectorAll(".category-btn");
  allCategoryBtns.forEach((btn) => {
    btn.classList.remove("bg-[#1c8a927a]");
    btn.classList.remove("rounded-full");
  });
  categoryBtn.classList.add("bg-[#1c8a927a]");
  categoryBtn.classList.add("rounded-full");
};

const loadCategoryPets = async (category) => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("section-content").classList.add("hidden");
  document.getElementById("section-content").classList.remove("grid");

  const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
  const res = await fetch(url);
  const data = await res.json();
  categoryBtnStyle(category);
  displayPets(data.data);
};

const loadSortPets = () => {
  document
    .getElementById("section-content")
    .addEventListener("load", hideLoaderShowContent());
  const petContainer = document.getElementById("petContainer");
  let pet = Array.from(petContainer.children);
  if (pet.length == 0) return;
  pet.sort((a, b) => {
    let priceA = parseFloat(
      a.querySelector(".price").innerText.replace("$", "")
    );
    let priceB = parseFloat(
      b.querySelector(".price").innerText.replace("$", "")
    );
    isNaN(priceA) ? (priceA = 0) : priceA;
    isNaN(priceB) ? (priceB = 0) : priceB;
    return isAscending ? priceA - priceB : priceB - priceA;
  });
  petContainer.innerHTML = "";
  pet.forEach((item) => {
    petContainer.appendChild(item);
  });
};

const sortByPrice = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("section-content").classList.add("hidden");
  document.getElementById("section-content").classList.remove("grid");
  isAscending = !isAscending;
  loadSortPets();
};

// Love Button
const loveEffect = (image, id) => {
  const loveBtn = document.getElementById(`love-btn-${id}`);
  const lovedPet = document.getElementById("loved-pet");

  loveBtn.classList.toggle("active");
  if (loveBtn.classList.contains("active")) {
    loveBtn.classList.toggle("bg-red-500");
    loveBtn.classList.toggle("text-white");

    const newLovedPet = document.createElement("div");
    newLovedPet.id = `loved-pet-${id}`;
    const content = `
      <div class="flex items-center gap-3 ">
        <img src=${image} alt="" class="rounded-lg">
      </div>
    `;
    newLovedPet.innerHTML = content;
    lovedPet.appendChild(newLovedPet);
  } else {
    loveBtn.classList.toggle("bg-red-500");
    loveBtn.classList.toggle("text-white");
    const lovedPet = document.getElementById(`loved-pet-${id}`);
    lovedPet.remove();
  }
};

const loadDetails = async (id) => {
  console.log(id);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData, id);
};

const displayDetails = (petData, id) => {
  const detailContainer = document.getElementById("detailContainer");
  // <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/breed.png" alt="" class="w-6 h-6"></img>
  // <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/birth.png" alt="" class="w-6 h-6"></img>
  // <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/gender.png" alt="" class="w-6 h-6"></img>
  // <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/price.png" alt="" class="w-6 h-6"></img>
  // <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/vaccinated.png" alt="" class="w-6 h-6"></img>
  const content = `
      <div class ="mb-3">
        <img src=${petData.image} alt="" class="w-full rounded-lg"/>
      </div>
      <div class="">
        <h1 class="font-bold text-3xl mb-2">${petData.pet_name}</h1>
        <div class="">
          <div class="flex items-center gap-3">
              <img src="../images/breed.png" alt="" class="w-6 h-6">
              <h2 class="font-normal text-xl text-[#131313B3]">Breed: <span class="text-lg"> ${
                petData.breed ? petData.breed : "Not Available"
              }</span>
              </h2>
          </div>
          <div class="flex items-center gap-3">
              <img src="../images/birth.png" alt="" class="w-6 h-6">
              <h2 class="font-normal text-xl text-[#131313B3]">Birth: <span class="text-lg"> ${
                petData.date_of_birth ? petData.date_of_birth : "Not Available"
              }</span></h2>
          </div>
          <div class="flex items-center gap-3">
              <img src="../images/gender.png" alt="" class="w-6 h-6">
              <h2 class="font-normal text-xl text-[#131313B3]" >Gender: <span class="text-lg"> ${
                petData.gender ? petData.gender : "Not Available"
              }</span></h2>
          </div>
          <div class="flex items-center gap-3">
              <img src="../images/price.png" alt="" class="w-6 h-6">
              <h2 class="font-normal text-xl text-[#131313B3]">Price: <span
                class="text-lg price"> $${
                  petData.price ? petData.price : "Not Available"
                }</span></h2>
          </div>
          <div class="flex items-center gap-3">
              <img src="../images/vaccinated.png" alt="" class="w-6 h-6">
              
              <h2 class="font-normal text-xl text-[#131313B3]">Vaccinated Status: <span
                class="text-lg price"> ${
                  petData.vaccinated_status
                    ? petData.vaccinated_status
                    : "Not Available"
                }</span></h2>
          </div>
      </div>
      <div class="divider my-1"></div>
      <div>
          <h1 class="font-semibold text-base mb-2">Details Information</h1>
          <p>${petData.pet_details}</p>
      </div>
    `;
  detailContainer.innerHTML = content;
  document.getElementById("details").showModal();
};

const displayAdoptDetails = (id) => {
  const adoptDetails = document.getElementById("adoptDetails");
  let counter = 3; // Initialize the counter at 3

  // <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/hand-shake.png" alt="" class="w-24 h-24 rounded-lg mx-auto"></img>
  const content = `
      <div class="text-center mb-3">
        <img src="../images/hand-shake.png" alt="" class="w-24 h-24 rounded-lg mx-auto">
        <h1 class="font-[900] text-5xl mb-4">Congrats</h1>
        <h2 class="font-medium text-lg text-gray-400 mb-4">Adoption process is starting for your pet</h2>
        <span class="countdown font-mono text-6xl">
          <span class="font-[900]" style="--value:${counter};">${counter}</span>
        </span>
      </div>
    `;
  adoptDetails.innerHTML = content;

  document.getElementById("adopt").showModal();

  const interval = setInterval(() => {
    counter--;
    if (counter >= 0) {
      adoptDetails
        .querySelector(".countdown span")
        .style.setProperty("--value", counter);
      adoptDetails.querySelector(".countdown span").innerText = counter;
    }

    if (counter <= 0) {
      document.getElementById("cancelButton").click();
      clearInterval(interval);
    }
  }, 1000);
  document.getElementById(`adopt-${id}`).setAttribute("disabled", true);
  document.getElementById(`adopt-${id}`).classList.add("text-opacity-40");
  document.getElementById(`adopt-${id}`).classList.add("bg-gray-300");
  document.getElementById(`adopt-${id}`).innerText = "Adopted";
};

function loading() {
  setTimeout(function () {
    document.getElementById("loader-body").classList.add("hidden");
    document.getElementById("header").classList.remove("hidden");
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("footer").classList.remove("hidden");
  }, 1000);
}
loading();
loadPets();
displayPets();
