import { dummy } from "/Monopoly-Run-Live-Map/dummy.js"

let map
let player = null

let mobile = false

if (window.matchMedia("(max-width: 1000px)").matches) {
  mobile = true
}

let markers = []
let stationMarkers = []
let circles = []
let description = []

let all = true
let other = true
let houses = true
let brown = true
let lightBlue = true
let pink = true
let orange = true
let red = true
let yellow = true
let green = true
let darkBlue = true

let locations = [
  [51.50403847337179, -0.11814194610221404, "Jubilee Gardens (Start)"],
  [51.49530599658464, -0.09974422447411252, "Old Kent Road (New Kent Road)", "brown"],
  [51.51897630404365, -0.06023921802796221, "Whitechapel Road", "brown"],
  [51.532189240615125, -0.10625589479490946, "The Angle Islingtion", "light-blue"],
  [51.526253161104854, -0.13373479079854755, "Euston Road", "light-blue"],
  [51.53101445654643, -0.11857364571214471, "Pentonville Road", "light-blue"],
  [51.50568045409814, -0.13655892655815943, "Pall Mall", "pink"],
  [51.50330846104881, -0.1260169925430676, "Whitehall", "pink"],
  [51.5072149292592, -0.1257143244492344, "Northumberland Avenue", "pink"],
  [51.51322032853841, -0.12187007572230864, "Bow Street", "orange"],
  [51.514217864230275, -0.1395815209555135, "Great Marlborough Street", "orange"],
  [51.50948315175283, -0.13717220464567115, "Vine Street", "orange"],
  [51.511708738838465, -0.11816065035289719, "The Strand", "red"],
  [51.514037770944405, -0.10973930261075555, "Fleet Street", "red"],
  [51.50812856489972, -0.1286494629884741, "Trafalgar Square", "red"],
  [51.51039457425396, -0.13011792504927794, "Leicester Square", "yellow"],
  [51.51026011492386, -0.1321710381649635, "Coventry Street", "yellow"],
  [51.508455685353425, -0.1385202836323963, "Piccadilly", "yellow"],
  [51.51278542398229, -0.14021051394119746, "Regents Street", "green"],
  [51.51632670743193, -0.13276757761023497, "Oxford Street", "green"],
  [51.51068112912576, -0.14276320937103149, "(New) Bond Street", "green"],
  [51.506054381155735, -0.15143395674617327, "Park Lane", "dark-blue"],
  [51.51112489055658, -0.15122768008376283, "Mayfair (Grosvenor Square)", "dark-blue"],
  [51.50709976606698, -0.09202691796426296, "Jail (The Clink)"],
  [51.511718619622485, -0.07921716604454575, "Fenchurch St Station"],
  [51.51908620338329, -0.08110267110790897, "Liverpool Street Station"],
  [51.53065412173234, -0.12462665461454286, "Kings Cross Station"],
  [51.522627698091505, -0.1627798486992296, "Marylebone Station"],
  [51.50800374302377, -0.09933188380582798, "Electricity Station (Tate Modern)"],
  [51.50650526944936, -0.12232766623978517, "Waterworks (Embankment)"]
]

let prices = [
  ["N/A","N/A","N/A","N/A"],
  [60,90,30,90],
  [60,90,30,90],
  [100,150,50,150],
  [100,150,50,150],
  [120,180,60,180],
  [140,210,70,210],
  [140,210,70,210],
  [160,240,80,240],
  [180,270,90,270],
  [180,270,90,270],
  [200,300,100,300],
  [220,330,110,330],
  [220,330,110,330],
  [240,360,120,360],
  [260,390,130,390],
  [260,390,130,390],
  [280,420,140,420],
  [300,420,150,420],
  [300,450,150,450],
  [320,480,160,480],
  [350,525,175,525],
  [400,600,200,600],
  [150,"N/A",75,"N/A"],
  [200,"N/A",100,"N/A"],
  [200,"N/A",100,"N/A"],
  [200,"N/A",100,"N/A"],
  [200,"N/A",100,"N/A"],
  [200,"N/A",100,"N/A"],
  [200,"N/A",100,"N/A"],
]

// CALCULATE NEEDED VISITS
for (let i = 0; i < prices.length; i++) {
  if (prices[i][0] != "N/A") {
    let beatBuy = prices[i][0] - (prices[i][0] * 0.5)
    let value = 0
    let number = 0
    while(value < beatBuy) {
      value += prices[i][2]
      number++
    }
    prices[i].push(number)
  } 
}

console.log(prices)

// CALCULATE POTENCIAL GAIN

let gross = 0

for (let i = 0; i < prices.length; i++) {
  if (prices[i][2] != "N/A") {
    //7 teams per game -1 our team
    gross += (prices[i][2] * 6) - prices[i][0] 
  }
}

console.log("Gross: " + gross)

// CALCULATE TOTAL COST

let totalCost = 0

for (let i = 0; i < prices.length; i++) {
  if (prices[i][0] != "N/A") {
    totalCost += prices[i][0]
  }
}

console.log("TOTAL COST OF ALL HOUSES: " + totalCost)
document.getElementById("costOutput").innerHTML = "Cost: £" + totalCost

let stations = [
  [51.49891756244119, -0.11210969095378359, "Lambeth North"],
  [51.494614499475254, -0.10040618899709142, "Elephant & Castle"],
  [51.501234485965924, -0.09361690446424355, "Borough"],
  [51.50587782522662, -0.08698307694054815, "London Bridge"],
  [51.50390475764862, -0.10495163243367903, "Southwark"],
  [51.503056004617065, -0.11513637218640413, "Waterloo"],
  [51.49947935421642, -0.13371345743108193, "St. James' Park"],
  [51.50725164932739, -0.1221971212357279, "Embankment"],
  [51.50848760034933, -0.12586179765258454, "Charing Cross"],
  [51.51099726186868, -0.11429875562623341, "Temple"],
  [51.511455615500665, -0.10312936695203434, "Blackfriars"],
  [51.51228180657306, -0.09364186994176019, "Mansion House"],
  [51.51108098522362, -0.09036414697600717, "Cannon Street"],
  [51.51099680237662, -0.08666107356601188, "Monument"],
  [51.51338582292458, -0.08892898489325937, "Bank"],
  [51.51011687863511, -0.07666534460463559, "Tower Hill"],
  [51.51415611038749, -0.07553500336190247, "Aldgate"],
  [51.51742373629193, -0.08304094326674213, "Liverpool Street"],
  [51.51848817346733, -0.08820712096490531, "Moorgate"],
  [51.52565977595159, -0.08749539726770138, "Old Street"],
  [51.53277322882353, -0.10587588818133123, "Angel"],
  [51.520215892639456, -0.09767838008635205, "Barbican"],
  [51.5201566293988, -0.10474530953788737, "Farringdon"],
  [51.518203811308354, -0.11149829959128216, "Chancery Lane"],
  [51.530641331390704, -0.12316975093290748, "King's Cross St. Pancras"],
  [51.517409324775684, -0.11999870054456749, "Holborn"],
  [51.51299805921465, -0.12416265080392082, "Covert Garden"],
  [51.51144410179692, -0.12814523175282908, "Leicester Square"],
  [51.51011627789041, -0.1341706895448075, "Piccadilly Circus"],
  [51.501336341705816, -0.12484168830228909, "Westminster"],
  [51.5069286228542, -0.14288458217440142, "Green Park"],
  [51.516276349427656, -0.1300415585557886, "Tottenham Court Road"],
  [51.51520618604039, -0.14185384508537302, "Oxford Circus"],
  [51.51432830425982, -0.14885459909278098, "Bond Street"],
  [51.520535756205426, -0.13452867772343655, "Goodge Street"],
  [51.52562194815571, -0.1350215139117867, "Euston Square"],
  [51.52461169741828, -0.13816768562939633, "Warren Street"],
  [51.52373541398983, -0.14391734528704225, "Great Portland Street"],
  [51.52359036858023, -0.14671760048314883, "Regent's Park"],
  [51.52314620161692, -0.1568624216276424, "Baker Street"],
  [51.52242723999441, -0.16283573432090534, "Marylebone"],
  [51.48825229128083, -0.10561550911285357, "Kennington"],
  [51.514921744692444, -0.09755764365551342, "St. Paul's"],
  [51.5153092753968, -0.07182442734533678, "Aldgate East"],
  [51.51951569869003, -0.05969797775933522, "Whitechapel"],
  [51.5230732447438, -0.12426547808655439, "Russell Square"]
]

let lines = [
  ["bakerloo", ["Elephant & Castle", "Lambeth North", "Waterloo", "Embankment", "Charing Cross", "Piccadilly Circus", "Oxford Circus", "Regent's Park", "Baker Street", "Marylebone"]], // CONFIRMED
  ["northern", ["Kennington", "Elephant & Castle", "Borough", "London Bridge", "Bank", "Moorgate", "Old Street", "Angel", "King's Cross St. Pancras"], ["Kennington", "Waterloo", "Embankment", "Charing Cross", "Leicester Square", "Tottenham Court Road", "Goodge Street", "Warren Street"]], // CONFIRMED
  ["jubilee", ["London Bridge", "Southwark", "Waterloo", "Westminster", "Green Park", "Bond Street", "Baker Street"]], // CONFIRMED
  ["waterloo & city", ["Waterloo", "Bank"]], // CONFIRMED
  ["circle", ["St. James' Park", "Westminster", "Embankment", "Temple", "Blackfriars", "Mansion House", "Cannon Street", "Monument", "Tower Hill", "Aldgate", "Liverpool Street", "Moorgate", "Barbican", "Farringdon", "King's Cross St. Pancras", "Euston Square", "Great Portland Street", "Baker Street"]], // CONFIRMED
  ["district", ["St. James' Park", "Westminster", "Embankment", "Temple", "Blackfriars", "Mansion House", "Cannon Street", "Monument", "Tower Hill", "Aldgate East", "Whitechapel"]], // CONFIRMED
  ["metropolitan", ["Aldgate", "Liverpool Street", "Moorgate", "Barbican", "Farringdon", "King's Cross St. Pancras", "Euston Square", "Great Portland Street", "Baker Street"]], // CONFIRMED
  ["central", ["Liverpool Street", "Bank", "St. Paul's", "Chancery Lane", "Holborn", "Tottenham Court Road", "Oxford Circus", "Bond Street"]], // CONFIRMED
  ["hammersmith & city", ["Whitechapel", "Aldgate East", "Liverpool Street", "Moorgate", "Barbican", "Farringdon", "King's Cross St. Pancras", "Euston Square", "Great Portland Street", "Baker Street"]], // CONFIRMED
  ["victoria", ["Green Park", "Oxford Circus", "Warren Street", "King's Cross St. Pancras"]], // CONFIRMED
  ["piccadilly", ["King's Cross St. Pancras", "Russell Square", "Holborn", "Covert Garden", "Leicester Square", "Piccadilly Circus", "Green Park"]] // CONFIRMED
]

let distance = 0
let rush = 0
let routeMarker
let startCash = 1500
let center = { lat:51.514037770944405, lng: -0.10973930261075555}


async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker");
  
  // CREATE MAP
  map = new Map(document.getElementById("map"), {
    center: center, //LONDON
    zoom: 14,
    mapId: "4504f8b37365c3d0",
  });

  if (mobile) {
    map.setZoom(12)
  }

  // CREATE MARKERS
  for (let i = 0; i < locations.length; i++) {
    // MARKER
    markers.push(new AdvancedMarkerElement({
      position: { lat:(locations[i][0]), lng:(locations[i][1]) },
      map,
      title: locations[i][2],
    }))
    markers[i].tags = ["all"]

    // CIRCLES
    circles.push(new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: {lat: (locations[i][0]), lng:(locations[i][1])},
      radius: 100,
    }))
    circles[i].setVisible(false)
  }

  console.log(circles)

  // ZOOM EVENT LISTENER
  map.addListener("zoom_changed", function() {
    if (map.zoom > 15) {
      for (let i = 0; i < circles.length; i++) {
        circles[i].setVisible(true)
      }
    } else {
      for (let i = 0; i < circles.length; i++) {
        circles[i].setVisible(false)
      }
    }
  });

  // STATION MARKERS 
  for (let i = 0; i < stations.length; i++) {
    let element = new PinElement({
      background: "blue",
      borderColor: "darkBlue",
      glyphColor: "darkBlue"
    })
    
    stationMarkers.push(new AdvancedMarkerElement({
      position: {lat:(stations[i][0]), lng:(stations[i][1])},
      map,
      title: stations[i][2],
      content: element.element
    }))
  }

  // STATION LINE
  for (let i = 0; i < lines.length; i++) {
    for (let j = 1; j < lines[i].length; j++) {
      let array = []
      for (let k = 0; k < lines[i][j].length; k++) {
        array.push(lineToStation(lines[i][j][k]))
      }
      console.log(array)
      switch(lines[i][0]) {
        case "bakerloo":
          stationLine(array, "#964B00")
          break
        case "northern":
          stationLine(array)
          break
        case "jubilee":
          stationLine(array, "#808080")
          break
        case "waterloo & city":
          stationLine(array, "#90EE90")
          break
        case "circle":
          stationLine(array, "#FFFF00")
          break
        case "district":
          stationLine(array, "#00FF00")
          break
        case "metropolitan":
          stationLine(array, "#FF00FF")
          break
        case "central":
          stationLine(array, "#FF0000")
          break
        case "hammersmith & city":
          stationLine(array, "#FFC0CB")
          break
        case "victoria":
          stationLine(array, "#ADD8E6")
          break
        case "piccadilly":
          stationLine(array, "#0000FF")
          break
      }
    }
  }

  function stationLine(array, color = "#000000") {
    if (array.length > 1) {
      new google.maps.Polyline({
        path: array, //[{lat,lng}, {lat,lng}]
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 5,
        map
      });
    }
  }

  function lineToStation(lineName) {
    for (let i = 0; i < stations.length; i++) {
      if (lineName == stations[i][2]) {
        return {lat: stations[i][0], lng:stations[i][1]}
      }
    }
    return null
  }
  
  // UPDATE TAGS
  for (let i = 0; i < markers.length; i++) {
    if (locations[i][3] != undefined) {
      markers[i].tags.push(locations[i][3])
    } else {
      locations[i][3] = "N/A"
    }

    if (i >= 1 && i <= 22) {
      markers[i].tags.push("houses")
    } else {
      markers[i].tags.push("other")
    }
  }
  
  // CREATE INFO WINDOW
  for (let i = 0; i < markers.length; i++) {
    description.push(new google.maps.InfoWindow({
      content: '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">' + locations[i][2] + '</h1><hr>' +
      "<p style='color:black;'> Colour: <b>" + locations[i][3][0].toUpperCase() + locations[i][3].slice(1) + "</b></p>" +
      '<div id="bodyContent">' +
      "<p> Buying cost: <b>£" + prices[i][0] + "</b></p>" +
      "<p> Hotel cost: <b>£" + prices[i][1] + "</b></p>" +
      "<p> Rent cost: <b>£" + prices[i][2] + "</b></p>" +
      "<p> Rent + Hotel cost: <b>£" + prices[i][3] + "</b></p>" +
      "</div>" +
      "</div>",
      ariaLabel: locations[i][2],
    }))

    markers[i].addListener("click", function() {
      if (pointer || ctrl) {
        // ROUTE PLANNER ADD
        pointer = false
        route.push([markers[i].ti.lat(), markers[i].ti.lng(), markers[i].title])
        removeFromCopy(markers[i].title)
        const option = document.createElement("p")
        option.innerHTML = markers[i].title + "--> "
        document.getElementById("outputDisplay").appendChild(option)
        createLine(route[(route.length-1)], route[(route.length-2)])
        if (!ctrl) {
          document.getElementById("routeHolder").style.display = "flex"
          document.getElementById("settings").style.display = "flex"
          document.getElementById("map").style.display = "flex"
          document.getElementById("map").style.width = "100%"
        }
        

      
        routeMarker.push(markers[i])
        distance += Number(calckm(routeMarker))

        // CALCULATE STATS
        if ((distance / 5) >= 1) {
          document.getElementById("time").innerHTML = "Estimated Time of Route: " + (distance / 5).toPrecision(1) + "h " + Math.round(((distance % 5) / 5 * 60)) + "m"
        } else {
          document.getElementById("time").innerHTML = "Estimated Time of Route: " + Math.round(((distance % 5) / 5 * 60)) + "m"
        }

        

        document.getElementById("distance").innerHTML = "Current Route Distance: " + distance.toPrecision(3) + "km"

        // CALCULATE RUSH
        for (let i = 0; i < route.length; i++) {
          for (let j = 1; j < locations.length; j++) {
            if (locations[j][2] == route[i][2]) {
              startCash -= prices[j][0]
              if (startCash > 0) {
                rush++
                if (rush % 4 == 0) { // PASSING GO
                  console.log(locations[j][2])
                  startCash += 200
                }
              }
            }
          }
        }
      
        document.getElementById("run").innerHTML = "Location Rush: " + rush
      } else {
        // OPEN INFO WINDOW
        description[i].open({
          anchor: markers[i],
          map
        })
      }
    })
  }

  // POINTERS TO MEASURE DISTANCE
  let temp = []

  map.addListener("click", (event) => {
    if (shift) {
      temp.push(new google.maps.Marker({
        position: event.latLng,
        icon: {
          path:google.maps.SymbolPath.CIRCLE,
          scale:5,
        },
        map,
      }))

      calckm(temp)
      drawLine(temp)
    }
  });

  // OVERRIDE PLAYER POSITION
  map.addListener("click", function(event){
    if (alt && admin) {
      overridePos = [event.latLng.lat(), event.latLng.lng()]
    }
  })


  console.log(markers)
  console.log(locations)
  routeMarker = [markers[0]]
}

window.initMap = initMap;

// CALCULATE DISTANCE
function calckm(array) {
  if (array.length > 1) {
    let current = array[(array.length-1)].ti
    let previous = array[(array.length-2)].ti
    if (current == undefined) {
      current = array[(array.length-1)].getPosition()
      previous = array[(array.length-2)].getPosition()
    }
    const earthRadius = 6371
    let x = deg2rad(previous.lat() - current.lat())
    let y = deg2rad(previous.lng() - current.lng())
    let z = Math.sin(x/2) * Math.sin(x/2) + 
      Math.cos(deg2rad(current.lat())) * Math.cos(deg2rad(previous.lat())) *
      Math.sin(y/2) * Math.sin(y/2)
    let j = 2 * Math.atan2(Math.sqrt(z), Math.sqrt(1-z))
    const dis = j * earthRadius
    console.log(dis.toPrecision(3) + "km")

    return dis.toPrecision(3)
  }
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// DISTANCE LINE
function drawLine(array, color = "#000000") {
  if (array.length > 1) {
    new google.maps.Polyline({
      path: [
        array[(array.length-1)].getPosition(),
        array[(array.length-2)].getPosition()
      ],
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map
    });
  }
}

// FILTER LOGIC
let update
let updateTo

document.getElementById("all").addEventListener("click", function() {
  if (all) {
    all = false
    other = false
    houses = false
    brown = false
    lightBlue = false
    pink = false
    orange = false
    red = false
    yellow = false
    green = false
    darkBlue = false
  } else {
    all = true
    other = true
    houses = true
    brown = true
    lightBlue = true
    pink = true
    orange = true
    red = true
    yellow = true
    green = true
    darkBlue = true
  }

  update = "all"
  updateTo = all
  updateMarkers()
})

document.getElementById("other").addEventListener("click", function() {
  other ? other = false : other = true
  update = "other"
  updateTo = other
  updateMarkers()
})

document.getElementById("houses").addEventListener("click", function() {
  if (houses) {
    houses = false 
    brown = false
    lightBlue = false
    pink = false
    orange = false
    red = false
    yellow = false
    green = false
    darkBlue = false
  } else {
    houses = true
    brown = true
    lightBlue = true
    pink = true
    orange = true
    red = true
    yellow = true
    green = true
    darkBlue = true
  }
  update = "houses"
  updateTo = houses
  updateMarkers()
})

document.getElementById("brown").addEventListener("click", function() {
  brown ? brown = false : brown = true
  update = "brown"
  updateTo = brown
  updateMarkers()
})

document.getElementById("lightBlue").addEventListener("click", function() {
  lightBlue ? lightBlue = false : lightBlue = true
  update = "light-blue"
  updateTo = lightBlue
  updateMarkers()
})

document.getElementById("pink").addEventListener("click", function() {
  pink ? pink = false : pink = true
  update = "pink"
  updateTo = pink
  updateMarkers()
})

document.getElementById("orange").addEventListener("click", function() {
  orange ? orange = false : orange = true
  update = "orange"
  updateTo = orange
  updateMarkers()
})

document.getElementById("red").addEventListener("click", function() {
  red ? red = false : red = true
  update = "red"
  updateTo = red
  updateMarkers()
})

document.getElementById("yellow").addEventListener("click", function() {
  yellow ? yellow = false : yellow = true
  update = "yellow"
  updateTo = yellow
  updateMarkers()
})

document.getElementById("green").addEventListener("click", function() {
  green ? green = false : green = true
  update = "green"
  updateTo = green
  updateMarkers()
})

document.getElementById("darkBlue").addEventListener("click", function() {
  darkBlue ? darkBlue = false : darkBlue = true
  update = "dark-blue"
  updateTo = darkBlue
  updateMarkers()
})

// UPDATE POINTERS
function updateMarkers() {
  for (let i = 0; i < markers.length; i++) {
    for (let j = 0; j < markers[i].tags.length; j++) {
      if (markers[i].tags[j] == update) {
        if (!updateTo) {
          markers[i].map = null
        } else {
          markers[i].map = map
        }
      }
    }
  }
  updateDOM()
}

// UPDATING DOM POINTERS
function updateDOM() {
  all ? document.getElementById("all").checked = true : document.getElementById("all").checked = false
  other ? document.getElementById("other").checked = true : document.getElementById("other").checked = false
  houses ? document.getElementById("houses").checked = true : document.getElementById("houses").checked = false
  brown ? document.getElementById("brown").checked = true : document.getElementById("brown").checked = false
  lightBlue ? document.getElementById("lightBlue").checked = true : document.getElementById("lightBlue").checked = false
  pink ? document.getElementById("pink").checked = true : document.getElementById("pink").checked = false
  orange ? document.getElementById("orange").checked = true : document.getElementById("orange").checked = false
  red ? document.getElementById("red").checked = true : document.getElementById("red").checked = false
  yellow ? document.getElementById("yellow").checked = true : document.getElementById("yellow").checked = false
  green ? document.getElementById("green").checked = true : document.getElementById("green").checked = false
  darkBlue ? document.getElementById("darkBlue").checked = true : document.getElementById("darkBlue").checked = false
}

// MENU CONTROLS
let menu = false

document.getElementById("mobileIcon").addEventListener("click", function() {
  if (menu) {
    document.getElementById("mobileIcon").innerHTML = "☰"
    document.getElementById("settings").style.display = "none"
    document.getElementById("map").style.display = "block"
    document.getElementById("mobileQuick").style.display = "flex"
    menu = false
  } else {
    document.getElementById("mobileIcon").innerHTML = "X"
    document.getElementById("settings").style.display = "flex"
    document.getElementById("map").style.display = "none"
    document.getElementById("mobileQuick").style.display = "none"
    menu = true
  }
})

// CENTER TO PLAYER
let buttonP = document.getElementsByClassName("toPlayer")

for (let i = 0; i < buttonP.length; i++) {
  buttonP[i].addEventListener("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const pos = { lat: position.coords.latitude, lng: position.coords.longitude }
  
          map.setCenter(pos)
        }
      )
    }
  })
}

// CENTER TO MAP
let buttonC = document.getElementsByClassName("toCenter")

for (let i = 0; i < buttonC.length; i++) {
  buttonC[i].addEventListener("click", function() {
    map.setCenter(center)
  })
}


// SHIFT + CTRL DETECTION
let shift = false
let ctrl = false
let alt = false

window.addEventListener("keydown", function(event) {
  switch(event.keyCode) {
    case 16:
      shift = true 
      break
    case 17:
      ctrl = true
      break
    case 18:
      alt = true
      break
  }
})

window.addEventListener("keyup", function(event) {
  switch(event.keyCode) {
    case 16:
      shift = false 
      break
    case 17:
      ctrl = false
      break
    case 18:
      alt = false
      break
  }
})

// OVERRIDE POSITION LOGIC
let admin = false

document.getElementById("override").addEventListener("click", function() {
  if (!admin) {
    admin = true
    override()
  } else {
    admin = false
  }
})

let overridePos = []

function override() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      overridePos = [position.coords.latitude, position.coords.longitude]
    })
  }
}

window.addEventListener("keydown", function(event) {
  switch(event.code) {
    case "ArrowLeft":
      overridePos[1] -= 0.001
      break
    case "ArrowRight":
      overridePos[1] += 0.001
      break
    case "ArrowUp":
      overridePos[0] += 0.001
      break
    case "ArrowDown":
      overridePos[0] -= 0.001
      break
  }
})

let radius = 0.001
let pos
let visited = []

// UPDATE PLAYER POSITION
let timer = setInterval(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        pos = { lat: position.coords.latitude, lng: position.coords.longitude }
        if (player == null) {
          player = new google.maps.Marker({
            position: pos,
            icon: "upload/scoutIcon.png",
            map,
            title: "Player"
          })
        } else {
          if (admin) {
            pos = { lat: overridePos[0], lng: overridePos[1] }
            player.setPosition(pos)
          } else {
            player.setPosition(pos)
          }  
          // COLLISION DETECTION
          for (let i = 0; i < locations.length; i++) {
            const x = locations[i][1] - pos.lng
            const y = locations[i][0] - pos.lat
            const distance = Math.sqrt(x**2 + y**2)
            if (distance <= radius) {
              let condition = true
              for (let j = 0; j < visited.length; j++) {
                if (visited[j] == markers[i].title) {
                  condition = false
                }
              }
              if (condition) {
                async function color() {
                  const {PinElement} = await google.maps.importLibrary("marker");
                  const pin = new PinElement({
                    background: "#00FF00",
                    borderColor: "#013220",
                    glyphColor: "#013220",
                  });
                  markers[i].content = pin.element;
                }
                color()
                visited.push(markers[i].title)
                visitedTotal()
                totalBuyingCost()
                rentLoss()
              }
            }
          }
          // console.log(visited)
        }
      }
    )
  } else {
    clearInterval(timer)
  }
}, 250)

// CALCULATE TOTAL COST (BUYING)
function totalBuyingCost() {
  let totalBuyingCost = 0

  for (let i = 0; i < prices.length; i++) {
    let condition = false
    for (let j = 0; j < visited.length; j++) {
      if (locations[i][2] == visited[j]) {
        condition = true
      } 
    }
    if (prices[i][0] != "N/A" && !condition) {
      totalBuyingCost += prices[i][0]
    }   
  }

  document.getElementById("costOutput").innerHTML = "Cost: £" + totalBuyingCost
}


// CALCULATE VISTED/TOTAL
function visitedTotal() {
  document.getElementById("visitOutput").innerHTML = "Visited: " + visited.length + "/" + locations.length + " (" + Math.floor((visited.length/locations.length) * 100) + "%)"
}

// CALCULATE LOSS
function rentLoss() {
  let gameLossRent = 0
  let gameLossHouse = 0
  let endLossRent = 0
  let endLossHouse = 0
  for (let i = 0; i < locations.length; i++) {
    let condition = false
    for (let j = 0; j < visited.length; j++) {
      if (locations[i][2] == visited[j]) {
        condition = true
      }
    }
    let done = false
    if (!condition) {
      if (prices[i][3] != "N/A") {
        endLossHouse += (prices[i][3] * 1.5) // RENT + HOUSE
        gameLossHouse += prices[i][3]
        done = true
      }
      if (prices[i][2] != "N/A") {
        endLossRent += (prices[i][2] * 1.5) //RENT
        gameLossRent += prices[i][2]
        if (!done) {
          endLossHouse += (prices[i][2] * 1.5)
          gameLossHouse += prices[i][2]
        }
      }
    }
  }
  let differenceRent = gameLossRent - endLossRent
  let differenceHouse = gameLossHouse - endLossHouse
  document.getElementById("duringOutput").innerHTML = "During: £" + gameLossRent + " - £" + gameLossHouse 
  document.getElementById("endOutput").innerHTML = "End: £" + endLossRent + " - £" + endLossHouse 
  document.getElementById("differenceOutput").innerHTML = "Difference: " + differenceRent + " : " + differenceHouse 
}

rentLoss()

// DROPDOWN LOGIC
let copy = [...locations]
let route = [[...copy[0]]]
copy.shift()

function createDropdown() {
  for (let i = 0; i < copy.length + 1; i++) {
    if (i == 0) {
      const option = document.createElement("option")
      option.innerHTML = "Select Marker to Input"
      document.getElementById("select").appendChild(option) 
    } else {
      const option = document.createElement("option")
      option.innerHTML = copy[(i - 1)][2]
      document.getElementById("select").appendChild(option)
    }
    
  }
}

createDropdown()

document.getElementById("select").addEventListener("input", function(event) {
  let value = event.target.value
  for (let i = 0; i < copy.length; i++) {
    if (copy[i][2] == value) {
      route.push(copy[i])
    }
  }
  removeFromCopy(value)
  const option = document.createElement("p")
  option.innerHTML = value + "--> "
  document.getElementById("outputDisplay").appendChild(option)
  createLine(route[(route.length-1)], route[(route.length-2)])
})

function removeFromCopy(title) {
  for (let i = 0; i < copy.length; i++) {
    if (copy[i][2] == title) {
      copy.splice(i,1)
      break
    }
  } 
  removeChildren()
}

function removeChildren() {
  const select = document.getElementById("select")
  while(select.children.length) {
    select.firstChild.remove()
  }
  createDropdown()
}

// REMOVE ELEMENTS FOR POINTER
let pointer = false

document.getElementById("icon").addEventListener("click", function() {
  pointer = true
  document.getElementById("routeHolder").style.display = "none"
  document.getElementById("settings").style.display = "none"
  document.getElementById("map").style.display = "block"
  document.getElementById("map").style.width = "100%"
})

// LOCATION LINE 
function createLine(first, second) {
  new google.maps.Polyline({
    path: [
      {lat: first[0], lng: first[1]},
      {lat: second[0], lng: second[1]}
    ],
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 5,
    map
  });
}

// DOWNLOAD ROUTE
document.getElementById("download").addEventListener("click", function() {
  const a = document.createElement("a")
  a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(route)) + ";" + encodeURIComponent(JSON.stringify(distance)));
  a.setAttribute('download', "savedRoute(" + distance.toPrecision(3) + ").json");

  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
})


// UPLOADING FILE
document.getElementById("upload").addEventListener("input", function() {
  let file = document.getElementById("upload").files[0]
  let url = URL.createObjectURL(file)

  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    if (this.status == 200) {
      reader.readAsText(this.response);
    }
  };
  xhr.send();
})

// READ FILE
const reader = new FileReader();
reader.addEventListener('loadend', () => {
  const split = reader.result.split(";")
  let array = JSON.parse(split[0])
  document.getElementById("distance").innerHTML = "Current Route Distance: " + Number(split[1]).toPrecision(3) + "km"
  distance = Number(split[1])

  if ((distance / 5) >= 1) {
    document.getElementById("time").innerHTML = "Estimated Time of Route: " + (distance / 5).toPrecision(1) + "h " + Math.round(((distance % 5) / 5 * 60)) + "m"
  } else {
    document.getElementById("time").innerHTML = "Estimated Time of Route: " + Math.round(((distance % 5) / 5 * 60)) + "m"
  }
  
  
  for (let i = 0; i < array.length-1; i++) {
    createLine([array[i][0], array[i][1]], [array[(i+1)][0], array[(i+1)][1]])
  }

  let Marray = []
  
  for (let i = 1; i < array.length; i++) {
    route.push(array[i])
    const option = document.createElement("p")
    option.innerHTML = array[i][2] + "--> "
    document.getElementById("outputDisplay").appendChild(option)
    removeFromCopy(array[i][2])
    Marray.push(new dummy(array[i][0], array[i][1]))
  }

  routeMarker = Marray

  rush = 0
  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < locations.length; j++) {
      if (locations[j][2] == array[i][2]) {
        startCash -= prices[j][0]
        if (startCash > 0) {
          rush++
          if (rush % 4 == 0) { // PASSING GO
            console.log(locations[j][2])
            startCash += 200
          }
        }
      }
    }
  }

  document.getElementById("run").innerHTML = "Location Rush: " + rush

});

// REMOVE POPUP
let x = setInterval(function() {
  console.log(map)
  if (document.getElementById("map").children.length > 1) {
    document.getElementById("map").children[1].remove()
    clearInterval(x)
  } 
},500)
