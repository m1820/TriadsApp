// data.js
const SHAPES_DATA = [
  { name: "A Major Shaped Triad",
    submenus: [
      { name: "Roots",
        images: [
          "resources/A_Major_Shaped_Triad/Roots/Amaj.png",
          "resources/A_Major_Shaped_Triad/Roots/A-sharp.png",
          "resources/A_Major_Shaped_Triad/Roots/B.png",
          "resources/A_Major_Shaped_Triad/Roots/C.png",
          "resources/A_Major_Shaped_Triad/Roots/C-sharp.png",
          "resources/A_Major_Shaped_Triad/Roots/D.png",
          "resources/A_Major_Shaped_Triad/Roots/D-sharp.png",
          "resources/A_Major_Shaped_Triad/Roots/E.png"
        ]
      },
      { name: "Example Song in E with 1 5 6 4 Progression",
        images: [
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/Full Pattern.png",
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/1 E.png",
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/5 B.png",
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/6 C-sharp.png",
          "resources/A_Major_Shaped_Triad/Example_Song_in_E_with_1-5-6-4_Progression/4 A.png"          
        ]
      }
    ]
  },

  { name: "A Major7 Shaped Triad",
    submenus: [
      { name: "Roots",
        images: [
          "resources/A_Major7_Shaped_Triad/Roots/F.png",
          "resources/A_Major7_Shaped_Triad/Roots/F-sharp.png",
          "resources/A_Major7_Shaped_Triad/Roots/G.png",
          "resources/A_Major7_Shaped_Triad/Roots/G-sharp.png",
          "resources/A_Major7_Shaped_Triad/Roots/A.png",
          "resources/A_Major7_Shaped_Triad/Roots/A-sharp.png",
          "resources/A_Major7_Shaped_Triad/Roots/B.png",
          "resources/A_Major7_Shaped_Triad/Roots/C.png"
        ]
      },
      { name: "Example Song in G with 1 5 6 4 Progression",
        images: [
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/Full Pattern.png",
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/1 G.png",
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/5 D.png",
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/6 Em.png",
          "resources/A_Major7_Shaped_Triad/Example_Song_in_G_with_1-5-6-4_Progression/4 C.png"
        ]
      }
    ]
  },

  { name: "Shape Triad",
    submenus: [
      { name: "Roots",
        images: [
          "resources/Shape_Triad/Roots/C-sharp.png",
          "resources/Shape_Triad/Roots/D.png",
          "resources/Shape_Triad/Roots/D-sharp.png",
          "resources/Shape_Triad/Roots/E.png",
          "resources/Shape_Triad/Roots/F.png",
          "resources/Shape_Triad/Roots/F-sharp.png",
          "resources/Shape_Triad/Roots/G.png"
        ]
      },
      { name: "Example Song in E with 1 5 6 4 Progression",
        images: [
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/Full Pattern.png",
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/1 E.png",
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/5 B.png",
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/6 C-sharp.png",
          "resources/Shape_Triad/Example_Song_in_E_with_1-5-6-4_Progression/4 A.png"
        ]
      }
    ]
  }
];

// -------------------------------------------------
// GoodFor.txt loader – maps shape name → folder
// -------------------------------------------------
async function loadGoodFor(shapeName){
  const map = {
    "A Major Shaped Triad":"A_Major_Shaped_Triad",
    "A Major7 Shaped Triad":"A_Major7_Shaped_Triad",
    "Shape Triad":"Shape_Triad"
  };
  const folder = map[shapeName];
  try{
    const r = await fetch(`resources/${folder}/GoodFor.txt`);
    if(r.ok) return await r.text();
  }catch{}
  return "No description available.";
}
window.loadGoodFor = loadGoodFor;