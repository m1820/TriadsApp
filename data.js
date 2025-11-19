const SHAPES_DATA = [
  {
    "name": "A Major7 Shaped Triad",
    "submenus": [
      {
        "name": "Roots",
        "images": [
          "resources/A_Major7_Shaped_Triad/Roots/1F.png",
          "resources/A_Major7_Shaped_Triad/Roots/2F-sharp.png",
          "resources/A_Major7_Shaped_Triad/Roots/3G.png",
          "resources/A_Major7_Shaped_Triad/Roots/4G-sharp.png",
          "resources/A_Major7_Shaped_Triad/Roots/5A.png",
          "resources/A_Major7_Shaped_Triad/Roots/6A-sharp.png",
          "resources/A_Major7_Shaped_Triad/Roots/7B.png",
          "resources/A_Major7_Shaped_Triad/Roots/8C.png"
        ]
      },
      {
        "name": "Example Song In G With 1 5 6 4 Progression",
        "images": [
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/0 Full Pattern.png",
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/1 G.png",
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/2 D.png",
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/3 Em.png",
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/4 C.png"
        ]
      }
    ]
  },
  {
    "name": "A Major Shaped Triad",
    "submenus": [
      {
        "name": "Roots",
        "images": [
          "resources/A_Major_Shaped_Triad/Roots/1 Amaj.png",
          "resources/A_Major_Shaped_Triad/Roots/2 A-sharp.png",
          "resources/A_Major_Shaped_Triad/Roots/3 B.png",
          "resources/A_Major_Shaped_Triad/Roots/4C.png",
          "resources/A_Major_Shaped_Triad/Roots/5C-sharp.png",
          "resources/A_Major_Shaped_Triad/Roots/6D.png",
          "resources/A_Major_Shaped_Triad/Roots/7D-sharp.png",
          "resources/A_Major_Shaped_Triad/Roots/8E.png"
        ]
      },
      {
        "name": "Example Song In E With 1 5 6 4 Progression",
        "images": [
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/0 Full Pattern.png",
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/1 E.png",
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/2 B.png",
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/3 C-sharp.png",
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/4 A.png"
        ]
      }
    ]
  },
  {
    "name": "Shape Triad",
    "submenus": [
      {
        "name": "Roots",
        "images": [
          "resources/Shape_Triad/Roots/1C-sharp.png",
          "resources/Shape_Triad/Roots/2D.png",
          "resources/Shape_Triad/Roots/3D-sharp.png",
          "resources/Shape_Triad/Roots/4E.png",
          "resources/Shape_Triad/Roots/5F.png",
          "resources/Shape_Triad/Roots/6F-sharp.png",
          "resources/Shape_Triad/Roots/7G.png"
        ]
      },
      {
        "name": "Example Song In E With 1 5 6 4 Progression",
        "images": [
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/0 Full Pattern.png",
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/1 E.png",
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/2 B.png",
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/3 C-sharp.png",
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/4 A.png"
        ]
      }
    ]
  }
];

// -------------------------------------------------
// GoodFor.txt loader
// -------------------------------------------------
async function loadGoodFor(shapeName){
  const map = {
    "A Major7 Shaped Triad": "A_Major7_Shaped_Triad",
    "A Major Shaped Triad": "A_Major_Shaped_Triad",
    "Shape Triad": "Shape_Triad",
  };
  const folder = map[shapeName];
  if (!folder) return "No description available.";
  try {
    const r = await fetch(`resources/${folder}/GoodFor.txt`);
    if (r.ok) return await r.text();
  } catch {}
  return "No description available.";
}
window.loadGoodFor = loadGoodFor;
