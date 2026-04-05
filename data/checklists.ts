/* ── Checklist category data ─────────────────────────── */

export interface ChecklistItem {
  title: string;
  description: string;
  icon: string;
  affiliateUrl: string;
}

export interface ChecklistCategory {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;            // Tailwind-safe accent colour token
  items: ChecklistItem[];
}

const TAG = "powerdigital1-20";

/**
 * Build an Amazon search URL with affiliate tag.
 * Search links ALWAYS resolve — no risk of dead ASIN pages.
 */
const amzSearch = (keywords: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(keywords)}&tag=${TAG}`;

/* ───────────────────────────────────────────────────────
   HOSPITALITY
   ─────────────────────────────────────────────────────── */
const hospitality: ChecklistCategory = {
  slug: "hospitality",
  title: "Sunday Hospitality",
  tagline: "Everything for coffee hour & guest services",
  description:
    "Keep your welcome area warm and well-stocked every Sunday. This checklist covers coffee, tea, creamers, cups, napkins, and all the small touches that make visitors feel at home.",
  icon: "☕",
  color: "amber",
  items: [
    {
      title: "Community Coffee — Breakfast Blend (40-ct Packets)",
      description:
        "Pre-measured 2.5 oz ground coffee packets, medium roast. Makes brewing for large groups effortless.",
      icon: "☕",
      affiliateUrl: amzSearch("Community Coffee Breakfast Blend 40 count packets"),
    },
    {
      title: "Dixie PerfecTouch 12 oz Insulated Paper Cups (160-ct)",
      description:
        "Double-wall insulated hot cups — no sleeves needed. Comfortable grip for coffee stations.",
      icon: "🥤",
      affiliateUrl: amzSearch("Dixie PerfecTouch 12oz insulated paper cups"),
    },
    {
      title: "Hot Cup Lids for 8–12 oz Cups (200-ct)",
      description:
        "Snap-on dome lids for paper hot cups. Essential for coffee stations and lobby service.",
      icon: "🫗",
      affiliateUrl: amzSearch("disposable hot cup lids 12oz 200 count"),
    },
    {
      title: "Nestle Coffee-Mate Original Creamer Packets (180-ct)",
      description:
        "Individually sealed liquid creamer singles. Non-dairy, shelf-stable, no refrigeration needed.",
      icon: "🥛",
      affiliateUrl: amzSearch("Coffee Mate Original liquid creamer singles 180 count"),
    },
    {
      title: "Sugar In The Raw Packets (200-ct)",
      description:
        "Turbinado cane sugar in individual packets. A crowd-pleasing sweetener for any coffee bar.",
      icon: "🍬",
      affiliateUrl: amzSearch("Sugar In The Raw packets 200 count"),
    },
    {
      title: "Twinings Variety Pack — Herbal & Black Tea (40-ct)",
      description:
        "Assorted tea bags including English Breakfast, Earl Grey, and herbal options for non-coffee drinkers.",
      icon: "🍵",
      affiliateUrl: amzSearch("Twinings variety pack herbal black tea 40 count"),
    },
    {
      title: "Bamboo Coffee Stir Sticks (Individually Wrapped)",
      description:
        "Eco-friendly bamboo stirrers, individually wrapped for hygienic self-serve stations.",
      icon: "🥢",
      affiliateUrl: amzSearch("bamboo coffee stir sticks individually wrapped"),
    },
    {
      title: "Vanity Fair Everyday Napkins (660-ct)",
      description:
        "Soft 2-ply white napkins for coffee tables, welcome centers, and fellowship meals.",
      icon: "🧻",
      affiliateUrl: amzSearch("Vanity Fair everyday napkins 660 count"),
    },
    {
      title: "Dixie Ultra Paper Plates 10\" (44-ct × 4)",
      description:
        "Sturdy, cut-resistant plates for potlucks, fellowship lunches, and after-service snacks.",
      icon: "🍽️",
      affiliateUrl: amzSearch("Dixie Ultra paper plates 10 inch 176 count"),
    },
    {
      title: "Kirkland Signature Bottled Water (40-ct, 16.9 oz)",
      description:
        "Individual bottles for greeters, guest bags, and welcome tables.",
      icon: "💧",
      affiliateUrl: amzSearch("Kirkland Signature bottled water 40 pack 16.9 oz"),
    },
    {
      title: "Folgers Classic Roast Instant Coffee (16 oz)",
      description:
        "Fast-dissolving instant coffee for quick prep when the brewer can't keep up—just add hot water.",
      icon: "⚡",
      affiliateUrl: amzSearch("Folgers Classic Roast instant coffee 16 oz"),
    },
    {
      title: "Inspirational Scripture Paper Cups with Lids (50-ct)",
      description:
        "Bible verse printed paper cups with lids and sleeves. Great for themed hospitality.",
      icon: "✝️",
      affiliateUrl: amzSearch("inspirational scripture paper coffee cups church"),
    },
  ],
};

/* ───────────────────────────────────────────────────────
   COMMUNION
   ─────────────────────────────────────────────────────── */
const communion: ChecklistCategory = {
  slug: "communion",
  title: "Communion Prep",
  tagline: "Everything for the Lord's Supper",
  description:
    "Prepare for communion services with confidence. Cups, bread, juice, trays, and table linens — all in one place so nothing is missed on Sunday morning.",
  icon: "🍷",
  color: "purple",
  items: [
    {
      title: "Broadman Church Supplies Disposable Communion Cups (1,000-ct)",
      description:
        "Plastic, recyclable communion cups that fit standard communion trays. The #1 reordered church item.",
      icon: "🥤",
      affiliateUrl: amzSearch("Broadman church communion cups 1000 count disposable"),
    },
    {
      title: "Unleavened Communion Bread Wafers (500 Pieces)",
      description:
        "Individually sealed unleavened bread wafers for inclusive communion services.",
      icon: "🍞",
      affiliateUrl: amzSearch("unleavened communion bread wafers 500 count church"),
    },
    {
      title: "Welch's 100% Concord Grape Juice (64 oz)",
      description:
        "No added sugar, 100% Concord grape juice for communion preparation.",
      icon: "🍇",
      affiliateUrl: amzSearch("Welch's 100% Concord grape juice 64 oz"),
    },
    {
      title: "Pre-filled Communion Cups — Juice & Wafer (100-ct)",
      description:
        "All-in-one pre-sealed cups with juice and wafer. Ideal for large services or outdoor events.",
      icon: "🏆",
      affiliateUrl: amzSearch("pre-filled communion cups juice wafer 100 count"),
    },
    {
      title: "Stacking Communion Tray (Stainless Steel, 40 cups)",
      description:
        "Polished stainless steel tray that holds 40 standard communion cups. Stackable for storage.",
      icon: "🍽️",
      affiliateUrl: amzSearch("stainless steel stacking communion tray 40 cups"),
    },
    {
      title: "White Tablecloth for Communion Table (70\" × 108\")",
      description:
        "Classic white tablecloth sized for standard communion tables. Machine washable.",
      icon: "🤍",
      affiliateUrl: amzSearch("white tablecloth 70x108 communion table church"),
    },
    {
      title: "Communion Bread Plate Cover (Stainless Steel)",
      description:
        "Stacking bread plate cover to keep elements clean and reverent during service.",
      icon: "🔔",
      affiliateUrl: amzSearch("communion bread plate cover stainless steel church"),
    },
    {
      title: "Kedem Grape Juice — 100% Pure (64 oz)",
      description:
        "Premium kosher grape juice. A popular alternative for churches that prefer a sweeter taste.",
      icon: "🍷",
      affiliateUrl: amzSearch("Kedem grape juice 100% pure 64 oz"),
    },
  ],
};

/* ───────────────────────────────────────────────────────
   KIDMIN
   ─────────────────────────────────────────────────────── */
const kidmin: ChecklistCategory = {
  slug: "kidmin",
  title: "KidMin Essentials",
  tagline: "Craft supplies, snacks & classroom basics",
  description:
    "Sunday School, VBS, and children's church burn through supplies fast. This checklist keeps your classrooms stocked with craft materials, healthy snacks, check-in supplies, and classroom essentials.",
  icon: "🎨",
  color: "green",
  items: [
    {
      title: "Crayola Washable Markers — Bulk 200-ct (8 Colors)",
      description:
        "Broad-line, washable markers for classrooms. Perfect for Sunday School and VBS crafts.",
      icon: "🖍️",
      affiliateUrl: amzSearch("Crayola washable markers bulk classpack 200 count"),
    },
    {
      title: "Goldfish Crackers — Variety Pack (30-ct)",
      description:
        "Cheddar, Colors, and Pretzel variety pack. Individual bags keep serving easy and hygienic.",
      icon: "🐟",
      affiliateUrl: amzSearch("Goldfish crackers variety pack 30 count"),
    },
    {
      title: "Sunday School Craft Kits — Bible Story (36 Sets)",
      description:
        "Self-adhesive religious craft kits for kids. Includes background cards, stickers, and hanging rope.",
      icon: "✂️",
      affiliateUrl: amzSearch("Sunday school craft kit religious Bible story kids"),
    },
    {
      title: "Christian Coloring Books for Kids (Bulk Pack)",
      description:
        "Bible-themed coloring books for quiet activities and take-home gifts.",
      icon: "📕",
      affiliateUrl: amzSearch("Christian coloring books kids bulk Bible"),
    },
    {
      title: "Elmer's Washable School Glue Sticks (30-ct)",
      description:
        "Non-toxic, washable glue sticks. Essential for any kids' art or craft station.",
      icon: "🖌️",
      affiliateUrl: amzSearch("Elmer's washable glue sticks 30 count school"),
    },
    {
      title: "Crayola Crayons — 24-ct Boxes (Bulk 12 Boxes)",
      description:
        "Classic crayons in bulk boxes — stock all your classroom tables at once.",
      icon: "🖍️",
      affiliateUrl: amzSearch("Crayola crayons 24 count bulk 12 pack classpack"),
    },
    {
      title: "Annie's Organic Bunny Grahams — Variety (36-ct)",
      description:
        "Honey, chocolate, and cinnamon bunny-shaped crackers. Allergy-friendly and individually packed.",
      icon: "🐰",
      affiliateUrl: amzSearch("Annie's organic bunny grahams variety pack 36 count"),
    },
    {
      title: "Construction Paper — 12 Colors (500 Sheets)",
      description:
        "Heavyweight 9×12 construction paper in 12 assorted colors for crafts and bulletin boards.",
      icon: "📄",
      affiliateUrl: amzSearch("construction paper 12 colors 500 sheets 9x12"),
    },
    {
      title: "Name Tag Labels — Hello My Name Is (200-ct)",
      description:
        "Peel-and-stick name tags for classrooms, visitors, and new families. Colorful borders.",
      icon: "🏷️",
      affiliateUrl: amzSearch("Hello My Name Is name tag labels stickers 200"),
    },
    {
      title: "Religious Sticker Sheets — Bible Theme (Bulk)",
      description:
        "Cross, heart, and scripture stickers for craft projects, reward charts, and take-home bags.",
      icon: "⭐",
      affiliateUrl: amzSearch("religious stickers Bible theme kids bulk church"),
    },
    {
      title: "Mott's 100% Apple Juice Boxes (32-ct)",
      description:
        "Individual 6.75 oz juice boxes. Shelf-stable, no refrigeration needed until opened.",
      icon: "🧃",
      affiliateUrl: amzSearch("Mott's 100% apple juice boxes 32 count"),
    },
    {
      title: "Dixie 5 oz Bath Cups (200-ct)",
      description:
        "Small paper cups for snack time water and juice. Perfect for little hands.",
      icon: "🥤",
      affiliateUrl: amzSearch("Dixie 5 oz paper bath cups 200 count"),
    },
    {
      title: "PURELL Hand Sanitizer — Pump Bottle (12 oz × 6)",
      description:
        "Gel sanitizer for every classroom and check-in station. Essential for children's ministry.",
      icon: "🧴",
      affiliateUrl: amzSearch("Purell hand sanitizer pump bottle 12 oz 6 pack"),
    },
    {
      title: "Safety Scissors — Blunt Tip Bulk Pack (24-ct)",
      description:
        "Child-safe, blunt-tip scissors in assorted colors. Sized for ages 4–8.",
      icon: "✂️",
      affiliateUrl: amzSearch("blunt tip safety scissors kids bulk pack 24"),
    },
    {
      title: "Thermal Check-In Labels for Church (1,000 Labels)",
      description:
        "Adhesive labels for children's check-in printers. Compatible with most church check-in systems.",
      icon: "🏷️",
      affiliateUrl: amzSearch("thermal check-in labels church children's ministry"),
    },
  ],
};

/* ───────────────────────────────────────────────────────
   FACILITIES
   ─────────────────────────────────────────────────────── */
const facilities: ChecklistCategory = {
  slug: "facilities",
  title: "Facilities & Janitorial",
  tagline: "Cleaning supplies, restroom stock & event prep",
  description:
    "From post-service cleanup to week-long maintenance, this list covers cleaning supplies, trash bags, paper products, and everything your facilities team needs.",
  icon: "🧹",
  color: "blue",
  items: [
    {
      title: "Clorox Disinfecting Wipes — Value Pack (300+ ct)",
      description:
        "Lemon & fresh scented. Sanitizes, cleans, and deodorizes nursery, classrooms, and common areas.",
      icon: "🧴",
      affiliateUrl: amzSearch("Clorox disinfecting wipes value pack 300 count"),
    },
    {
      title: "Heavy-Duty Contractor Trash Bags — 55 Gal (50-ct)",
      description:
        "Tear-resistant bags with ties for post-service and event cleanup. Fits 50–60 gal cans.",
      icon: "🗑️",
      affiliateUrl: amzSearch("heavy duty contractor trash bags 55 gallon 50 count"),
    },
    {
      title: "Commercial Paper Towel Rolls (6-Pack, High Capacity)",
      description:
        "High-capacity recycled fiber rolls for restrooms, kitchens, and classrooms.",
      icon: "🧻",
      affiliateUrl: amzSearch("commercial paper towel rolls high capacity 6 pack"),
    },
    {
      title: "2-Ply Toilet Paper — Bulk (30 Rolls)",
      description:
        "Septic-safe, 2-ply bathroom tissue. Enough to restock multiple restrooms at once.",
      icon: "🧻",
      affiliateUrl: amzSearch("2 ply toilet paper bulk 30 rolls septic safe"),
    },
    {
      title: "Fabuloso Multi-Purpose Cleaner — Lavender (128 oz)",
      description:
        "Concentrated all-purpose cleaner for floors, counters, and restrooms. One gallon lasts weeks.",
      icon: "🫧",
      affiliateUrl: amzSearch("Fabuloso multi-purpose cleaner lavender 128 oz gallon"),
    },
    {
      title: "Clorox Concentrated Bleach (121 oz)",
      description:
        "Concentrated germicidal bleach for deep cleaning, disinfecting, and stain removal.",
      icon: "🧪",
      affiliateUrl: amzSearch("Clorox concentrated bleach 121 oz germicidal"),
    },
    {
      title: "O-Cedar EasyWring Spin Mop & Bucket System",
      description:
        "Hands-free wringing mop system for fast, efficient floor cleaning across all rooms.",
      icon: "🧹",
      affiliateUrl: amzSearch("O-Cedar EasyWring spin mop bucket system"),
    },
    {
      title: "PURELL Wall Mount Hand Sanitizer Dispenser Refill (1200 mL)",
      description:
        "Gel refills for wall-mounted dispensers. Essential for lobbies, restrooms, and entry points.",
      icon: "🧴",
      affiliateUrl: amzSearch("Purell wall mount hand sanitizer dispenser refill 1200ml"),
    },
    {
      title: "Wet Floor Caution Signs (2-Pack, Foldable)",
      description:
        "Bright yellow bilingual caution signs. A liability must-have after mopping.",
      icon: "⚠️",
      affiliateUrl: amzSearch("wet floor caution sign foldable 2 pack yellow"),
    },
    {
      title: "Tall Kitchen Drawstring Trash Bags — 13 Gal (200-ct)",
      description:
        "Drawstring bags for kitchens, offices, and classroom waste bins.",
      icon: "🗑️",
      affiliateUrl: amzSearch("tall kitchen drawstring trash bags 13 gallon 200 count"),
    },
  ],
};

/* ───────────────────────────────────────────────────────
   OFFICE
   ─────────────────────────────────────────────────────── */
const office: ChecklistCategory = {
  slug: "office",
  title: "Office & Admin",
  tagline: "Paper, print supplies, offering envelopes & more",
  description:
    "Bulletins, envelopes, printer supplies, and everyday office essentials — the behind-the-scenes supplies that keep your church admin running smoothly.",
  icon: "📋",
  color: "slate",
  items: [
    {
      title: "Copy Paper — 8.5×11 (10-Ream Case, 5,000 Sheets)",
      description:
        "20 lb, 92 bright white multipurpose paper for bulletins, handouts, and newsletters.",
      icon: "📄",
      affiliateUrl: amzSearch("copy paper 8.5x11 10 ream case 5000 sheets 20lb"),
    },
    {
      title: "Badge Lanyards + ID Holders (100 Sets)",
      description:
        "Clear plastic badge holders with black lanyards. Great for volunteers, staff, and visitors.",
      icon: "🪪",
      affiliateUrl: amzSearch("badge lanyards ID holders clear 100 sets"),
    },
    {
      title: "Church Offering Envelopes — Tithe & Offering (500-ct)",
      description:
        "Pre-printed fields for tithes, offerings, and missions. Self-seal, bill-sized envelopes.",
      icon: "💌",
      affiliateUrl: amzSearch("church offering envelopes tithe 500 count"),
    },
    {
      title: "Church Worship Bulletin Paper (100-ct, 8.5\" × 11\")",
      description:
        "Pre-designed, scored bulletin paper ready for printing. Fold in half for a professional look.",
      icon: "📰",
      affiliateUrl: amzSearch("church bulletin paper 8.5x11 scored 100 count"),
    },
    {
      title: "HP 61 Black & Tri-Color Ink Cartridges (2-Pack)",
      description:
        "Combo pack for HP DeskJet and Envy printers — the most common church office printers.",
      icon: "🖨️",
      affiliateUrl: amzSearch("HP 61 ink cartridge combo pack black tri-color"),
    },
    {
      title: "BIC Round Stic Ballpoint Pens — Blue (60-ct)",
      description:
        "Reliable blue pens for pew racks, sign-up sheets, and guest cards.",
      icon: "🖊️",
      affiliateUrl: amzSearch("BIC Round Stic ballpoint pens blue 60 count"),
    },
    {
      title: "Avery Address Labels — 1\" × 2-5/8\" (750 Labels)",
      description:
        "Laser & inkjet compatible. Use for mailings, thank-you notes, and newsletter envelopes.",
      icon: "🏷️",
      affiliateUrl: amzSearch("Avery address labels 1x2-5/8 750 count"),
    },
    {
      title: "Post-it Super Sticky Notes — 3\" × 3\" (24 Pads)",
      description:
        "Bright colours that stand out on desks, monitors, and bulletin boards. 90 sheets per pad.",
      icon: "📝",
      affiliateUrl: amzSearch("Post-it super sticky notes 3x3 24 pads"),
    },
    {
      title: "#10 Business Envelopes — Self-Seal (500-ct)",
      description:
        "Standard white envelopes for correspondence, receipts, and donation acknowledgements.",
      icon: "✉️",
      affiliateUrl: amzSearch("#10 self seal business envelopes white 500 count"),
    },
  ],
};

/* ── Exports ──────────────────────────────────────────── */

export const allChecklists: ChecklistCategory[] = [
  hospitality,
  communion,
  kidmin,
  facilities,
  office,
];

export function getChecklistBySlug(
  slug: string
): ChecklistCategory | undefined {
  return allChecklists.find((c) => c.slug === slug);
}
