// Load Catagories Function

const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categoryContainer");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    const content = `
                <button class="category${category.id} flex items-center gap-2 border-[1px] border-gray-300 rounded-lg px-10 py-4">
                    <img src="${category.category_icon}" alt="" class="w-10 h-10">
                    <h1 class="font-bold text-2xl">${category.category}</h1>
                </button>
            `;
    categoryDiv.innerHTML = content;
    categoryContainer.appendChild(categoryDiv);
  });
};

loadCategories();
displayCategories();
