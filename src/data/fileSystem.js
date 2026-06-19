import { createItem } from "../utils/elementHelpers.js";

// TODO: Make file structure; all categories and subcategories (programs, documents, etc) must be contained here and only here in this file.
export const fileSystem = [
  {
    id: 'b1f4b153-29a7-44c2-865c-61c2d917fb46',
    title: 'C:',
    type: 'drive',
    style: 'category',
    children: [
      {
        id: '6a66dce1-d280-4a95-a4b5-4e5085bc8ba6',
        title: 'Windows',
        type: 'folder',
        children: [
          {
            id: '315d287c-b5a4-47f6-accb-00e5e2ba5bad',
            title: 'Start Menu',
            type: 'folder',
            children: [
              {
                id: '5917bb03-20aa-4dd2-a9a4-2848c90a4102',
                title: 'Programs',
                type: 'folder',
                style: 'category',
                children:  [
                  {
                    id: '101',
                    title: 'Accessories',
                    type: 'folder',
                    children: [
                      {
                        id: '9e667939-f3be-49b3-9dba-67b7d8f1ea89',
                        title: 'Calculator',
                        type: 'file',
                        ext: 'lnk',
                        data: {
                          windowClass: 'cal-window',
                          contentClass: 'cal'
                        },
                      },
                    ],
                  },
                  {
                    id: '102',
                    title: 'Games',
                    type: 'folder',
                    children: [
                      {
                        id: '202',
                        icon: 'assets/icons/apps/canvas.png',
                        title: 'Minesweeper',
                        type: 'file',
                        ext: 'lnk',
                        data: {
                          windowClass: 'cal-window',
                          contentClass: 'cal'
                        },
                      },
                    ]
                  }
                ],
              },
              {
                id: 'dbf56451-b3fd-4f44-a50e-c97a832239bb',
                title: 'Favorites',
                type: 'folder',
                style: 'category',
                children: [],
              },
              {
                id: 'b56a654c-187d-4450-ad9b-c4a45b4ab8a8',
                title: 'Documents',
                type: 'folder',
                style: 'category',
                children: [],
              },
              {
                id: '44d46fee-0a9f-4e78-8cc9-251ba82ccc39',
                title: 'Settings',
                type: 'folder',
                style: 'category',
                children: [],
              },
              {
                id: '2bd0628f-281f-4c62-b54b-3138fd2a797d',
                title: 'Find',
                type: 'folder',
                style: 'category',
                children: [],
              },
              {
                id: '40251a1b-644a-47cf-b8e0-e4bcdcdfa34c',
                title: 'About',
                type: 'file',
                ext: 'exe',
              },
              {
                id: '586cdc08-080a-4909-8a2b-7845906b7ee8',
                title: 'Run',
                type: 'file',
                ext: 'exe',
              }
            ]
          },
          {
            id: 'b11c6ba3-60f8-4f81-8475-36407baf21b1',
            title: 'Program Files',
            type: 'folder',
            children: [

            ],
          },
        ],
      },
    ],
  }
];


const startFolder = findItemByTitle(fileSystem, 'Start Menu');
export const startChildren = startFolder.children;

export function popStart() {
  const programList = document.querySelector(".main-list");

  startChildren.forEach(entry => programList.append(createItem(entry)));
}

// Use .map() to get all files/data needed to create a subcategory.
// Add function for shortcuts.


function findItemByTitle(items, title) {
  for (const item of items) {
    if (item.title === title) return item;
    if (item.children) {
      const found = findItemByTitle(item.children, title);
      if (found) return found;
    }
  }

  return null;
}