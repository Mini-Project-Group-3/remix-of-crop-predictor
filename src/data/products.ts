import { Product } from "@/types/shop";

export const products: Product[] = [
  // Fertilizers
  {
    id: "urea-fertilizer",
    name: "Urea Fertilizer",
    price: 1200,
    category: "Fertilizer",
    image: "https://yield-wise-shop.lovable.app/assets/urea-fertilizer-BNpB_thJ.jpg",
    description: "High nitrogen content fertilizer for better crop growth"
  },
  {
    id: "dap-fertilizer",
    name: "DAP Fertilizer",
    price: 1350,
    category: "Fertilizer",
    image: "https://yield-wise-shop.lovable.app/assets/dap-fertilizer-OAjxLlX1.jpg",
    description: "Di-ammonium phosphate for soil enrichment"
  },
  {
    id: "npk-fertilizer",
    name: "NPK Fertilizer",
    price: 1100,
    category: "Fertilizer",
    image: "https://yield-wise-shop.lovable.app/assets/npk-fertilizer-CjM7boYk.jpg",
    description: "Balanced NPK ratio for complete plant nutrition"
  },
  {
    id: "organic-compost",
    name: "Organic Compost",
    price: 800,
    category: "Fertilizer",
    image: "https://yield-wise-shop.lovable.app/assets/organic-compost-Ds2Q8ZSv.jpg",
    description: "100% organic compost for sustainable farming"
  },
  // Seeds
  {
    id: "wheat-seeds",
    name: "Hybrid Wheat Seeds",
    price: 800,
    category: "Seeds",
    image: "https://yield-wise-shop.lovable.app/assets/wheat-seeds-YGN87FzE.jpg",
    description: "High-yield hybrid wheat variety"
  },
  {
    id: "rice-seeds",
    name: "Basmati Rice Seeds",
    price: 950,
    category: "Seeds",
    image: "https://yield-wise-shop.lovable.app/assets/rice-seeds-QsjDDwTp.jpg",
    description: "Premium basmati rice seeds for quality harvest"
  },
  {
    id: "mustard-seeds",
    name: "Mustard Seeds",
    price: 450,
    category: "Seeds",
    image: "https://yield-wise-shop.lovable.app/assets/mustard-seeds-jZLktKRi.jpg",
    description: "High oil content mustard variety"
  },
  {
    id: "cotton-seeds",
    name: "Cotton Seeds",
    price: 1200,
    category: "Seeds",
    image: "https://yield-wise-shop.lovable.app/assets/cotton-seeds-oYaB8iZu.jpg",
    description: "BT cotton seeds for pest resistance"
  },
  // Pesticides
  {
    id: "pesticide-spray",
    name: "Pesticide Spray",
    price: 650,
    category: "Pesticide",
    image: "https://yield-wise-shop.lovable.app/assets/pesticide-spray-CjqlDX7d.jpg",
    description: "Broad spectrum pesticide for crop protection"
  },
  {
    id: "fungicide",
    name: "Fungicide Solution",
    price: 720,
    category: "Pesticide",
    image: "https://yield-wise-shop.lovable.app/assets/fungicide-B2aCGxp1.jpg",
    description: "Effective fungicide for disease control"
  },
  {
    id: "insect-killer",
    name: "Insect Killer",
    price: 580,
    category: "Pesticide",
    image: "https://yield-wise-shop.lovable.app/assets/insect-killer-_zTh9A6X.jpg",
    description: "Fast-acting insecticide for pest control"
  },
  // Farming Tools
  {
    id: "hand-trowel",
    name: "Hand Trowel",
    price: 350,
    category: "Farming Tools",
    image: "https://yield-wise-shop.lovable.app/assets/hand-trowel-BSo0k2Aa.jpg",
    description: "Ergonomic hand trowel for planting"
  },
  {
    id: "garden-hoe",
    name: "Garden Hoe",
    price: 550,
    category: "Farming Tools",
    image: "https://yield-wise-shop.lovable.app/assets/garden-hoe-DP-wgiyR.jpg",
    description: "Durable garden hoe for soil cultivation"
  },
  {
    id: "pruning-shears",
    name: "Pruning Shears",
    price: 480,
    category: "Farming Tools",
    image: "https://yield-wise-shop.lovable.app/assets/pruning-shears-BwSadHgO.jpg",
    description: "Sharp pruning shears for trimming"
  },
  {
    id: "watering-can",
    name: "Watering Can",
    price: 320,
    category: "Farming Tools",
    image: "https://yield-wise-shop.lovable.app/assets/watering-can-4VBa50P8.jpg",
    description: "10L capacity watering can"
  },
  {
    id: "spray-pump",
    name: "Spray Pump",
    price: 1800,
    category: "Farming Tools",
    image: "https://yield-wise-shop.lovable.app/assets/spray-pump-kO5AS7dF.jpg",
    description: "16L backpack sprayer for pesticides"
  }
];

export const categories = ["All", "Fertilizer", "Seeds", "Pesticide", "Farming Tools"];
