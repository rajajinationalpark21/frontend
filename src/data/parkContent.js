// Comprehensive park data extracted from official documentation and archives

export const howToReachData = {
  overview: "Rajaji National Park is well connected by air, rail, and road from major Indian cities. The park is easily accessible from Delhi, Meerut, Roorkee, Haridwar, Rishikesh, Mussoorie, Dehradun, and Chandigarh.",
  air: {
    airport: "Jolly Grant Airport, Dehradun",
    distance: "35 km from the Park",
    flightTime: "55 minutes daily flight from New Delhi (DEL)",
    details: "Daily flights connect Dehradun with New Delhi, Mumbai, and other major Indian hubs. Taxis and private rentals are readily available at the airport terminal to transfer directly to any park entry gate or nearby resorts."
  },
  rail: {
    nearestRailhead: "Haridwar Junction (HW) — 24 km from main core",
    stations: [
      { name: "Haridwar Railway Station", distance: "24 km to Core / 8 km to Chilla Gate", note: "Primary railhead connected to all major metros" },
      { name: "Rishikesh Railway Station", distance: "18 km to Park", note: "Ideal for travelers heading to Gohari and northern zones" },
      { name: "Dehradun Railway Station", distance: "56 km to Park", note: "Best for entering through Ramgarh, Asarori or Mohand gates" }
    ],
    popularTrains: [
      { name: "New Delhi - Dehradun Shatabdi Express", number: "12017 / 12018", frequency: "Daily" },
      { name: "Jan Shatabdi Express", number: "12055 / 12056", frequency: "Daily" },
      { name: "Mussoorie Express", number: "14041 / 14042", frequency: "Daily overnight" },
      { name: "Vande Bharat Express", number: "22457 / 22458", frequency: "6 days a week (Fastest)" }
    ]
  },
  road: {
    delhiDistance: "220 km (approx. 4.5 - 5 hours drive via NH-334)",
    routeSteps: [
      "Delhi",
      "Meerut Bypass",
      "Khatauli",
      "Muzaffarnagar Bypass",
      "Roorkee",
      "Haridwar",
      "Chilla Gate (Across Ganges Canal Bridge)"
    ],
    distances: [
      { from: "Haridwar", distance: "9 km" },
      { from: "Rishikesh", distance: "18 km" },
      { from: "Dehradun", distance: "56 km" },
      { from: "Kotdwar", distance: "75 km" },
      { from: "Mussoorie", distance: "98 km" },
      { from: "Chandigarh", distance: "210 km" },
      { from: "Delhi", distance: "220 km" },
      { from: "Lucknow", distance: "510 km" }
    ]
  },
  coordinates: {
    latitude: "29° 56' 40\" N to 30° 20' N",
    longitude: "78° 01' 15\" E to 77° 54' 30\" E",
    altitude: "300m to 1,350m above sea level"
  }
};

export const safariZonesData = [
  {
    id: "chila",
    name: "Chila Range (Showcase Core)",
    tag: "Most Popular",
    description: "The crown jewel and prime showcase range of Rajaji Tiger Reserve. Features expansive grasslands, dense sal groves, and high probabilities of elephant herds and tiger sightings along the Ganges canal basin.",
    timings: "Summer: 6:00 AM - 9:00 AM & 3:00 PM - 6:00 PM | Winter: 7:00 AM - 10:00 AM & 2:30 PM - 5:30 PM",
    openSeason: "15th November to 15th June",
    entryGate: "Chila Gate (near Haridwar / Chilla Barrage)",
    gypsyCost: "₹3,500 per jeep (up to 6 persons)",
    highlights: ["Elephant corridors", "Highest tiger density", "Scenic Mundal stream", "Watchtowers overlooking waterholes"]
  },
  {
    id: "gohari",
    name: "Gohari Range",
    tag: "Birding & Twilight Safari",
    description: "Nestled along the Shivalik ridges and the serene valley of Nalani. Famed for extraordinary birdwatching, twilight wildlife drives, and mountain goat (Goral) sightings on rocky cliffs.",
    timings: "Open from sunrise to twilight (Special extended season: October through July end)",
    openSeason: "October to end of July (closed only in Aug & Sep)",
    entryGate: "Gohari Gate / Kaudia Village near Vindhya Wasini Temple",
    gypsyCost: "₹3,800 per jeep (up to 6 persons)",
    highlights: ["Goral mountain goats", "Over 200 bird species", "Twilight predator activity", "Wild Brook stream walks"]
  },
  {
    id: "jhilmil",
    name: "Jhilmil Jheel Conservation Reserve",
    tag: "Swamp Deer Sanctuary",
    description: "A pristine riverine marshland adjacent to southern Rajaji. The only remaining habitat in Uttarakhand supporting vulnerable Swamp Deer (Barasingha), alongside wild tuskers and diverse migratory waterfowl.",
    timings: "Morning and Evening guided shifts",
    openSeason: "15th October to end of July",
    entryGate: "Jhilmil Gate near Laksar / Haridwar",
    gypsyCost: "₹3,500 per jeep",
    highlights: ["Swamp Deer (Barasingha)", "Migratory winter waterfowl", "Riverine grasslands", "Herds of spotted deer & wild boar"]
  },
  {
    id: "motichur",
    name: "Motichur Range",
    tag: "Dense Sal Wilderness",
    description: "A tranquil, dense sal canopy forest stretching along the Haridwar-Dehradun railway line. Home to solitary leopards, spotted deer, and prime birding trails through undisturbed forest streams.",
    timings: "Regular summer & winter safari shifts",
    openSeason: "15th November to 15th June",
    entryGate: "Motichur Gate (National Highway 7) near Raiwala",
    gypsyCost: "₹3,500 per jeep",
    highlights: ["Dense Sal forest canopy", "Leopard habitats", "Quiet wilderness without heavy crowds", "Phandowala trail connection"]
  },
  {
    id: "ranipur",
    name: "Ranipur & Mohand Range",
    tag: "Rugged Mountain Shivaliks",
    description: "Characterized by dry riverbeds ('Raus'), rugged hills, and traditional migratory elephant routes. Provides an authentic off-the-beaten-path safari for serious trackers.",
    timings: "Morning & Afternoon entry slots",
    openSeason: "15th November to 15th June",
    entryGate: "Ranipur Gate (near BHEL Haridwar) & Mohand Gate",
    gypsyCost: "₹3,500 per jeep",
    highlights: ["Ancient Shivalik rock formations", "Dry rau riverbed navigation", "Leopard tracks", "Historic forest rest houses"]
  }
];

export const ticketTariffData = {
  timings: {
    summer: "6:00 AM - 9:00 AM (Morning) & 3:00 PM - 6:00 PM (Afternoon)",
    winter: "7:00 AM - 10:00 AM (Morning) & 2:30 PM - 5:30 PM (Afternoon)",
    openDates: "15th November to 15th June (7 months open; closed during rainy monsoon)"
  },
  entranceFees: [
    { category: "Entry Permit (Per Person)", indian: "₹200", foreigner: "₹800", note: "Valid for single 3-hour safari shift" },
    { category: "Road / Vehicle Entry Fee", indian: "₹300", foreigner: "₹500", note: "Mandatory per vehicle entering park" },
    { category: "Still Camera Fee", indian: "FREE", foreigner: "₹50", note: "Non-commercial photography" },
    { category: "Video / Movie Camera", indian: "₹2,500", foreigner: "₹5,000", note: "Non-commercial amateur recording" },
    { category: "Documentary Film Shooting", indian: "₹2,500 / day", foreigner: "₹5,000 / day", note: "Requires prior permission + ₹15k/₹40k security deposit" },
    { category: "Feature Film Shooting", indian: "₹20,000 / day", foreigner: "₹20,000 / day", note: "Requires state department permit + ₹25k/₹40k security" }
  ],
  gypsyRates: [
    { zone: "Chila Core Range", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
    { zone: "Motichur / Ranipur / Mohand", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
    { zone: "Jhilmil Zone", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
    { zone: "Gohari Twilight Range", rate: "₹3,800", capacity: "Up to 6 visitors + driver & guide" }
  ],
  guideFees: [
    { type: "Mandatory General Safari Guide", fee: "₹800 per shift", note: "Certified park naturalist mandatory with each Gypsy" },
    { type: "Specialized Wildlife & Birding Expert", fee: "₹1,200 - ₹1,800 per shift", note: "Recommended for ornithologists & professional photographers" }
  ],
  importantNotes: [
    "Children above 11 years of age are charged full entry fee.",
    "Student discount is available only for officially certified institutional educational excursions with prior park authority approval.",
    "A government-approved local naturalist guide is compulsory for every safari vehicle.",
    "Elephant rides are strictly NOT offered at Rajaji National Park in accordance with ethical wildlife guidelines."
  ]
};

export const parkRulesData = {
  dos: [
    { title: "Wear Earthy & Dull Colors", desc: "Wear khaki, olive green, earthy brown, or dull grey clothing. Avoid bright neon colors, especially white, bright red, and yellow which alarm animals." },
    { title: "Maintain Absolute Silence", desc: "Keep vocal noise to a minimum inside the safari vehicle and on watchtowers. Quiet observers are rewarded with closer wildlife sightings." },
    { title: "Maintain Safe Distance", desc: "Always maintain a respectful distance from wild animals, particularly wild elephant herds and solitary tuskers. Always heed the instructions of your guide." },
    { title: "Carry Official Photo ID", desc: "Carry the original government-issued photo ID (Aadhaar, Passport, Voter ID) matching the names entered on your safari reservation permit." },
    { title: "Bring Drinking Water in Reusable Bottles", desc: "Stay hydrated during long safari drives using stainless steel or reusable flasks. Do not carry single-use disposable plastic bottles." }
  ],
  donts: [
    { title: "Strictly No Entry After Dark", desc: "No entry is permitted before sunrise or after sunset. Night driving inside the core tiger reserve is strictly prohibited and punishable by law." },
    { title: "Zero Plastic & Zero Litter", desc: "Rajaji is a strict zero-litter conservation zone. Do not throw wrappers, fruit peels, polythene, or bottles. Whatever goes into the park must come out." },
    { title: "Fire Hazard — No Cigarettes or Matches", desc: "Sal forests dry out rapidly in summer and represent a critical fire hazard. Smoking, lighting fires, or dropping lit matchsticks is strictly outlawed." },
    { title: "No Feeding or Baiting Animals", desc: "Never feed, tease, or throw food items at animals. It disrupts natural foraging habits and can trigger defensive animal aggression." },
    { title: "No Firearms, Traps, or Pets", desc: "Firearms, hunting nets, fishing rods, and domestic pets are strictly prohibited from entering the reserve boundary." },
    { title: "Speed Limit & No Honking", desc: "Vehicle speed must not exceed 30 km/h under any circumstances. Blowing vehicle horns or playing music players/radios is strictly prohibited." }
  ]
};

export const stayData = {
  wildBrook: {
    name: "Wild Brook Retreat",
    tagline: "Eco-luxury Cottages in the Shivalik Foothills",
    location: "Village Bukundi, via Chila & Kaudia village (near Vindhya Wasini Temple), Gohari Range, Dist. Pauri Garhwal",
    distance: "24 km from Haridwar",
    phone: "+91-9314880887 / +91-9660871429",
    email: "wildbrookrajaji@gmail.com / ecotales25@gmail.com",
    features: [
      "Nestled amidst the tranquil valley of Nalani overlooking Gohari range core",
      "Handcrafted eco-friendly cottages built with traditional local stonework and wood",
      "Spacious bedrooms with comfortable large beds and attached modern European bathrooms",
      "Expansive private verandahs with lounge chairs designed for relaxed birdwatching",
      "Authentic home-style Kumaoni & Garhwali cuisine prepared with organic local produce",
      "Guided birding sessions, natural stream plunges, and night campfire storytelling"
    ]
  },
  forestRestHouses: [
    { name: "Chilla FRH", suites: "3 + 2 suites", status: "Operational (Excellent)", gate: "Chila Gate", setting: "Main park entrance with riverside lawns and wildlife watchtowers" },
    { name: "Motichur FRH", suites: "2 suites", status: "Operational", gate: "Motichur Gate", setting: "Deep inside undisturbed sal forest along ancient migratory elephant trail" },
    { name: "Dholkhand FRH", suites: "2 suites", status: "Operational", gate: "Mohand & Ranipur", setting: "Picturesque colonial heritage lodge tucked in western Shivalik hills" },
    { name: "Beribara FRH", suites: "2 suites", status: "Operational", gate: "Ranipur Gate", setting: "Quiet forest outpost ideal for serious naturalists and researchers" },
    { name: "Kansrao FRH", suites: "2 suites", status: "Operational", gate: "Asharori & Motichur", setting: "Historic British-era wooden lodge in dense forest corridor" },
    { name: "Satyanarayan FRH", suites: "2 + 2 suites", status: "Operational", gate: "Haridwar-Dehradun Highway", setting: "Convenient highway access with immediate forest access" },
    { name: "Phandowala FRH", suites: "2 suites", status: "Operational", gate: "Asharori Gate", setting: "Scenic lodge beside the flowing Suswa river" },
    { name: "Ranipur FRH", suites: "2 suites", status: "Under Repair", gate: "BHEL Haridwar", setting: "Shivalik foothills setting undergoing heritage restoration" },
    { name: "Kunnao FRH", suites: "2 suites", status: "Under Repair", gate: "Rishikesh Gate", setting: "Scenic Ganga riverfront lodge undergoing structural upgrade" },
    { name: "Asharori FRH", suites: "2 suites", status: "Under Repair", gate: "Dehradun-Delhi Highway (12 km)", setting: "Colonial rest house situated along the northern entry" }
  ],
  frhBookingInfo: {
    authority: "Director / Conservator of Forests, Rajaji National Park",
    address: "5/1 Ansari Road, Dehradun - 248001, Uttarakhand (India)",
    phone: "0135-2621669",
    fax: "0135-2621669",
    bookingRule: "Forest Rest House permits are granted directly by the Forest Department. Advance reservation request of at least 15 to 30 days is strongly advised."
  }
};

export const birdsData = {
  stats: {
    totalSpecies: "400+ species recorded",
    residentSpecies: "151 resident species",
    winterMigrants: "87 migratory species",
    altitudinalMigrants: "49 altitudinal species",
    woodpeckers: "11 distinct species",
    barbets: "5 species",
    hornbills: "3 species"
  },
  families: [
    {
      group: "Hornbills",
      desc: "Charismatic canopy dwellers critical for seed dispersal across the Shiwalik canopy.",
      species: ["Great Hornbill (Near Threatened)", "Oriental Pied Hornbill", "Indian Grey Hornbill"]
    },
    {
      group: "Woodpeckers (11 Species)",
      desc: "Inhabiting the ancient Sal and Haldu tree trunks throughout the reserve.",
      species: [
        "White-naped Woodpecker", "Himalayan Woodpecker", "Rufous Woodpecker",
        "Lesser Yellownape", "Greater Yellownape", "Brown-capped Pygmy Woodpecker",
        "Grey-capped Pygmy Woodpecker", "Brown-fronted Woodpecker", "Fulvous-breasted Woodpecker",
        "Yellow-crowned Woodpecker", "Rufous-bellied Woodpecker"
      ]
    },
    {
      group: "Barbets",
      desc: "Loud, vibrantly colored frugivores active in fruiting fig and berry canopies.",
      species: ["Great Barbet", "Brown-headed Barbet", "Lineated Barbet", "Blue-throated Barbet", "Coppersmith Barbet"]
    },
    {
      group: "Raptors & Birds of Prey",
      desc: "Apex aerial hunters patrolling the open riverbeds and canopy heights.",
      species: [
        "Pallas's Fish Eagle", "Crested Serpent Eagle", "Northern Goshawk",
        "Himalayan Griffon Vulture", "Eurasian Griffon", "White-eyed Buzzard", "Black-bellied Tern"
      ]
    },
    {
      group: "Kingfishers",
      desc: "Brilliantly plumaged divers fishing along the Ganges river and quiet forest brooks.",
      species: ["Crested Kingfisher", "Pied Kingfisher", "Stork-billed Kingfisher", "Common Kingfisher", "White-throated Kingfisher"]
    },
    {
      group: "Waterbirds & Wetland Species",
      desc: "Wintering flocks congregating around the Bhimgoda Barrage backwaters and river islands.",
      species: [
        "Black-necked Stork (Near Threatened)", "Painted Stork", "Darter (Snakebird)",
        "Ferruginous Pochard", "Ruddy Shelduck (Brahminy Duck)", "Bar-headed Goose"
      ]
    }
  ],
  restrictedRange: [
    { name: "Brooks's Leaf-warbler (Phylloscopus subviridis)", status: "Western Himalayas Endemic Bird Area winter visitor" },
    { name: "Tytler's Leaf-warbler (Phylloscopus tytleri)", status: "Vulnerable Western Himalayan winter migrant" }
  ]
};

export const birdingAreasData = [
  {
    name: "Gohari Range Birding Circuit",
    badge: "Top Rated for Birders",
    distance: "Custom walking & jeep tracks",
    season: "October through July",
    fee: "₹1,500 per guided session",
    description: "Considered the finest birdwatching sector in Rajaji. Twilight safaris yield owls, nightjars, barbets, sunbirds, and the rare opportunity to observe Himalayan Goral on the bluffs.",
    highlights: ["Highest passerine diversity", "Suswa river confluence", "Drongo cuckoo & sunbirds"]
  },
  {
    name: "Chila Forest Drive",
    badge: "Open Grasslands & Waterholes",
    distance: "26 km forest track",
    season: "Mid-Nov to Mid-June",
    fee: "Included in standard safari permit",
    description: "A scenic 26-kilometer motorable forest track winding through alluvial grassland, dry riverbeds, and mixed forests. Excellent for raptors, hornbills, and peafowl.",
    highlights: ["Crested serpent eagle", "Indian peafowl in abundance", "Great hornbill flyovers"]
  },
  {
    name: "Phanduwala - Kansrao - Motichur Trail",
    badge: "Deep Forest Trail",
    distance: "40 km continuous wilderness",
    season: "Permit required through Forest Department",
    fee: "Special permission route",
    description: "An undisturbed, 40-kilometer remote forest transect following the Suswa river through towering sal canopies. Unequalled for woodpeckers, thrushes, and babblers.",
    highlights: ["11 woodpecker species", "Scimitar babblers", "Suswa wetland edge"]
  },
  {
    name: "Haridwar Ganga Barrage & Backwaters",
    badge: "Wetland & Waterfowl Haven",
    distance: "Riverside wetlands",
    season: "November to March (Peak winter)",
    fee: "Free public access points",
    description: "Formed by the barrage on River Ganga near Haridwar, these rich backwaters attract migratory waterfowl, storks, pochards, and darters arriving from Central Asia.",
    highlights: ["Black-necked stork", "Ferruginous pochard", "River terns & cormorants"]
  }
];

export const faunaData = {
  overview: "Spanning 820.42 sq km across three amalgamated sanctuaries (Rajaji, Motichur, Chilla), the reserve protects the northernmost habitat of the Asian Elephant and a thriving population of Royal Bengal Tigers.",
  primeAttractions: [
    { name: "Asian Elephant (Elephas maximus)", count: "500+", details: "Rajaji represents the northern and western boundary of Asian Elephant distribution in the world. Protected under Project Elephant." },
    { name: "Royal Bengal Tiger (Panthera tigris)", count: "51+", details: "Declared a dedicated Tiger Reserve in 2015 under Project Tiger with breeding corridors linking Corbett National Park." },
    { name: "Indian Leopard (Panthera pardus)", count: "250+", details: "Extremely common across rocky hillocks, sal forests, and edge woodlands." },
    { name: "Himalayan Sloth Bear & Black Bear", count: "Rare & Nocturnal", details: "Inhabiting deep deciduous ravines, termite mounds, and higher elevations of the Shivalik ridges." }
  ],
  herbivores: [
    { name: "Spotted Deer (Cheetal)", info: "Abundant across all open meadows and grasslands" },
    { name: "Sambar Deer", info: "The largest deer in India, frequently seen near forest waterbodies" },
    { name: "Barking Deer (Kakar)", info: "Small, secretive solitary deer renowned for its dog-like alarm bark" },
    { name: "Himalayan Goral", info: "Sure-footed mountain goat dwelling on steep rocky cliffs of Gohari" },
    { name: "Nilgai (Blue Bull)", info: "Largest Asian antelope grazing in scrub margins and open plains" },
    { name: "Wild Boar", info: "Prolific omnivore foraging throughout forest undergrowth" }
  ],
  carnivores: [
    { name: "Striped Hyena", info: "Solitary nocturnal scavenger inhabiting dry ravines and caves" },
    { name: "Golden Jackal", info: "Common pack hunter active in twilight hours" },
    { name: "Jungle Cat & Leopard Cat", info: "Agile small felines hunting birds and small rodents" },
    { name: "Himalayan Yellow-Throated Marten", info: "Arboreal mustelid hunting in tree canopies" }
  ],
  reptiles: [
    { name: "Indian Rock Python", status: "Largest non-venomous constrictor" },
    { name: "King Cobra (Ophiophagus hannah)", status: "World's longest venomous snake, inhabiting dense sal ravines" },
    { name: "Common Krait & Indian Cobra", status: "Venomous elapids native to the Shiwalik plains" },
    { name: "Bengal Monitor Lizard", status: "Common large reptile seen sunning on fallen logs" },
    { name: "Gharial & River Turtles", status: "Aquatic reptiles inhabiting the Ganges and Song rivers" }
  ],
  aquaticLife: {
    rivers: "River Ganges (24 km stretch through reserve) and Song River",
    fishes: ["Golden Mahaseer (Tor putitora)", "Goonch (Bagarius bagarius)", "Trout", "Kalabasu", "Chilwa", "Freshwater crabs"]
  }
};

export const floraData = {
  overview: "Nestled between the Shivalik ridges and the fertile Indo-Gangetic floodplains, Rajaji features exceptional botanical diversity ranging from dense tropical moist deciduous forests to dry thorn scrub and riverine khair-sissoo belts.",
  altitudinalBands: [
    { band: "High Altitude (1,000m - 1,350m)", trees: "Shiwalik Chir-Pine forests, mixed oak-broadleaved canopy on ridge crests." },
    { band: "Mid Altitude (500m - 1,000m)", trees: "Dense Shorea robusta (Sal) forests, Anogeissus, Terminalia, and bamboo brakes." },
    { band: "Low Altitude (300m - 500m)", trees: "Low Alluvial Savannah woodlands, Khair-Sissoo along riverbeds, and tall Terai grasslands." }
  ],
  dominantTrees: [
    { common: "Sal", scientific: "Shorea robusta", family: "Dipterocarpaceae", desc: "The defining climax forest tree of Rajaji, towering up to 35 meters." },
    { common: "Rohini", scientific: "Mallotus philippensis", family: "Euphorbiaceae", desc: "Crucial understory tree yielding vibrant crimson berries favoured by birds." },
    { common: "Amaltas (Golden Shower)", scientific: "Cassia fistula", family: "Fabaceae", desc: "Bursting into golden-yellow flower cascades every summer." },
    { common: "Shisham", scientific: "Dalbergia sissoo", family: "Fabaceae", desc: "Hardwood growing along gravel riverbeds and water channels." },
    { common: "Khair", scientific: "Acacia catechu", family: "Fabaceae", desc: "Pioneer tree of riverine alluvial gravel." },
    { common: "Semul (Silk Cotton)", scientific: "Bombax ceiba", family: "Malvaceae", desc: "Massive buttressed trunk with fiery scarlet blossoms in late spring." },
    { common: "Baans (Solid Bamboo)", scientific: "Dendrocalamus strictus", family: "Poaceae", desc: "Forms dense bamboo thickets providing primary fodder for wild elephants." },
    { common: "Palash (Flame of the Forest)", scientific: "Butea monosperma", family: "Fabaceae", desc: "Produces radiant orange blooms turning hillsides into flames." },
    { common: "Arjun", scientific: "Terminalia arjuna", family: "Combretaceae", desc: "Massive evergreen tree hugging riverbanks and seasonal streams." },
    { common: "Bel", scientific: "Aegle marmelos", family: "Rutaceae", desc: "Sacred indigenous fruit tree valued in Ayurvedic herbal pharmacology." },
    { common: "Aonla (Indian Gooseberry)", scientific: "Emblica officinalis", family: "Phyllanthaceae", desc: "Vitamin C-rich wild forest fruit relished by herbivores and primates." }
  ]
};

export const butterfliesData = [
  { name: "Common Mormon (Papilio polytes)", family: "Swallowtail", habitat: "Forest edges and citrus groves" },
  { name: "Peacock Pansy (Junonia almana)", family: "Nymphalidae", habitat: "Open grasslands and river sandbanks" },
  { name: "Lime Butterfly (Papilio demoleus)", family: "Swallowtail", habitat: "Gardens and deciduous forest clearings" },
  { name: "Common Emigrant (Catopsilia pomona)", family: "Pieridae", habitat: "Found in thousands during mud-puddling on wet river sand" },
  { name: "Great Eggfly (Hypolimnas bolina)", family: "Nymphalidae", habitat: "Dense shady understory" },
  { name: "Commander (Moduza procris)", family: "Nymphalidae", habitat: "Forest trails and riparian zones" }
];

export const ecoTourismData = {
  philosophy: "Conservation through responsible tourism. Rajaji's eco-tourism model prioritizes minimal ecological footprint, empowering local communities along forest boundaries, and protecting ancient elephant migration corridors.",
  pillars: [
    {
      title: "Capped Daily Vehicle Permits",
      desc: "Strict limits on the number of morning and afternoon jeeps prevent habitat stress and ensure animals maintain their natural movement patterns."
    },
    {
      title: "Local Naturalist Empowerment",
      desc: "Guiding duties are exclusively assigned to certified local residents trained by the Forest Department, generating sustainable livelihood directly from forest conservation."
    },
    {
      title: "Zero Acoustic Disturbance",
      desc: "Strict enforcement of engine health, speed monitoring under 30 km/h, and zero horns ensures minimal acoustic pollution across all zones."
    },
    {
      title: "Green & Traditional Architecture",
      desc: "Eco-resorts like Wild Brook Retreat employ indigenous riverstone, local timber, solar power, and rainwater harvesting to eliminate ecological disruption."
    }
  ]
};
