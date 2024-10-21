// Load Categories Function
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categoryContainer");

  categories.forEach((item) => {
    const categoryDiv = document.createElement("div");
    let category = `${item.category}`.toLowerCase();

    const content = `
      <button 
        onclick="loadCategoryPets('${category}'); hideLoaderShowContent();" 
        id="category-${category}" 
        class="category-btn flex items-center gap-2 border-[1px] border-gray-300 rounded-lg px-5 py-2 md:px-10 md:py-4"
      >
        <img src="${item.category_icon}" alt="" class="w-10 h-10">
        <h1 class="font-bold text-2xl">${item.category}</h1>
      </button>
    `;

    categoryDiv.innerHTML = content;
    categoryContainer.appendChild(categoryDiv);
  });
};

loadCategories();
