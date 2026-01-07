// Load the drawings JSON
fetch("data/drawings.json")
  .then(res => res.json())
  .then(data => {
    createDrawingTabs(data.drawings);
  })
  .catch(err => console.error("Error loading JSON:", err));


// Create tabs for each drawing
function createDrawingTabs(drawings) {
  const tabContainer = document.getElementById("drawing-tabs");
  const contentContainer = document.getElementById("drawing-content");

  drawings.forEach((drawing, index) => {
    const tab = document.createElement("button");
    tab.classList.add("drawing-tab");
    tab.textContent = drawing.title;

    // Pass event into the function
    tab.addEventListener("click", (event) => {
      setActiveDrawing(drawing, tabContainer, contentContainer, event);
    });

    tabContainer.appendChild(tab);

    // Auto-select the first drawing
    if (index === 0) {
      tab.classList.add("active");
      setActiveDrawing(drawing, tabContainer, contentContainer, { target: tab });
    }
  });
}


// Load the selected drawing's sections
function setActiveDrawing(drawing, tabContainer, contentContainer, event) {
  // Remove active state from all tabs
  tabContainer.querySelectorAll(".drawing-tab").forEach(t => t.classList.remove("active"));

  // Highlight the clicked tab
  event.target.classList.add("active");

  // Clear previous content
  contentContainer.innerHTML = "";

  // Render each section
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
