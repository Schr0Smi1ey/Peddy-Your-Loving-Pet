const loadPets = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  displayPets(data.pets);
};

const displayPets = (pets) => {
  console.log(pets);
  const petContainer = document.getElementById("petContainer");

  pets.forEach((pet) => {
    const newPet = document.createElement("div");
    const content = `
            <div class="card w-fit shadow-xl">
                <figure>
                <img
                    src="${pet.image}"
                    alt="${pet.category}" />
                </figure>
                <div class="card-body">
                <h2 class="font-[900] text-xl">
                    ${pet.pet_name ? pet.pet_name : "Not Available"}
                </h2>
                <div>
                    <div class="flex items-center gap-3">
                        <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/breed.png" alt="" class="w-6 h-6">
                        <h2 class="font-normal text-xl text-[#131313B3]">Breed: <span class="text-lg"> ${
                          pet.breed ? pet.breed : "Not Available"
                        }</span> 
                        </h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/birth.png" alt="" class="w-6 h-6">
                        <h2 class="font-normal text-xl text-[#131313B3]">Birth: <span class="text-lg"> ${
                          pet.date_of_birth
                            ? pet.date_of_birth
                            : "Not Available"
                        }</span></h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/gender.png" alt="" class="w-6 h-6">
                        <h2 class="font-normal text-xl text-[#131313B3]" >Gender: <span class="text-lg"> ${
                          pet.gender ? pet.gender : "Not Available"
                        }</span></h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/price.png" alt="" class="w-6 h-6">
                        <h2 class="font-normal text-xl text-[#131313B3]">Price: <span class="text-lg"> $${
                          pet.price ? pet.price : "Not Available"
                        }</span></h2>
                    </div>
                </div>
                <div class="divider my-1"></div>
                <div class="flex justify-between items-center">
                    <button class="px-3 py-1 rounded-lg border-[1px] border-gray-300"><img src="/Project/b10a6-pet-adoption-Schr0Smi1ey/images/love.png" class="h-5 w-5"></button>
                    <button class="px-3 py-1 rounded-lg text-btnPrimary font-bold border-[1px] border-gray-300">Adopt</button>
                    <button class="px-3 py-1 rounded-lg text-btnPrimary font-bold border-[1px] border-gray-300">Details</button>
                </div>
            </div>
        `;

    newPet.innerHTML = content;
    petContainer.appendChild(newPet);
  });
};

loadPets();
displayPets();
