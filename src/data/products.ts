import { Product } from "@/types/shop";

export const products: Product[] = [
  // Fertilizers
  {
    id: "urea-fertilizer",
    name: "Urea Fertilizer",
    price: 1200,
    category: "Fertilizer",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "High nitrogen content fertilizer for better crop growth"
  },
  {
    id: "dap-fertilizer",
    name: "DAP Fertilizer",
    price: 1350,
    category: "Fertilizer",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    description: "Di-ammonium phosphate for soil enrichment"
  },
  {
    id: "npk-fertilizer",
    name: "NPK Fertilizer",
    price: 1100,
    category: "Fertilizer",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop",
    description: "Balanced NPK ratio for complete plant nutrition"
  },
  {
    id: "organic-compost",
    name: "Organic Compost",
    price: 800,
    category: "Fertilizer",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop",
    description: "100% organic compost for sustainable farming"
  },
  // Seeds
  {
    id: "wheat-seeds",
    name: "Hybrid Wheat Seeds",
    price: 800,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1558517259-165ae4b10f7f?w=400&h=300&fit=crop",
    description: "High-yield hybrid wheat variety"
  },
  {
    id: "rice-seeds",
    name: "Basmati Rice Seeds",
    price: 950,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop",
    description: "Premium basmati rice seeds for quality harvest"
  },
  {
    id: "mustard-seeds",
    name: "Mustard Seeds",
    price: 450,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1596557631311-f29c6de11f57?w=400&h=300&fit=crop",
    description: "High oil content mustard variety"
  },
  {
    id: "cotton-seeds",
    name: "Cotton Seeds",
    price: 1200,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400&h=300&fit=crop",
    description: "BT cotton seeds for pest resistance"
  },
  // Pesticides
  {
    id: "pesticide-spray",
    name: "Pesticide Spray",
    price: 650,
    category: "Pesticide",
    image: "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=400&h=300&fit=crop",
    description: "Broad spectrum pesticide for crop protection"
  },
  {
    id: "fungicide",
    name: "Fungicide Solution",
    price: 550,
    category: "Pesticide",
    image: "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=400&h=300&fit=crop",
    description: "Effective fungicide for disease control"
  },
  {
    id: "herbicide",
    name: "Herbicide",
    price: 720,
    category: "Pesticide",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    description: "Selective herbicide for weed management"
  },
  {
    id: "insecticide",
    name: "Insecticide",
    price: 480,
    category: "Pesticide",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=300&fit=crop",
    description: "Fast-acting insecticide for pest control"
  },
  // Tools
  {
    id: "hand-trowel",
    name: "Hand Trowel",
    price: 350,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "Ergonomic hand trowel for planting"
  },
  {
    id: "pruning-shears",
    name: "Pruning Shears",
    price: 580,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=400&h=300&fit=crop",
    description: "Sharp pruning shears for trimming"
  },
  {
    id: "garden-hoe",
    name: "Garden Hoe",
    price: 420,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?w=400&h=300&fit=crop",
    description: "Durable garden hoe for soil cultivation"
  },
  {
    id: "watering-can",
    name: "Watering Can",
    price: 280,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=300&fit=crop",
    description: "10L capacity watering can"
  }
];

export const categories = ["All", "Fertilizer", "Seeds", "Pesticide", "Tools"];
