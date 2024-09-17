import { getData, getDataCatalog, getDatabanner } from "./service.js";

const list = document.querySelector(".list");
const mini_lists = document.querySelector(".mini_lists");
const banner = document.querySelector(".banner");

const bannerRender = async () => {
  const data = await getDatabanner();
  banner.innerHTML = `
    <div>
      <img class="img" src="${data[0].img}" alt="">
    </div>
  `;
};
bannerRender();

const listRender = async () => {
  const data = await getDataCatalog();
  list.innerHTML = data
    .map(
      (item) =>
        `
          <li class="list_item" data-name="${item.name}">
            <div>
              <img class="data__img" src="${item.img}" alt="img">
            </div>
            <h1>${item.name}</h1>
            <p>${item.text}</p>
          </li>
        `
    )
    .join("");
  itemsEvent();
};

const items_listsRender = (data) => {
  mini_lists.innerHTML = data
    .map(
      (item) =>
        `
          <li class="items">
            <div>
              <img class="item__img" src="${item.img}" alt="">
            </div>
            <h2 class="item__title">${item.title}</h2>
            <div>
              <p class="item__childs">${item.rame ? item.rame : ""}</p>
              <p class="item__childs">${item.color ? item.color : ""}</p>
              <p class="item__childs">${item.brand}</p>
            </div>
            <p class="item__price">${item.price}</p>
            <button class="btn" data-id="${item.id}">
              Buy
            </button>
          </li>
        `
    )
    .join("");
};

const setLocalfn = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const btnEvent = (data) => {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      const selectedItem = data.find((i) => i.id == id);
      if (selectedItem) {
        setLocalfn("selectedItem", selectedItem);
      }
    });
  });
};

const itemsEvent = () => {
  const listItems = document.querySelectorAll(".list_item");
  listItems.forEach((item) => {
    item.addEventListener("click", async () => {
      const name = item.getAttribute("data-name");
      const data = await getData(name);
      items_listsRender(data);
      btnEvent(data);
    });
  });
};

listRender();
