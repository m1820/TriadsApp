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
        ],
        "songs": [
          {
            "title": "1 5 6 4 in G Major",
            "url": "https://www.youtube.com/watch?v=Lpx4Mrj6dyo"
          },
          {
            "title": "Option 2",
            "url": "https://www.youtube.com/watch?v=G9lMtDRBNrs&list=RDG9lMtDRBNrs&start_radio=1"
          }
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
        ],
        "songs": [
          {
            "title": "1 5 6 4 in E Major",
            "url": "https://www.youtube.com/watch?v=u8bsQmi3MMU"
          }
        ]
      }
    ]
  },
  {
    "name": "Mixed Patterns",
    "submenus": [
      {
        "name": "A Maj7 Plus Shape Pattern",
        "images": [
          "resources/Mixed_Patterns/A_Maj7_Plus_Shape_Pattern/0.A_Maj7_Plus_Shape.webp",
          "resources/Mixed_Patterns/A_Maj7_Plus_Shape_Pattern/1.A_Maj7_Shape_G_1_5_6_4.webp",
          "resources/Mixed_Patterns/A_Maj7_Plus_Shape_Pattern/2.Shape_G_1_5_6_4.webp"
        ],
        "songs": [
          {
            "title": "1 5 6 4 in G Major",
            "url": "https://www.youtube.com/watch?v=Lpx4Mrj6dyo"
          }
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
        ],
        "songs": [
          {
            "title": "1 5 6 4 in E Major",
            "url": "https://www.youtube.com/watch?v=u8bsQmi3MMU"
          }
        ]
      }
    ]
  }
];

// subheader.txt loader
async function loadSubheader(n){const m={
    "A Major7 Shaped Triad": "A_Major7_Shaped_Triad",
    "A Major Shaped Triad": "A_Major_Shaped_Triad",
    "Mixed Patterns": "Mixed_Patterns",
    "Shape Triad": "Shape_Triad",
  };
  const f = m[n];
  if (!f) return "";
  try { const r = await fetch(`resources/${f}/subheader.txt`); if (r.ok) return await r.text(); }
  catch { return ""; }
}
window.loadSubheader = loadSubheader;

const APP_VERSION = "v2.0";
