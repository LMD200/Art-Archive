fetch("data/drawings.json")
  .then(res => res.json())
  .then(data => {
    createDrawingTabs(data.drawings);
  });

function createDrawingTabs(drawings) {
  const tabContainer = document.getElementById("drawing-tabs");
  const contentContainer = document.getElementById("drawing-content");

  drawings.forEach((drawing, index) => {
    const tab = document.createElement("button");
    tab.classList.add("drawing-tab");
    tab.textContent = drawing.title;

    tab.addEventListener("click", () => {
      setActiveDrawing(drawing, drawings, tabContainer, contentContainer);
    });

    tabContainer.appendChild(tab);

    if (index === 0) {
      setActiveDrawing(drawing, drawings, tabContainer, contentContainer);
    }
  });
}
tab.addEventListener("click", (event) => {
  setActiveDrawing(drawing, drawings, tabContainer, contentContainer, event);
});

function setActiveDrawing(drawing, drawings, tabContainer, contentContainer, event) {
  tabContainer.querySelectorAll(".drawing-tab").forEach(t => t.classList.remove("active"));
  event.target.classList.add("active");

  contentContainer.innerHTML = "";

  drawing.sections.forEach(section => {
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("section");

    sectionDiv.innerHTML = `
      <h3>${section.name}</h3>
        <img src="artfolder/${drawing.folder}/${section.file}" class="art-image">
      <p>${section.description || ""}</p>
    `;

    contentContainer.appendChild(sectionDiv);
  });
}
