/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { Localize, useLanguage } from "./i18n";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
  Check,
  ChevronRight,
  ChevronDown,
  Instagram,
  Facebook,
  Lock,
  CreditCard,
  ArrowLeft,
  Play,
  SlidersHorizontal,
  User,
  Mail,
  Globe,
} from "lucide-react";
const accessoriesCategoryImage = "/images/accessories.jpg";
const kidsCategoryImage = "/images/kidsCategoryImage.png";
const poloCruiseHoodieImage = "/images/Cruise_Olive_Relaxed_Fit_Logo_Fleece_Hoodie_Polo_R.jpg";
const poloTanPoloDressImage = "/images/Tan_Melange_Hybrid_Knit_Polo-Bodice_Dress_Polo_Ral.jpg";
const poloBrownCorduroyDressImage = "/images/Dark_Brown_Corduroy_Pleated_Shirt_Dress_Polo_Ralph.jpg";
const poloMerlotPlaidDressImage = "/images/Merlot_Green_Multi_Plaid_Cotton-Blend_Panelled_Shi.jpg";
const zaraOysterShirtImage = "/images/Front_view_of_an_oyster-white_shirt_in_a_relaxed_f.jpg";
const zaraBlackWideLegTrousersImage = "/images/Front_view_of_black_wide-leg_trousers_with_a_front.jpg";
const heroEditorialImage = "/images/heroEditorialImage.png";
const womenEditorialImage = "/images/womenEditorialImage.png";
const menEditorialImage = "/images/menEditorialImage.jpg";
const dressEditorialImage = "/images/dressEditorialImage.png";
const knitEditorialImage = "/images/product_cashmere_sweater_1791987255309.jpg";
const outerwearEditorialImage = "/images/product_trench_coat_1791987254893.jpg";
const occasionEditorialImage = "/images/product_silk_dress_1791987255047.jpg";
const accessoriesEditorialImage = "/images/accessoriesEditorialImage.png";

const SEASON_STORIES = [
  {
    label: "The Modern Edit",
    eyebrow: "01 / EVERYDAY ELEGANCE",
    title: "Quiet confidence,\nmade to be worn.",
    description:
      "Thoughtful layers and lasting pieces for the moments that make up every day.",
    image: heroEditorialImage,
    alt: "A refined, neutral look from the Velora collection",
    category: "all",
  },
  {
    label: "Soft Tailoring",
    eyebrow: "02 / WOMENSWEAR",
    title: "A softer take\non tailoring.",
    description:
      "Easy shapes, natural tones and considered details bring a new ease to getting dressed.",
    image: womenEditorialImage,
    alt: "A light tailored look in natural tones",
    category: "women",
  },
  {
    label: "Off-Duty Uniform",
    eyebrow: "03 / MENSWEAR",
    title: "Everyday pieces,\nwith presence.",
    description:
      "Relaxed essentials with clean lines, made to move effortlessly through the day.",
    image: menEditorialImage,
    alt: "A relaxed modern menswear look",
    category: "men",
  },
  {
    label: "The Occasion Edit",
    eyebrow: "04 / DRESSING UP",
    title: "A moment worth\ndressing for.",
    description:
      "Elegant silhouettes and thoughtful finishing touches for evenings that stay with you.",
    image: dressEditorialImage,
    alt: "A black evening dress with a clean, elegant silhouette",
    category: "dresses",
  },
  {
    label: "Finishing Touches",
    eyebrow: "05 / ACCESSORIES",
    title: "The details\nmake the look.",
    description:
      "Discover the bags and small details that bring your personal style together.",
    image: accessoriesCategoryImage,
    alt: "A curated selection of fashion accessories",
    category: "accessories",
  },
  {
    label: "Little Moments",
    eyebrow: "06 / KIDS",
    title: "Comfort for\ntheir own rhythm.",
    description:
      "Easy, thoughtful favourites made for all the little things in a busy day.",
    image: kidsCategoryImage,
    alt: "A modern kidswear look",
    category: "children",
  },
  {
    label: "The Knit Edit",
    eyebrow: "07 / SOFT TEXTURES",
    title: "Soft layers,\nlasting comfort.",
    description:
      "Tactile knits and timeless shapes bring a little warmth to everyday dressing.",
    image: knitEditorialImage,
    alt: "A soft cashmere knit in a neutral tone",
    category: "tops",
  },
  {
    label: "Outerwear, Refined",
    eyebrow: "08 / LIGHT LAYERS",
    title: "A layer for\nevery in-between.",
    description:
      "Considered outerwear designed for shifting seasons and days on the move.",
    image: outerwearEditorialImage,
    alt: "A refined trench coat for transitional weather",
    category: "outerwear",
  },
  {
    label: "After Hours",
    eyebrow: "09 / OCCASIONWEAR",
    title: "Make room\nfor the moment.",
    description:
      "Fluid shapes and subtle details for plans that call for something special.",
    image: occasionEditorialImage,
    alt: "A fluid silk dress for an evening occasion",
    category: "dresses",
  },
  {
    label: "The Finishing Touch",
    eyebrow: "10 / BAGS & DETAILS",
    title: "The pieces\nyou reach for.",
    description:
      "Everyday accessories with thoughtful details and a place in your wardrobe.",
    image: accessoriesEditorialImage,
    alt: "A structured everyday handbag",
    category: "bags",
  },
] as const;

const heroFramePaths = Array.from(
  { length: 124 },
  (_, index) => `/hero-images/frame_${String(index).padStart(6, "0")}.png`,
);

interface Product {
  id: string;
  name: string;
  category:
    | "women"
    | "men"
    | "children"
    | "dresses"
    | "tops"
    | "shoes"
    | "bags"
    | "accessories"
    | "outerwear";
  brand: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  details: string[];
  materials: string;
  sizeFit: string;
  shippingReturns: string;
}

type ShopCategory =
  | "all"
  | "men"
  | "women"
  | "children"
  | "dresses"
  | "outerwear"
  | "tops"
  | "bags"
  | "accessories";

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Essential Oversized Hoodie",
    category: "men",
    brand: "Velora",
    price: 59.99,
    originalPrice: 89.99,
    discountBadge: "33% OFF",
    images: [
      "/images/product_oversized_hoodie_1791985335055.jpg",
      "/images/plp_mens_streetwear_1791985698988.jpg",
      "/images/cat_mens_collection_1791984648561.jpg",
      "/images/product_classic_sweatshirt_1791985336106.jpg",
    ],
    rating: 4.8,
    reviewsCount: 128,
    badge: "New Arrival",
    description:
      "Premium heavyweight cotton hoodie with an oversized fit for ultimate comfort and modern streetwear style.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal Gray", hex: "#374151" },
      { name: "Heather Gray", hex: "#9CA3AF" },
      { name: "Sand", hex: "#E5D5C5" },
      { name: "Black", hex: "#111111" },
    ],
    details: [
      "Crafted from high-quality heavyweight cotton",
      "Oversized fit for relaxed drape",
      "Adjustable drawstring hood",
      "Ribbed cuffs and hem",
    ],
    materials: "100% Heavyweight combed cotton, 480 GSM fleece interior.",
    sizeFit: "Designed for an intentionally oversized fit.",
    shippingReturns: "Complimentary standard shipping on all orders over $99.",
  },
  {
    id: "p2",
    name: "Minimal Linen Blend Blazer",
    category: "women",
    brand: "Velora",
    price: 189.99,
    originalPrice: 229.99,
    discountBadge: "18% OFF",
    images: [
      "/images/product_linen_blazer_1791984649177.jpg",
      "/images/hero_fashion_editorial_1791984648405.jpg",
      "/images/cat_womens_collection_1791984648546.jpg",
      "/images/product_trousers_1791984648815.jpg",
    ],
    rating: 4.9,
    reviewsCount: 124,
    badge: "Best Seller",
    description:
      "Expertly tailored from a breathable Italian linen-blend. Features structured shoulders, notched lapels, and sustainable horn-effect buttons.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#D8C5B2" },
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#F5F5F0" },
    ],
    details: [
      "52% Linen, 48% Organic Cotton",
      "Fully cupro lined interior",
      "Single-button front closure",
    ],
    materials: "Italian structured linen blend. Dry clean only.",
    sizeFit: "Tailored slim fit through shoulders.",
    shippingReturns: "Shipped in custom protective garment bags.",
  },
  {
    id: "p3",
    name: "Children Minimalist Wool Coat",
    category: "children",
    brand: "Velora Kids",
    price: 89.99,
    originalPrice: 110.0,
    discountBadge: "18% OFF",
    images: [
      "/images/plp_child_fashion_1791985698931.jpg",
      "/images/product_minimal_hoodie_1791985335028.jpg",
      "/images/product_trousers_1791984648815.jpg",
    ],
    rating: 5.0,
    reviewsCount: 42,
    badge: "New Arrival",
    description:
      "Adorable yet sophisticated wool coat crafted for juniors with soft cotton inner lining and tortoiseshell buttons.",
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: [
      { name: "Warm Camel", hex: "#C8A278" },
      { name: "Cream", hex: "#F5F5F0" },
    ],
    details: [
      "60% Wool, 40% Cotton lining",
      "Front welt pockets",
      "Durable horn-effect buttons",
    ],
    materials: "Soft brushed wool blend.",
    sizeFit: "True to size with room for layering.",
    shippingReturns: "Standard delivery in 3-5 business days.",
  },
  {
    id: "p4",
    name: "High-Waist Wide Leg Trousers",
    category: "women",
    brand: "Zara",
    price: 139.99,
    images: [
      "/images/product_trousers_1791984648815.jpg",
      "/images/cat_womens_collection_1791984648546.jpg",
      "/images/product_linen_blazer_1791984649177.jpg",
    ],
    rating: 4.9,
    reviewsCount: 76,
    badge: "Exclusive",
    description:
      "Fluid drape trousers with precise front pleats and a high-rise waistline for an elongated silhouette.",
    sizes: ["34", "36", "38", "40", "42"],
    colors: [
      { name: "Cream", hex: "#F0ECE1" },
      { name: "Charcoal", hex: "#333333" },
    ],
    details: ["60% Triacetate, 40% Polyester", "Zip fly with concealed hook"],
    materials: "Japanese Triacetate blend.",
    sizeFit: "High-rise wide leg.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p5",
    name: "Calfskin Structured Shoulder Bag",
    category: "bags",
    brand: "Adidas",
    price: 295.0,
    originalPrice: 340.0,
    discountBadge: "13% OFF",
    images: [
      "/images/product_handbag_1791984649272.jpg",
      "/images/cat_accessories_1791984648664.jpg",
    ],
    rating: 5.0,
    reviewsCount: 112,
    badge: "Limited Edition",
    description:
      "Meticulously crafted from supple Italian calfskin leather with custom polished gold-tone hardware.",
    sizes: ["One Size"],
    colors: [
      { name: "Cognac", hex: "#9E6B47" },
      { name: "Black", hex: "#111111" },
    ],
    details: ["100% Full-grain calf leather", "Microfiber suede lining"],
    materials: "Full-grain Italian calf leather.",
    sizeFit: "Dimensions: 26cm x 18cm x 9cm.",
    shippingReturns: "Shipped insured in luxury dust bag.",
  },
  {
    id: "p6",
    name: "Silk Emerald Slip Dress",
    category: "dresses",
    brand: "Lunora",
    price: 145.0,
    originalPrice: 180.0,
    discountBadge: "20% OFF",
    images: [
      "/images/product_silk_dress_1791987255047.jpg",
      "/images/cat_dresses_1791984649353.jpg",
    ],
    rating: 5.0,
    reviewsCount: 88,
    badge: "New Arrival",
    description:
      "Luxurious emerald green silk slip dress featuring a fluid cowl neckline and delicate adjustable straps.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Emerald", hex: "#046307" }],
    details: [
      "100% Mulberry Silk",
      "Cowl neckline",
      "Bias cut for flawless drape",
    ],
    materials: "100% Mulberry Silk charmeuse.",
    sizeFit: "Biased cut hugs the body gracefully.",
    shippingReturns: "Free shipping & returns.",
  },
  {
    id: "p7",
    name: "Cashmere Turtleneck Sweater",
    category: "tops",
    brand: "Lunora",
    price: 165.0,
    images: [
      "/images/product_cashmere_sweater_1791987255309.jpg",
      "/images/product_knit_top_1791984648937.jpg",
    ],
    rating: 4.9,
    reviewsCount: 140,
    badge: "Best Seller",
    description:
      "Pure Grade-A cashmere turtleneck designed in a relaxed yet refined silhouette for ultimate winter elegance.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#F5F5F0" },
      { name: "Camel", hex: "#C8A278" },
    ],
    details: ["100% Mongolian Cashmere", "Ribbed collar and cuffs"],
    materials: "Pure Grade-A Mongolian cashmere.",
    sizeFit: "Relaxed fit.",
    shippingReturns: "Complimentary shipping.",
  },
  {
    id: "p8",
    name: "Tailored Double-Breasted Trench",
    category: "outerwear",
    brand: "Burberry Edit",
    price: 290.0,
    originalPrice: 350.0,
    discountBadge: "17% OFF",
    images: [
      "/images/product_trench_coat_1791987254893.jpg",
      "/images/product_linen_blazer_1791984649177.jpg",
    ],
    rating: 5.0,
    reviewsCount: 95,
    badge: "Exclusive",
    description:
      "Classic beige tailored double-breasted trench coat with storm flaps, belted waist, and horn buttons.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Classic Beige", hex: "#D2B48C" }],
    details: [
      "Water-resistant cotton gabardine",
      "Adjustable belt with D-rings",
    ],
    materials: "Cotton gabardine with cupro lining.",
    sizeFit: "Tailored trench silhouette.",
    shippingReturns: "Free insured shipping.",
  },
  {
    id: "p9",
    name: "Classic Cotton Crewneck",
    category: "men",
    brand: "Velora",
    price: 74.0,
    originalPrice: 92.0,
    discountBadge: "20% OFF",
    images: [
      "/images/product_classic_sweatshirt_1791985336106.jpg",
      "/images/plp_mens_streetwear_1791985698988.jpg",
    ],
    rating: 4.8,
    reviewsCount: 63,
    badge: "New Arrival",
    description:
      "A soft cotton crewneck sweatshirt with a relaxed shape and clean everyday finish.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Oatmeal", hex: "#D8CFBF" },
    ],
    details: [
      "Soft cotton blend",
      "Relaxed everyday fit",
      "Ribbed collar, cuffs and hem",
    ],
    materials: "Cotton-rich brushed fleece.",
    sizeFit: "Relaxed fit. Choose your usual size.",
    shippingReturns: "Complimentary standard shipping on orders over $99.",
  },
  {
    id: "p10",
    name: "Fine Knit Everyday Top",
    category: "tops",
    brand: "Lunora",
    price: 89.0,
    images: [
      "/images/product_knit_top_1791984648937.jpg",
      "/images/product_cashmere_sweater_1791987255309.jpg",
    ],
    rating: 4.7,
    reviewsCount: 51,
    badge: "Everyday Essential",
    description:
      "A lightweight knit top with a refined texture that layers easily through the seasons.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Ivory", hex: "#F3EFE6" },
      { name: "Soft Blue", hex: "#9CAEB8" },
    ],
    details: [
      "Fine-gauge soft knit",
      "Easy layering shape",
      "Finished neckline and cuffs",
    ],
    materials: "Soft-touch viscose and cotton blend.",
    sizeFit: "Regular fit with a light drape.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p11",
    name: "Minimal Pullover Hoodie",
    category: "men",
    brand: "Velora",
    price: 68.0,
    images: ["/images/product_minimal_hoodie_1791985335028.jpg"],
    rating: 4.6,
    reviewsCount: 47,
    description:
      "An easy pullover hoodie with a pared-back look and a soft brushed interior.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Stone", hex: "#C6C0B5" },
      { name: "Black", hex: "#171717" },
    ],
    details: [
      "Soft brushed interior",
      "Adjustable hood",
      "Kangaroo front pocket",
    ],
    materials: "Cotton and recycled polyester fleece.",
    sizeFit: "Relaxed fit with room for layering.",
    shippingReturns: "Complimentary standard shipping on orders over $99.",
  },
  {
    id: "p12",
    name: "Relaxed Streetwear Tee",
    category: "men",
    brand: "Velora Studio",
    price: 42.0,
    images: [
      "/images/plp_mens_streetwear_1791985698988.jpg",
      "/images/cat_mens_collection_1791984648561.jpg",
    ],
    rating: 4.8,
    reviewsCount: 38,
    badge: "New Arrival",
    description:
      "A versatile relaxed-fit tee made for easy everyday styling and comfortable wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "White", hex: "#F5F5F0" },
      { name: "Charcoal", hex: "#3F4142" },
    ],
    details: [
      "Breathable cotton jersey",
      "Relaxed shoulder line",
      "Soft garment-washed finish",
    ],
    materials: "100% cotton jersey.",
    sizeFit: "Relaxed fit. For a closer fit, size down.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p13",
    name: "Everyday Leather Shopper",
    category: "bags",
    brand: "Velora Atelier",
    price: 215.0,
    images: [
      "/images/product_handbag_1791984649272.jpg",
      "/images/cat_accessories_1791984648664.jpg",
    ],
    rating: 4.9,
    reviewsCount: 29,
    badge: "New Arrival",
    description:
      "A polished everyday carryall with a spacious interior and timeless, versatile shape.",
    sizes: ["One Size"],
    colors: [
      { name: "Cognac", hex: "#9E6B47" },
      { name: "Black", hex: "#171717" },
    ],
    details: [
      "Roomy main compartment",
      "Interior slip pocket",
      "Comfortable shoulder straps",
    ],
    materials: "Textured vegan leather with a soft lining.",
    sizeFit: "One size. Designed to carry daily essentials.",
    shippingReturns: "Shipped in a protective dust bag.",
  },
  {
    id: "p14",
    name: "Soft Woven Scarf",
    category: "accessories",
    brand: "Lunora",
    price: 48.0,
    images: [
      "/images/cat_accessories_1791984648664.jpg",
      "/images/hero_fashion_editorial_1791984648405.jpg",
    ],
    rating: 4.7,
    reviewsCount: 34,
    description:
      "A light woven scarf that adds a soft layer and an understated finishing touch.",
    sizes: ["One Size"],
    colors: [
      { name: "Warm Neutral", hex: "#C6B7A2" },
      { name: "Olive", hex: "#686B54" },
    ],
    details: [
      "Lightweight woven texture",
      "Soft-touch finish",
      "Easy to style or gift",
    ],
    materials: "A soft blend of viscose and modal.",
    sizeFit: "One size with a generous drape.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p15",
    name: "Kids Everyday Zip Hoodie",
    category: "children",
    brand: "Velora Kids",
    price: 52.0,
    images: [
      "/images/product_minimal_hoodie_1791985335028.jpg",
      "/images/plp_child_fashion_1791985698931.jpg",
    ],
    rating: 4.9,
    reviewsCount: 26,
    badge: "New Arrival",
    description:
      "A cozy zip hoodie for busy days, made with a soft feel and easy-to-layer fit.",
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: [
      { name: "Stone", hex: "#C6C0B5" },
      { name: "Cream", hex: "#F2EEE5" },
    ],
    details: [
      "Soft brushed fabric",
      "Easy zip-front closure",
      "Ribbed cuffs and hem",
    ],
    materials: "Cotton-rich fleece.",
    sizeFit: "Regular kids' fit with room to move.",
    shippingReturns: "Standard delivery in 3-5 business days.",
  },
  {
    id: "p16",
    name: "Fluid Occasion Midi Dress",
    category: "dresses",
    brand: "Lunora",
    price: 158.0,
    originalPrice: 198.0,
    discountBadge: "20% OFF",
    images: [
      "/images/cat_dresses_1791984649353.jpg",
      "/images/product_silk_dress_1791987255047.jpg",
    ],
    rating: 4.9,
    reviewsCount: 57,
    badge: "Best Seller",
    description:
      "A graceful midi dress with a fluid silhouette, made for celebrations and evenings out.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Emerald", hex: "#356653" },
    ],
    details: [
      "Fluid movement through the skirt",
      "Elegant midi length",
      "Concealed side fastening",
    ],
    materials: "Lightweight satin with a smooth drape.",
    sizeFit: "Designed for a relaxed, flowing fit.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p17",
    name: "Cruise Olive Relaxed Fit Logo Fleece Hoodie",
    category: "men",
    brand: "Polo Ralph",
    price: 148.0,
    images: [poloCruiseHoodieImage],
    rating: 0,
    reviewsCount: 0,
    badge: "New Arrival",
    description:
      "An olive relaxed-fit fleece hoodie with a drawstring hood and embroidered Polo logo.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Olive", hex: "#77785B" }],
    details: [
      "Relaxed fit",
      "Drawstring hood and front kangaroo pocket",
      "Embroidered Polo logo",
    ],
    materials: "Fleece fabric.",
    sizeFit: "Relaxed fit. Choose your usual size.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p18",
    name: "Tan MĂ„â€šĂ‚Â©lange Hybrid Knit Polo-Bodice Dress",
    category: "dresses",
    brand: "Polo Ralph",
    price: 248.0,
    images: [poloTanPoloDressImage],
    rating: 0,
    reviewsCount: 0,
    badge: "New Arrival",
    description:
      "A tan mĂ„â€šĂ‚Â©lange dress combining a knit polo-style bodice with a softly flowing skirt.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Tan MĂ„â€šĂ‚Â©lange", hex: "#B99A78" }],
    details: [
      "Hybrid knit polo-style bodice",
      "Buttoned collar",
      "Full-length flowing skirt",
    ],
    materials: "Hybrid knit and woven construction.",
    sizeFit: "Classic fit through the bodice with a flowing skirt.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p19",
    name: "Dark Brown Corduroy Pleated Shirt Dress",
    category: "dresses",
    brand: "Polo Ralph",
    price: 198.0,
    images: [poloBrownCorduroyDressImage],
    rating: 0,
    reviewsCount: 0,
    badge: "New Arrival",
    description:
      "A dark brown corduroy shirt dress with a collared neckline and pleated silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Dark Brown", hex: "#4A2B20" }],
    details: [
      "Soft corduroy texture",
      "Button-front shirt styling",
      "Pleated skirt silhouette",
    ],
    materials: "Corduroy fabric.",
    sizeFit: "Classic shirt-dress fit.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p20",
    name: "Merlot Green Multi Plaid Cotton-Blend Panelled Shirt Dress",
    category: "dresses",
    brand: "Polo Ralph",
    price: 228.0,
    images: [poloMerlotPlaidDressImage],
    rating: 0,
    reviewsCount: 0,
    badge: "New Arrival",
    description:
      "A cotton-blend shirt dress in a merlot and green plaid, finished with a panelled silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Merlot Green Plaid", hex: "#68514C" }],
    details: [
      "Merlot and green multi-plaid pattern",
      "Panelled construction",
      "Classic shirt-dress styling",
    ],
    materials: "Cotton-blend fabric.",
    sizeFit: "Classic shirt-dress fit.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p21",
    name: "Oyster White Relaxed Fit Shirt",
    category: "men",
    brand: "Zara",
    price: 79.0,
    images: [zaraOysterShirtImage],
    rating: 0,
    reviewsCount: 0,
    badge: "New Arrival",
    description:
      "A relaxed-fit shirt in a soft oyster-white shade with a button-front and clean, minimal finish.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Oyster White", hex: "#E8E6E0" }],
    details: [
      "Relaxed fit",
      "Button-front closure",
      "Long sleeves with button cuffs",
    ],
    materials: "Fabric composition not specified.",
    sizeFit: "Relaxed fit. Choose your usual size.",
    shippingReturns: "Free returns within 30 days.",
  },
  {
    id: "p22",
    name: "Black Wide-Leg Trousers",
    category: "men",
    brand: "Zara",
    price: 89.0,
    images: [zaraBlackWideLegTrousersImage],
    rating: 0,
    reviewsCount: 0,
    badge: "New Arrival",
    description:
      "Black wide-leg trousers with a structured front waistband and a fluid, full-length silhouette.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [{ name: "Black", hex: "#111111" }],
    details: [
      "Wide-leg silhouette",
      "Structured front waistband",
      "Full length",
    ],
    materials: "Fabric composition not specified.",
    sizeFit: "Relaxed wide-leg fit.",
    shippingReturns: "Free returns within 30 days.",
  },
];

const MOST_LOVED_PRODUCTS = PRODUCTS.slice(0, 6).map((product) =>
  product.id === "p3"
    ? (PRODUCTS.find((candidate) => candidate.id === "p8") ?? product)
    : product,
);
const DISCOVERY_PRODUCTS = PRODUCTS.slice(0, 8).map((product) =>
  product.id === "p3"
    ? (PRODUCTS.find((candidate) => candidate.id === "p17") ?? product)
    : product,
);

const COLOR_FILTER_FAMILIES = [
  { name: "Black", hex: "#171717" },
  { name: "White", hex: "#F3F1EC" },
  { name: "Gray", hex: "#858585" },
  { name: "Beige", hex: "#C8B79F" },
  { name: "Brown", hex: "#765744" },
  { name: "Green", hex: "#6C765A" },
  { name: "Blue", hex: "#657D91" },
  {
    name: "Multicolor",
    hex: "linear-gradient(135deg, #74443D 0 34%, #69735A 34% 67%, #EAE6DB 67%)",
  },
];

const getMainImageColorFamily = (colorName: string) => {
  const color = colorName.toLowerCase();
  if (/multi|plaid|pattern/.test(color)) return "Multicolor";
  if (/black|noir/.test(color)) return "Black";
  if (/white|ivory|cream|oyster/.test(color)) return "White";
  if (/gray|grey|charcoal|heather/.test(color)) return "Gray";
  if (/blue|navy/.test(color)) return "Blue";
  if (/green|olive|sage|emerald/.test(color)) return "Green";
  if (/brown|cognac|chestnut|espresso/.test(color)) return "Brown";
  if (/beige|sand|tan|camel|neutral|oatmeal|taupe|stone/.test(color))
    return "Beige";
  return "Multicolor";
};

const SHOP_STORY_PRODUCTS = ["p2", "p4", "p5"]
  .map((id) => PRODUCTS.find((product) => product.id === id))
  .filter((product): product is Product => Boolean(product));

const STYLE_TESTIMONIALS = [
  {
    name: "Amelia R.",
    handle: "@amelia.styles",
    description:
      "Beautiful quality and the fit is exactly what I hoped for. It has quickly become a favorite.",
    image: "/images/amelia.png",
  },
  {
    name: "Daniel K.",
    handle: "@danielk",
    description:
      "The fabric feels lovely and the details make this piece feel special. Very happy with it.",
    image: "/images/danielk.png",
  },
  {
    name: "Sofia M.",
    handle: "@sofiam.wardrobe",
    description:
      "Really nice style and comfortable to wear. The color looks just as good in person.",
    image: "/images/sofiam.png",
  },
  {
    name: "Oliver T.",
    handle: "@olivert.style",
    description:
      "Great finish, thoughtful details, and easy to style. I would happily shop this collection again.",
    image: "/images/olivert.png",
  },
];

interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export default function App() {
  const [currentView, setCurrentView] = useState<
    "home" | "pdp" | "shop" | "about" | "login" | "signup"
  >("home");
  const [heroMetricProgress, setHeroMetricProgress] = useState(0);
  const heroSequenceRef = useRef<HTMLElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (currentView !== "home") return;
    let startTime: number | null = null;
    let frame = 0;
    const animateMetrics = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min(1, (time - startTime) / 1300);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setHeroMetricProgress(easedProgress);
      if (progress < 1) frame = requestAnimationFrame(animateMetrics);
    };
    frame = requestAnimationFrame(animateMetrics);
    return () => cancelAnimationFrame(frame);
  }, [currentView]);

  useEffect(() => {
    const section = heroSequenceRef.current;
    const canvas = heroCanvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (
      currentView !== "home" ||
      !section ||
      !canvas ||
      !context ||
      heroFramePaths.length === 0
    )
      return;

    const frames = heroFramePaths.map(() => new Image());
    let targetFrame = 0;
    let displayedFrame = 0;
    let sequenceProgress = 0;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let endDelayTimer: number | null = null;
    let endDelayActive = false;
    let lastTouchY: number | null = null;
    let disposed = false;

    const drawImage = (image: HTMLImageElement, alpha = 1) => {
      if (!image.complete || !image.naturalWidth) return;
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      // The model sits right of center in the source frames. Shift the crop
      // toward that focal point on narrow screens so the subject stays centered.
      const focalX = width < 768 ? 0.64 : 0.5;
      context.globalAlpha = alpha;
      context.drawImage(
        image,
        width / 2 - drawWidth * focalX,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      context.globalAlpha = 1;
    };

    // Blend neighboring frames to avoid the visible stepping caused by rounding
    // every scroll position to a single source image.
    const draw = (framePosition: number) => {
      const lowerIndex = Math.floor(framePosition);
      const upperIndex = Math.min(lowerIndex + 1, frames.length - 1);
      const lowerFrame = frames[lowerIndex];
      const upperFrame = frames[upperIndex];
      const lowerReady = lowerFrame?.complete && lowerFrame.naturalWidth > 0;
      const upperReady = upperFrame?.complete && upperFrame.naturalWidth > 0;

      if (lowerReady) drawImage(lowerFrame);
      else if (upperReady) drawImage(upperFrame);
      if (lowerReady && upperReady && upperIndex !== lowerIndex) {
        drawImage(upperFrame, framePosition - lowerIndex);
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(displayedFrame);
    };

    const releaseEndLockWhenReady = () => {
      if (disposed || !endDelayActive) return;
      const lastFrame = frames[frames.length - 1];
      if (
        displayedFrame < frames.length - 1 - 0.08 ||
        !lastFrame.complete ||
        !lastFrame.naturalWidth
      ) {
        endDelayTimer = window.setTimeout(releaseEndLockWhenReady, 80);
        return;
      }
      endDelayTimer = window.setTimeout(() => {
        endDelayActive = false;
        endDelayTimer = null;
      }, 180);
    };

    const consumeScroll = (delta: number) => {
      const bounds = section.getBoundingClientRect();
      const heroIsVisible =
        bounds.top < window.innerHeight && bounds.bottom > 0;
      const topTolerance = Math.max(16, window.innerHeight * 0.08);
      const isAtPageTop = Math.abs(bounds.top) <= topTolerance;
      const sequenceIsInProgress = sequenceProgress > 0 && sequenceProgress < 1;
      if (!heroIsVisible || (!isAtPageTop && !sequenceIsInProgress))
        return false;

      if (delta > 0 && endDelayActive) return true;

      const isAdvancingSequence =
        delta > 0 &&
        (sequenceProgress < 1 || displayedFrame < frames.length - 1 - 0.08);
      const isReversingSequence =
        delta < 0 && (sequenceProgress > 0 || displayedFrame > 0.08);
      if (!isAdvancingSequence && !isReversingSequence) return false;

      if (delta < 0 && endDelayActive) {
        endDelayActive = false;
        if (endDelayTimer !== null) window.clearTimeout(endDelayTimer);
        endDelayTimer = null;
      }

      const limitedDelta =
        Math.sign(delta) * Math.min(Math.abs(delta), window.innerHeight * 0.14);
      const previousProgress = sequenceProgress;
      sequenceProgress = Math.min(
        1,
        Math.max(
          0,
          sequenceProgress + limitedDelta / (window.innerHeight * 0.55),
        ),
      );
      targetFrame = sequenceProgress * (frames.length - 1);
      schedule();

      if (previousProgress < 1 && sequenceProgress === 1) {
        endDelayActive = true;
        releaseEndLockWhenReady();
      }
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      const delta =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1);
      if (consumeScroll(delta)) event.preventDefault();
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined || lastTouchY === null) return;
      if (consumeScroll(lastTouchY - currentY)) event.preventDefault();
      lastTouchY = currentY;
    };

    const animate = () => {
      animationFrame = 0;
      if (disposed) return;
      // A gentler catch-up makes the sequence feel like a camera move instead
      // of snapping to each wheel event. The fractional position is blended
      // between source frames by draw().
      displayedFrame += (targetFrame - displayedFrame) * 0.18;
      const settled = Math.abs(targetFrame - displayedFrame) < 0.04;
      if (settled) displayedFrame = targetFrame;
      draw(displayedFrame);
      if (!settled) animationFrame = window.requestAnimationFrame(animate);
    };

    const schedule = () => {
      if (!animationFrame && !disposed)
        animationFrame = window.requestAnimationFrame(animate);
    };

    frames.forEach((image, index) => {
      image.decoding = "async";
      image.fetchPriority = index === 0 ? "high" : "low";
      image.src = heroFramePaths[index];
      // Decode frames before they are needed so drawImage does not have to
      // pause the animation to decode a PNG during a scroll gesture.
      image
        .decode()
        .then(() => {
          if (disposed) return;
          if (index === 0) draw(0);
          schedule();
        })
        .catch(() => undefined);
    });

    resize();
    schedule();
    window.addEventListener("resize", resize);
    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove, true);
      if (endDelayTimer !== null) window.clearTimeout(endDelayTimer);
      frames.forEach((image) => {
        image.onload = null;
        image.src = "";
      });
    };
  }, [currentView]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authNotice, setAuthNotice] = useState("");
  const [shopCategory, setShopCategory] = useState<ShopCategory>("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [pdpTab, setPdpTab] = useState<
    "details" | "materials" | "sizeFit" | "shippingReturns"
  >("details");

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [collapsedShopFilters, setCollapsedShopFilters] = useState({
    brand: true,
    color: true,
    size: true,
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["p1", "p4", "p6"]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [activeSaleHotspot, setActiveSaleHotspot] = useState<number | null>(
    null,
  );
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [activeSeasonStoryIndex, setActiveSeasonStoryIndex] = useState(0);
  const seasonStoryThumbsRef = useRef<HTMLDivElement>(null);
  const seasonStoryDragRef = useRef<{
    startX: number;
    targetScroll: number;
    active: boolean;
    pointerDown: boolean;
  } | null>(null);
  const seasonStoryDraggedRef = useRef(false);
  const seasonStoryScrollFrameRef = useRef<number | null>(null);
  const testimonialScrollSectionRef = useRef<HTMLElement>(null);
  const productScrollSectionRef = useRef<HTMLDivElement>(null);
  const productScrollTrackRef = useRef<HTMLDivElement>(null);
  const productScrollProgressRef = useRef<HTMLDivElement>(null);
  const newSeasonBannerRef = useRef<HTMLElement>(null);
  const newSeasonImageLayerRef = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP" | "HUF">(
    "USD",
  );
  const { currentLanguage: language, setCurrentLanguage: setLanguage } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [languageSelectorTab, setLanguageSelectorTab] = useState<
    "language" | "currency"
  >("language");
  const languageSelectorRef = useRef<HTMLDivElement>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 20);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const updateBannerParallax = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const banner = newSeasonBannerRef.current;
        const imageLayer = newSeasonImageLayerRef.current;
        if (!banner || !imageLayer) return;
        const rect = banner.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const centerOffset =
          rect.top + rect.height / 2 - window.innerHeight / 2;
        const parallaxOffset = Math.max(
          -28,
          Math.min(28, -centerOffset * 0.08),
        );
        imageLayer.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
      });
    };
    updateBannerParallax();
    window.addEventListener("scroll", updateBannerParallax, { passive: true });
    window.addEventListener("resize", updateBannerParallax);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateBannerParallax);
      window.removeEventListener("resize", updateBannerParallax);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateActiveTestimonial = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const section = testimonialScrollSectionRef.current;
        const stage = section?.querySelector<HTMLElement>(
          "[data-testimonials-stage]",
        );
        if (!section || !stage) return;
        const sectionDocumentTop =
          section.getBoundingClientRect().top + window.scrollY;
        const scrollDistance = section.offsetHeight - window.innerHeight;
        const rawProgress = Math.min(
          1,
          Math.max(
            0,
            (window.scrollY - sectionDocumentTop) / Math.max(1, scrollDistance),
          ),
        );
        const edgePause = 0.08;
        const progress =
          rawProgress <= edgePause
            ? 0
            : rawProgress >= 1 - edgePause
              ? 1
              : (rawProgress - edgePause) / (1 - edgePause * 2);
        const nextIndex = Math.min(
          STYLE_TESTIMONIALS.length - 1,
          Math.floor(progress * STYLE_TESTIMONIALS.length),
        );
        setActiveTestimonialIndex((current) =>
          current === nextIndex ? current : nextIndex,
        );
      });
    };
    updateActiveTestimonial();
    window.addEventListener("scroll", updateActiveTestimonial, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveTestimonial);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveTestimonial);
      window.removeEventListener("resize", updateActiveTestimonial);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let targetProgress = 0;
    let displayedProgress = 0;
    let animationRunning = false;
    const animateProductGallery = () => {
      animationRunning = false;
      const section = productScrollSectionRef.current;
      const track = productScrollTrackRef.current;
      const stickyStage = section?.querySelector<HTMLElement>(
        "[data-product-gallery-stage]",
      );
      if (!section || !track || !stickyStage) return;

      displayedProgress += (targetProgress - displayedProgress) * 0.24;
      if (Math.abs(targetProgress - displayedProgress) < 0.001) {
        displayedProgress = targetProgress;
      }
      const maxTranslate = Math.max(
        0,
        track.scrollWidth - stickyStage.clientWidth,
      );
      track.style.transform = `translate3d(${-maxTranslate * displayedProgress}px, 0, 0)`;
      if (productScrollProgressRef.current) {
        productScrollProgressRef.current.style.width = `${displayedProgress * 100}%`;
      }
      if (displayedProgress !== targetProgress) {
        animationRunning = true;
        frame = requestAnimationFrame(animateProductGallery);
      }
    };
    const updateProductGallery = () => {
      const section = productScrollSectionRef.current;
      const track = productScrollTrackRef.current;
      const stickyStage = section?.querySelector<HTMLElement>(
        "[data-product-gallery-stage]",
      );
      if (!section || !track || !stickyStage) return;
      const scrollDistance = section.offsetHeight - window.innerHeight;
      const sectionDocumentTop =
        section.getBoundingClientRect().top + window.scrollY;
      const rawProgress = Math.min(
        1,
        Math.max(
          0,
          (window.scrollY - sectionDocumentTop) / Math.max(1, scrollDistance),
        ),
      );
      const edgePause = 0.1;
      const easedProgress =
        rawProgress <= edgePause
          ? 0
          : rawProgress >= 1 - edgePause
            ? 1
            : (rawProgress - edgePause) / (1 - edgePause * 2);
      targetProgress = easedProgress * easedProgress * (3 - 2 * easedProgress);
      if (!animationRunning) {
        animationRunning = true;
        frame = requestAnimationFrame(animateProductGallery);
      }
    };
    updateProductGallery();
    window.addEventListener("scroll", updateProductGallery, { passive: true });
    window.addEventListener("resize", updateProductGallery);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProductGallery);
      window.removeEventListener("resize", updateProductGallery);
    };
  }, []);

  useEffect(() => {
    const closeLanguageMenu = (event: MouseEvent) => {
      if (!languageSelectorRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", closeLanguageMenu);
    return () => document.removeEventListener("mousedown", closeLanguageMenu);
  }, []);

  const currencySymbols = { USD: "$", EUR: "Ă˘â€šÂ¬", GBP: "Ă‚Ĺ", HUF: "Ft " };
  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, HUF: 360 };

  const formatPrice = (priceInUSD: number) => {
    const converted = priceInUSD * currencyRates[currency];
    if (currency === "HUF") {
      return `Ft ${Math.round(converted).toLocaleString("hu-HU")}`;
    }
    return `${currencySymbols[currency]}${converted.toFixed(2)}`;
  };

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    const sizeToUse = size || selectedSize || product.sizes[0];
    const colorToUse = color || selectedColor || product.colors[0].name;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === sizeToUse &&
          item.selectedColor === colorToUse,
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          selectedSize: sizeToUse,
          selectedColor: colorToUse,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (productId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const openProductPage = (product: Product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0].name);
    setCurrentView("pdp");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToShop = (category: string) => {
    setShopCategory(category as ShopCategory);
    setCurrentView("shop");
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTestimonial = (index: number) => {
    const section = testimonialScrollSectionRef.current;
    if (!section) return;
    const sectionDocumentTop =
      section.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = section.offsetHeight - window.innerHeight;
    const edgePause = 0.08;
    const progress =
      edgePause +
      ((index + 0.5) / STYLE_TESTIMONIALS.length) * (1 - edgePause * 2);
    window.scrollTo({
      top: sectionDocumentTop + progress * scrollDistance,
      behavior: "smooth",
    });
  };

  const productsForColorFilter = PRODUCTS.filter((p) => {
    if (shopCategory !== "all") {
      if (shopCategory === "men" && p.category !== "men") return false;
      if (
        shopCategory === "women" &&
        p.category !== "women" &&
        p.category !== "dresses" &&
        p.category !== "outerwear" &&
        p.category !== "tops"
      )
        return false;
      if (shopCategory === "children" && p.category !== "children")
        return false;
      if (shopCategory === "dresses" && p.category !== "dresses") return false;
      if (shopCategory === "outerwear" && p.category !== "outerwear")
        return false;
      if (shopCategory === "tops" && p.category !== "tops") return false;
      if (shopCategory === "bags" && p.category !== "bags") return false;
      if (shopCategory === "accessories" && p.category !== "accessories")
        return false;
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand))
      return false;
    if (
      selectedSizes.length > 0 &&
      !p.sizes.some((s) => selectedSizes.includes(s))
    )
      return false;
    return true;
  });
  const availableColorOptions = COLOR_FILTER_FAMILIES.filter(
    (family) =>
      selectedColors.includes(family.name) ||
      productsForColorFilter.some(
        (product) =>
          getMainImageColorFamily(product.colors[0]?.name ?? "") ===
          family.name,
      ),
  );
  const filteredPlpProducts = productsForColorFilter.filter(
    (product) =>
      selectedColors.length === 0 ||
      selectedColors.includes(
        getMainImageColorFamily(product.colors[0]?.name ?? ""),
      ),
  );
  const isNavItemActive = (
    item: "home" | "shop" | "women" | "men" | "children" | "about",
  ) => {
    if (item === "home" || item === "about") return currentView === item;
    if (currentView !== "shop") return false;
    if (item === "shop") return shopCategory === "all";
    return shopCategory === item;
  };
  const navItemClass = (
    item: "home" | "shop" | "women" | "men" | "children" | "about",
  ) =>
    `whitespace-nowrap border-b-2 pb-1 text-[11px] uppercase tracking-[0.12em] transition-colors ${
      isNavItemActive(item)
        ? `font-semibold ${currentView === "home" && !isScrolled ? "border-white text-white" : "border-[#9A8060] text-[#292820]"}`
        : `border-transparent font-medium ${currentView === "home" && !isScrolled ? "text-white/80 hover:text-white" : "text-[#555] hover:border-[#B7AA95] hover:text-black"}`
    }`;

  return (
    <Localize>
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col selection:bg-black selection:text-white">
      {/* Left navigation, centered wordmark, and utility actions on the right */}
      <header
        className={`${currentView === "home" ? "fixed inset-x-0 top-0" : "sticky top-0"} z-40 transition-colors duration-300 ${
          currentView === "home" && !isScrolled
            ? "bg-transparent border-b border-transparent"
            : "bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E2DC]"
        }`}
      >
        <div className="relative mx-auto grid h-16 w-full max-w-7xl grid-cols-3 items-center px-3 sm:h-20 sm:px-6">
          {/* Logo with Star/Asterisk icon */}
          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
            <button
              onClick={() => setCurrentView("home")}
              className={`flex items-center gap-2 whitespace-nowrap font-serif-luxury text-2xl font-bold tracking-tight focus:outline-none sm:text-3xl ${currentView === "home" && !isScrolled ? "text-white" : "text-black"}`}
            >
              Velora
            </button>
          </div>

          {/* Main navigation */}
          <button
            type="button"
            className={`col-start-1 flex h-10 w-10 items-center justify-center justify-self-start rounded-full transition-colors lg:hidden ${currentView === "home" && !isScrolled ? "text-white" : "text-black"}`}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
            <button
              onClick={() => {
                setCurrentView("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={navItemClass("home")}
            >
              HOME
            </button>
            <button
              onClick={() => goToShop("all")}
              className={navItemClass("shop")}
            >
              SHOP
            </button>
            <button
              onClick={() => goToShop("women")}
              className={navItemClass("women")}
            >
              WOMEN
            </button>
            <button
              onClick={() => goToShop("men")}
              className={navItemClass("men")}
            >
              MAN
            </button>
            <button
              onClick={() => goToShop("children")}
              className={navItemClass("children")}
            >
              KID
            </button>
            <button
              onClick={() => {
                setCurrentView("about");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={navItemClass("about")}
            >
              ABOUT
            </button>
          </nav>

          {isMobileMenuOpen && (
            <nav className="absolute inset-x-0 top-full z-50 grid grid-cols-1 border-t border-[#E5E2DC] bg-[#FAF9F6]/98 px-5 py-3 text-[#292820] shadow-lg backdrop-blur-md animate-fadeIn lg:hidden">
              {([
                ["HOME", () => { setCurrentView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }],
                ["SHOP", () => goToShop("all")],
                ["WOMEN", () => goToShop("women")],
                ["MAN", () => goToShop("men")],
                ["KID", () => goToShop("children")],
                ["ABOUT", () => { setCurrentView("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }],
              ] as const).map(([label, action]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => { action(); setIsMobileMenuOpen(false); }}
                  className="block w-full border-b border-[#EAE6DF] py-3.5 text-left text-xs font-medium uppercase tracking-[0.15em] last:border-0 transition-colors hover:text-[#9A8060] focus-visible:text-[#9A8060]"
                >
                  {label}
                </button>
              ))}
            </nav>
          )}

          {/* Right Icons: Currency, Search, Profile, Wishlist, Bag */}
          <div className="col-start-3 flex items-center justify-self-end gap-0 sm:gap-3 md:gap-4">
            <div className="relative" ref={languageSelectorRef}>
              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen((open) => !open)}
                aria-label="Choose language or currency"
                aria-expanded={isLanguageMenuOpen}
                className={`flex items-center gap-1 p-0.5 text-[10px] font-medium tracking-wide transition-opacity hover:opacity-70 sm:p-1 ${currentView === "home" && !isScrolled ? "text-white" : "text-black"}`}
              >
                <Globe className="h-4 w-4 max-[360px]:h-3.5 max-[360px]:w-3.5" />
                <span className="hidden sm:inline">
                  {languageSelectorTab === "language" ? language : currency}
                </span>
                <ChevronRight
                  className={`hidden h-2.5 w-2.5 transition-transform sm:block ${isLanguageMenuOpen ? "-rotate-90" : "rotate-90"}`}
                />
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute left-0 right-auto top-full z-50 mt-2 w-48 rounded-xl border border-[#E8E6E2] bg-white p-1.5 text-[#222] shadow-xl max-[360px]:w-28 max-[360px]:max-w-[calc(100vw-1.5rem)] max-[360px]:-translate-x-4">
                  <div className="mb-1.5 flex gap-1 rounded-lg bg-[#F5F4F1] p-1">
                    {(["language", "currency"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setLanguageSelectorTab(tab)}
                        className={`min-w-0 flex-1 rounded-md px-2 py-1.5 text-[10px] font-medium capitalize transition-colors max-[360px]:px-1 ${languageSelectorTab === tab ? "bg-white text-black shadow-sm" : "text-[#777] hover:text-black"}`}
                      >
                        <span className="sm:hidden">{tab === "currency" ? "Curr." : "Lang."}</span>
                        <span className="hidden sm:inline">{tab}</span>
                      </button>
                    ))}
                  </div>
                  <div className="max-h-56 space-y-0.5 overflow-y-auto">
                    {languageSelectorTab === "language"
                      ? (
                          [
                            ["EN", "English"],
                            ["HU", "Magyar"],
                            ["SK", "Slovenčina"],
                          ] as const
                        ).map(([code, label]) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => {
                              setLanguage(code);
                              setIsLanguageMenuOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[11px] transition-colors hover:bg-[#F7F6F2] ${language === code ? "font-semibold text-black" : "text-[#666]"}`}
                          >
                            <span>{label}</span>
                            {language === code && (
                              <Check className="h-3.5 w-3.5 text-[#A58E6B]" />
                            )}
                          </button>
                        ))
                      : (
                          [
                            ["USD", "$"],
                            ["EUR", "Ă˘â€šÂ¬"],
                            ["GBP", "Ă‚Ĺ"],
                            ["HUF", "Ft"],
                          ] as const
                        ).map(([code, symbol]) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => {
                              setCurrency(code);
                              setIsLanguageMenuOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[11px] transition-colors hover:bg-[#F7F6F2] ${currency === code ? "font-semibold text-black" : "text-[#666]"}`}
                          >
                            <span>
                              {code}{" "}
                              <span className="text-[#999]">{symbol}</span>
                            </span>
                            {currency === code && (
                              <Check className="h-3.5 w-3.5 text-[#A58E6B]" />
                            )}
                          </button>
                        ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-1 hover:opacity-75 transition-opacity max-[360px]:p-0.5 sm:p-2 ${currentView === "home" && !isScrolled ? "text-white" : "text-black"}`}
              title="Search"
            >
              <Search className="h-4 w-4 max-[360px]:h-3.5 max-[360px]:w-3.5" />
            </button>

            <button
              onClick={() => {
                setAuthNotice("");
                setCurrentView("login");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`p-1 hover:opacity-75 transition-opacity max-[360px]:p-0.5 sm:p-2 ${currentView === "home" && !isScrolled ? "text-white" : "text-black"}`}
              title="Account"
            >
              <User className="h-4 w-4 max-[360px]:h-3.5 max-[360px]:w-3.5" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className={`relative p-1 transition-opacity hover:opacity-75 max-[360px]:p-0.5 sm:p-2 ${currentView === "home" && !isScrolled ? "text-white" : "text-black"}`}
              title="Wishlist"
            >
              <Heart className="h-4 w-4 max-[360px]:h-3.5 max-[360px]:w-3.5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full border border-[#FAF9F6] bg-[#29231F] px-0.5 text-[8px] font-semibold leading-none text-white shadow-sm max-[360px]:h-2.5 max-[360px]:min-w-2.5 max-[360px]:px-0 max-[360px]:text-[7px]">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative flex items-center p-1 transition-opacity hover:opacity-75 max-[360px]:p-0.5 sm:p-2 ${currentView === "home" && !isScrolled ? "text-white" : "text-black"}`}
              title="Bag"
            >
              <ShoppingBag className="h-4 w-4 max-[360px]:h-3.5 max-[360px]:w-3.5" />
              <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full border border-[#FAF9F6] bg-[#29231F] px-0.5 text-[8px] font-semibold leading-none text-white shadow-sm max-[360px]:h-2.5 max-[360px]:min-w-2.5 max-[360px]:px-0 max-[360px]:text-[7px]">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 px-6 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif-luxury text-2xl mb-4">Search Catalog</h3>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-4 w-5 h-5 text-[#888]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blazers, dresses, hoodies..."
                className="w-full bg-[#FAF9F6] border border-[#DDD] pl-12 pr-4 py-3.5 text-sm outline-none focus:border-black"
                autoFocus
              />
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {PRODUCTS.filter(
                (p) =>
                  p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
              ).map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    openProductPage(product);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-4 p-3 hover:bg-[#FAF9F6] cursor-pointer transition-colors border-b border-[#F0ECE1]"
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-12 h-14 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-grow">
                    <span className="text-[10px] text-[#888] uppercase">
                      {product.brand}
                    </span>
                    <h4 className="font-serif-luxury text-base">
                      {product.name}
                    </h4>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatPrice(product.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LOOKBOOK MODAL */}
      {isLookbookOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-4xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsLookbookOpen(false)}
              className="absolute top-6 right-6 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <span className="text-xs uppercase tracking-widest text-[#777] block mb-2">
              Editorial Lookbook 2026
            </span>
            <h2 className="font-serif-luxury text-3xl mb-6">
              The Minimalist Manifesto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="aspect-[4/5] relative">
                <img
                  src="/images/hero_fashion_editorial_1791984648405.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4">
                  <p className="text-xs uppercase font-semibold">Look 01</p>
                  <p className="text-sm font-serif-luxury">
                    Italian Linen Blazer & Trousers
                  </p>
                  <button
                    onClick={() => {
                      openProductPage(PRODUCTS[1]);
                      setIsLookbookOpen(false);
                    }}
                    className="mt-2 text-xs uppercase tracking-wider font-semibold underline"
                  >
                    Shop This Look →
                  </button>
                </div>
              </div>
              <div className="aspect-[4/5] relative">
                <img
                  src="/images/product_silk_dress_1791987255047.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4">
                  <p className="text-xs uppercase font-semibold">Look 02</p>
                  <p className="text-sm font-serif-luxury">
                    Silk Emerald Slip Dress
                  </p>
                  <button
                    onClick={() => {
                      openProductPage(PRODUCTS[5]);
                      setIsLookbookOpen(false);
                    }}
                    className="mt-2 text-xs uppercase tracking-wider font-semibold underline"
                  >
                    Shop This Look →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEW CONTROLLER */}
      {currentView === "login" || currentView === "signup" ? (
        <main className="flex flex-grow items-center px-4 py-10 md:px-6 md:py-14">
          <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-[#E8E6E2] bg-white shadow-sm lg:grid-cols-2">
            <div className="relative hidden min-h-[620px] bg-[#292C27] lg:block">
              <img
                src="/images/hero_model_taupe_1791988447193.jpg"
                alt="Velora seasonal fashion"
                className="absolute inset-0 h-full w-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111711]/90 via-[#111711]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14 text-white">
                <span className="mb-4 block text-[10px] uppercase tracking-[0.25em] text-[#E2CFB2]">
                  VELORA / YOUR STYLE, YOUR STORY
                </span>
                <h2 className="font-serif-luxury text-4xl xl:text-5xl leading-tight">
                  A wardrobe that
                  <br />
                  feels like you.
                </h2>
                <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/80">
                  Sign in to keep your favorites close and make every visit a
                  little more personal.
                </p>
              </div>
            </div>

            <div className="flex min-h-[560px] flex-col justify-center px-6 py-10 sm:px-10 md:px-14 lg:px-12 xl:px-20">
              <button
                type="button"
                onClick={() => {
                  setAuthNotice("");
                  setCurrentView("home");
                }}
                className="mb-10 flex w-fit items-center gap-2 text-xs text-[#777] transition-colors hover:text-black"
              >
                <ArrowLeft className="h-4 w-4" /> Back to shopping
              </button>
              <span className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#9A8666]">
                {currentView === "login"
                  ? "Welcome back"
                  : "Join our community"}
              </span>
              <h1 className="font-serif-luxury text-4xl md:text-5xl text-black">
                {currentView === "login" ? "Sign in" : "Create an account"}
              </h1>
              <p className="mt-3 mb-8 text-sm font-light leading-relaxed text-[#777]">
                {currentView === "login"
                  ? "Enter your details to continue to your account."
                  : "Create your account to save your favorites and enjoy a more personal shopping experience."}
              </p>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setAuthNotice(
                    "Account access is not connected yet. Your details have not been saved.",
                  );
                }}
                className="space-y-5"
              >
                {currentView === "signup" && (
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#444]">
                      Full name
                    </span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Your name"
                      className="w-full border border-[#DEDCD6] bg-[#FAF9F6] px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[#AAA] focus:border-[#9A8666]"
                    />
                  </label>
                )}
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-[#444]">
                    Email address
                  </span>
                  <span className="relative block">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      className="w-full border border-[#DEDCD6] bg-[#FAF9F6] py-3.5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[#AAA] focus:border-[#9A8666]"
                    />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-[#444]">
                    Password
                  </span>
                  <span className="relative block">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                    <input
                      type="password"
                      name="password"
                      autoComplete={
                        currentView === "login"
                          ? "current-password"
                          : "new-password"
                      }
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      className="w-full border border-[#DEDCD6] bg-[#FAF9F6] py-3.5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[#AAA] focus:border-[#9A8666]"
                    />
                  </span>
                </label>

                {currentView === "signup" && (
                  <label className="flex items-start gap-2.5 text-xs leading-relaxed text-[#777]">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 accent-black"
                    />
                    <span>
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-black underline underline-offset-2"
                      >
                        Terms &amp; Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-black underline underline-offset-2"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 bg-[#171A17] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#343A34]"
                >
                  {currentView === "login" ? "Sign in" : "Create account"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                {authNotice && (
                  <p
                    role="status"
                    className="border border-[#E8E6E2] bg-[#F7F6F2] p-3 text-xs leading-relaxed text-[#666]"
                  >
                    {authNotice}
                  </p>
                )}
              </form>

              <p className="mt-7 text-center text-sm text-[#777]">
                {currentView === "login"
                  ? "New to VELORA?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthNotice("");
                    setCurrentView(
                      currentView === "login" ? "signup" : "login",
                    );
                  }}
                  className="font-medium text-black underline underline-offset-4 decoration-[#C9B79B] hover:decoration-black"
                >
                  {currentView === "login" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </main>
      ) : currentView === "pdp" && selectedProduct ? (
        /* ========================================================== */
        /* 1. PRODUCT DETAIL PAGE (PDP)                               */
        /* ========================================================== */
        <main className="flex-grow px-4 py-8 max-w-7xl mx-auto w-full animate-fadeIn max-[360px]:px-3 max-[360px]:py-6 sm:px-6 sm:py-12">
          <button
            onClick={() => setCurrentView("home")}
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#666] hover:text-black max-[360px]:text-[10px] sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-stretch">
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="aspect-[5/4] bg-[#EFECE6] relative overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setIsImageZoomOpen(true)}
                  aria-label="Enlarge product image"
                  className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition hover:bg-white"
                >
                  <Search className="h-4 w-4" />
                </button>
                {selectedProduct.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white max-[360px]:px-2 max-[360px]:py-1 max-[360px]:text-[10px]">
                    {selectedProduct.badge}
                  </span>
                )}
                <img
                  src={
                    selectedProduct.images[activeImageIndex] ||
                    selectedProduct.images[0]
                  }
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {selectedProduct.images.length > 1 && (
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto rounded-xl bg-white/55 p-1.5 backdrop-blur-sm sm:left-4 sm:right-4 sm:bottom-4 sm:gap-3 sm:p-2">
                    {selectedProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all sm:h-28 sm:flex-1 ${activeImageIndex === idx ? "border-white shadow-md" : "border-transparent opacity-80 hover:opacity-100"}`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {isImageZoomOpen && (
                <div
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${selectedProduct.name} image viewer`}
                  onClick={() => setIsImageZoomOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsImageZoomOpen(false)}
                    aria-label="Close enlarged image"
                    className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-7 md:top-7"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveImageIndex(
                        (index) =>
                          (index - 1 + selectedProduct.images.length) %
                          selectedProduct.images.length,
                      );
                    }}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-7"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <img
                    src={
                      selectedProduct.images[activeImageIndex] ||
                      selectedProduct.images[0]
                    }
                    alt={selectedProduct.name}
                    onClick={(event) => event.stopPropagation()}
                    className="max-h-full max-w-full select-none object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveImageIndex(
                        (index) => (index + 1) % selectedProduct.images.length,
                      );
                    }}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-7"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
              <section className="rounded-2xl border border-[#E8E6E2] bg-white px-5 py-5 max-[360px]:px-4 max-[360px]:py-4 md:px-7 md:py-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-[#C9B79B]" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A806F]">
                    A closer look
                  </span>
                </div>
                <h2 className="mb-2 font-serif-luxury text-2xl text-[#1A1A1A] max-[360px]:text-xl">
                  Made to feel like you.
                </h2>
                <p className="text-sm text-[#666] font-light leading-relaxed max-[360px]:text-xs">
                  {selectedProduct.description}
                </p>
              </section>
              <section className="rounded-2xl border border-[#E8E6E2] bg-[#F7F6F2] px-5 py-5 max-[360px]:px-4 max-[360px]:py-4 md:px-7 md:py-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#8A806F] mb-1">
                      The details
                    </span>
                    <h2 className="font-serif-luxury text-xl text-[#1A1A1A] max-[360px]:text-lg">
                      Thoughtfully considered
                    </h2>
                  </div>
                  <Sparkles className="h-4 w-4 text-[#A58E6B]" />
                </div>
                <ul className="space-y-3">
                  {selectedProduct.details.slice(0, 3).map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-xs text-[#666] font-light leading-relaxed max-[360px]:text-[11px]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9B79B]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="lg:col-span-5 flex flex-col bg-white border border-[#E8E6E2] rounded-2xl p-6 pb-6 max-[360px]:p-4 md:p-8 md:pb-8 lg:pb-0">
              <span className="text-xs uppercase tracking-widest text-[#777] font-semibold block mb-2 max-[360px]:text-[10px]">
                {selectedProduct.brand}
              </span>
              <h1 className="font-serif-luxury text-3xl md:text-4xl font-normal text-black mb-4 max-[360px]:text-2xl max-[360px]:mb-3">
                {selectedProduct.name}
              </h1>

              <div className="flex items-center gap-2 mb-6 max-[360px]:mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black max-[360px]:h-3.5 max-[360px]:w-3.5" />
                  ))}
                </div>
                <span className="text-sm font-medium max-[360px]:text-xs">
                  {selectedProduct.rating} ({selectedProduct.reviewsCount}{" "}
                  reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6 max-[360px]:mb-4 max-[360px]:gap-2">
                <span className="text-3xl font-semibold tabular-nums text-black max-[360px]:text-2xl">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-lg text-[#999] line-through tabular-nums max-[360px]:text-sm">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                {selectedProduct.discountBadge && (
                  <span className="bg-[#111] text-white text-xs font-bold px-2.5 py-1 tracking-wider uppercase max-[360px]:px-1.5 max-[360px]:text-[9px]">
                    {selectedProduct.discountBadge}
                  </span>
                )}
              </div>

              <section className="mb-6 rounded-2xl border border-[#E8E6E2] p-4 md:p-5">
                <button
                  type="button"
                  onClick={() => setIsDescriptionOpen((open) => !open)}
                  aria-expanded={isDescriptionOpen}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <h2 className="text-sm font-medium text-black">
                    Description &amp; Fit
                  </h2>
                  <ChevronRight
                    className={`h-4 w-4 text-[#555] transition-transform ${isDescriptionOpen ? "-rotate-90" : "rotate-90"}`}
                  />
                </button>
                {isDescriptionOpen && (
                  <p className="mt-3 text-xs text-[#666] font-light leading-relaxed">
                    {selectedProduct.description}
                  </p>
                )}
              </section>

              <section className="mb-6 rounded-2xl border border-[#E8E6E2] p-4 md:p-5">
                <button
                  type="button"
                  onClick={() => setIsMaterialsOpen((open) => !open)}
                  aria-expanded={isMaterialsOpen}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <h2 className="text-sm font-medium text-black">
                    Materials &amp; Fit
                  </h2>
                  <ChevronRight
                    className={`h-4 w-4 text-[#555] transition-transform ${isMaterialsOpen ? "-rotate-90" : "rotate-90"}`}
                  />
                </button>
                {isMaterialsOpen && (
                  <div className="mt-3 space-y-3 text-xs text-[#666] font-light leading-relaxed">
                    <p>
                      <span className="text-[#999]">Materials</span>
                      <br />
                      {selectedProduct.materials}
                    </p>
                    <p>
                      <span className="text-[#999]">Fit</span>
                      <br />
                      {selectedProduct.sizeFit}
                    </p>
                  </div>
                )}
              </section>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-[#666] mb-3">
                  Color:{" "}
                  <span className="font-semibold text-black">
                    {selectedColor}
                  </span>
                </p>
                <div className="flex gap-3">
                  {selectedProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-black scale-110 shadow-sm" : "border-transparent hover:scale-105"}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-8 max-[360px]:mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-wider text-[#666]">
                    Size:{" "}
                    <span className="font-semibold text-black">
                      {selectedSize}
                    </span>
                  </span>
                  <button className="text-xs uppercase tracking-widest text-black underline underline-offset-4 max-[360px]:text-[10px]">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-12 border text-xs font-semibold transition-all max-[360px]:h-10 max-[360px]:w-10 max-[360px]:text-[11px] ${selectedSize === size ? "border-black bg-black text-white" : "border-[#DDD] text-black hover:border-black"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 flex gap-4 max-[360px]:mb-6 max-[360px]:gap-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      selectedProduct,
                      selectedSize,
                      selectedColor,
                    )
                  }
                  className="flex-grow bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#333] flex items-center justify-center gap-3 max-[360px]:px-3 max-[360px]:py-3 max-[360px]:text-[10px] max-[360px]:tracking-[0.12em] max-[360px]:gap-2"
                >
                  <ShoppingBag className="w-4 h-4 max-[360px]:h-3.5 max-[360px]:w-3.5" /> Add to Cart
                </button>
                <button
                  onClick={(e) => toggleWishlist(selectedProduct.id, e)}
                  className="w-14 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors max-[360px]:w-11"
                >
                  <Heart
                    className={`w-5 h-5 max-[360px]:h-4 max-[360px]:w-4 ${wishlist.includes(selectedProduct.id) ? "fill-black text-black" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>

          <section className="mt-16 md:mt-20 border-t border-[#E8E6E2] pt-10 md:pt-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8A806F] mb-2">
                  Customer feedback
                </span>
                <h2 className="font-serif-luxury text-3xl md:text-4xl text-black">
                  Rating &amp; Reviews
                </h2>
              </div>
              <span className="text-xs text-[#777]">
                Based on {selectedProduct.reviewsCount} reviews
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="flex flex-col sm:flex-row sm:items-center gap-8 rounded-2xl bg-white border border-[#E8E6E2] p-6 md:p-8">
                <div className="shrink-0 text-center sm:text-left">
                  <div className="font-serif-luxury text-6xl md:text-7xl leading-none text-black">
                    {selectedProduct.rating.toFixed(1)}
                  </div>
                  <div
                    className="flex justify-center sm:justify-start gap-1 my-3"
                    aria-label={`${selectedProduct.rating} out of 5 stars`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#D7B451] text-[#D7B451]"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#888]">
                    {selectedProduct.reviewsCount} customer reviews
                  </span>
                </div>
                <div className="flex-1 space-y-2.5">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const share = Math.max(
                      5,
                      Math.min(
                        100,
                        ((selectedProduct.rating - 1) / 4) * 100 -
                          (5 - stars) * 14,
                      ),
                    );
                    return (
                      <div
                        key={stars}
                        className="flex items-center gap-3 text-xs text-[#777]"
                      >
                        <span className="w-3">{stars}</span>
                        <Star className="h-3.5 w-3.5 fill-[#D7B451] text-[#D7B451]" />
                        <div className="h-1.5 flex-1 rounded-full bg-[#F0EFEC]">
                          <div
                            className="h-full rounded-full bg-[#D7B451]"
                            style={{ width: `${share}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-2xl border border-[#E8E6E2] bg-white p-6 md:p-8">
                <h3 className="font-serif-luxury text-2xl text-black mb-2">
                  Loved by our community
                </h3>
                <p className="text-sm text-[#666] font-light leading-relaxed mb-5">
                  Customers have rated this piece{" "}
                  {selectedProduct.rating.toFixed(1)} out of 5. Explore the
                  details, fit and materials to see if it is right for you.
                </p>
                <div className="flex items-center justify-between border-t border-[#EEECE7] pt-4">
                  <span className="text-xs text-[#888]">
                    Overall customer rating
                  </span>
                  <span className="text-sm font-medium text-black">
                    {selectedProduct.rating.toFixed(1)} / 5
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            className="mt-8 overflow-hidden"
            aria-label="Customer reviews carousel"
          >
            {(() => {
              const customerReviews = [
                {
                  name: "Amelia R.",
                  rating: 5,
                  comment:
                    "Beautiful quality and the fit is exactly what I hoped for. It has quickly become a favorite.",
                },
                {
                  name: "Daniel K.",
                  rating: 5,
                  comment:
                    "The fabric feels lovely and the details make this piece feel special. Very happy with it.",
                },
                {
                  name: "Sofia M.",
                  rating: 4,
                  comment:
                    "Really nice style and comfortable to wear. The color looks just as good in person.",
                },
                {
                  name: "Oliver T.",
                  rating: 5,
                  comment:
                    "Great finish, thoughtful details, and easy to style. I would happily shop this collection again.",
                },
                {
                  name: "Emma L.",
                  rating: 5,
                  comment:
                    "A lovely addition to my wardrobe. It feels well made and looks effortlessly polished.",
                },
              ];
              const repeatedReviews = [...customerReviews, ...customerReviews];

              return (
                <div className="relative flex w-full overflow-hidden">
                  <div className="animate-review-marquee flex items-center gap-4 whitespace-nowrap py-2 max-[360px]:gap-3 max-[360px]:py-1">
                    {repeatedReviews.map((review, index) => (
                      <article
                        key={`${review.name}-${index}`}
                        className="w-[280px] shrink-0 rounded-2xl border border-[#E8E6E2] bg-white p-5 whitespace-normal max-[360px]:w-[250px] max-[360px]:p-4 md:w-[340px] md:p-6"
                      >
                        <div
                          className="mb-4 flex items-center gap-1"
                          aria-label={`${review.rating} out of 5 stars`}
                        >
                          {[...Array(5)].map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              className={`h-4 w-4 ${starIndex < review.rating ? "fill-[#D7B451] text-[#D7B451]" : "text-[#D7B451]"}`}
                            />
                          ))}
                        </div>
                        <p className="mb-5 min-h-[4.5rem] text-sm font-light leading-relaxed text-[#555] max-[360px]:mb-4 max-[360px]:min-h-14 max-[360px]:text-xs">
                          “{review.comment}”
                        </p>
                        <span className="text-xs font-semibold tracking-wide text-[#222]">
                          {review.name}
                        </span>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })()}
          </section>

          {(() => {
            const categoryMatches = PRODUCTS.filter((product) => {
              if (product.id === selectedProduct.id) return false;
              if (
                selectedProduct.category === "women" ||
                selectedProduct.category === "dresses" ||
                selectedProduct.category === "tops" ||
                selectedProduct.category === "outerwear"
              ) {
                return ["women", "dresses", "tops", "outerwear"].includes(
                  product.category,
                );
              }
              return product.category === selectedProduct.category;
            });
            const relatedProducts = (
              categoryMatches.length > 0
                ? categoryMatches
                : PRODUCTS.filter(
                    (product) => product.id !== selectedProduct.id,
                  )
            ).slice(0, 4);

            return relatedProducts.length > 0 ? (
              <section className="mt-16 md:mt-20">
                <h2 className="font-serif-luxury text-3xl md:text-4xl text-center mb-8 md:mb-10">
                  You might also like
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {relatedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => openProductPage(product)}
                      className="group text-left"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#EFECE6] mb-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#888] mb-1">
                        {product.brand}
                      </span>
                      <span className="block font-serif-luxury text-lg md:text-xl text-black">
                        {product.name}
                      </span>
                      <span className="mt-1 block text-sm font-medium tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            ) : null;
          })()}
        </main>
      ) : currentView === "shop" ? (
        /* ========================================================== */
        /* 2. PRODUCT LIST PAGE (PLP) WITH SIDEBAR FILTERS            */
        /* ========================================================== */
        <main className="flex-grow py-10 px-6 max-w-7xl mx-auto w-full animate-fadeIn [overflow-anchor:none]">
          <div className="relative bg-[#F4F1EA] p-8 md:p-12 mb-10 overflow-hidden flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-xl z-10 mb-6 md:mb-0">
              <span className="text-xs uppercase tracking-widest text-[#777] font-semibold block mb-2">
                - Collections
              </span>
              <h1 className="font-serif-luxury text-3xl md:text-4xl font-normal mb-3">
                Explore The Various Collection of {shopCategory.toUpperCase()}
              </h1>
              <p className="text-xs md:text-sm text-[#666] font-light">
                Don't miss out to shopping collection from us! You'll not be let
                down.
              </p>
            </div>
            <div className="w-full md:w-1/3 h-48 overflow-hidden">
              <img
                src="/images/hero_fashion_editorial_1791984648405.jpg"
                alt="Collection Banner"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="mb-8 flex flex-col items-stretch gap-3 border-b border-[#E5E2DC] pb-4 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#888] sm:text-xs sm:tracking-widest">
              Category:
            </span>
            <div className="flex w-full flex-wrap items-center gap-2 sm:min-w-0 sm:flex-1 sm:gap-3">
            {[
              { label: "All Collections", value: "all" },
              { label: "Men", value: "men" },
              { label: "Women", value: "women" },
              { label: "Children / Kids", value: "children" },
              { label: "Dresses", value: "dresses" },
              { label: "Outerwear", value: "outerwear" },
              { label: "Tops", value: "tops" },
              { label: "Bags", value: "bags" },
              { label: "Accessories", value: "accessories" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setShopCategory(tab.value as ShopCategory)}
                className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors sm:rounded-none sm:px-4 sm:text-xs sm:tracking-wider ${shopCategory === tab.value ? "bg-black text-white" : "border border-[#DDD] bg-[#FAF9F6] text-[#666] hover:text-black"}`}
              >
                {tab.label}
              </button>
            ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="space-y-5 rounded-xl border border-[#E6E0D6] bg-white p-3 shadow-[0_8px_28px_rgba(36,35,31,0.045)] sm:p-5 lg:col-span-3 lg:space-y-8 lg:p-6">
              <div>
                <h3 className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#38342E] lg:mb-4">
                  <button type="button" onClick={() => setCollapsedShopFilters((filters) => ({ ...filters, brand: !filters.brand }))} aria-expanded={!collapsedShopFilters.brand} aria-controls="shop-brand-options" className="flex min-h-8 flex-1 items-center justify-between text-left lg:pointer-events-none lg:min-h-0">
                    <span>Brand</span><ChevronDown className={`mr-2 h-4 w-4 transition-transform lg:hidden ${collapsedShopFilters.brand ? "-rotate-90" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBrands([])}
                    className="inline-flex min-h-7 items-center rounded-full border border-[#E4DED4] bg-[#FAF9F6] px-2.5 text-[11px] font-medium tracking-wide text-[#655D51] transition-colors hover:border-[#B7A58B] hover:bg-[#F2ECE1] hover:text-[#29231F]"
                  >
                    Reset
                  </button>
                </h3>
                <div id="shop-brand-options" className={`space-y-3 ${collapsedShopFilters.brand ? "hidden lg:block" : ""}`}>
                  {Array.from(new Set(PRODUCTS.map((product) => product.brand)))
                    .sort((a, b) => a.localeCompare(b))
                    .map((brand) => {
                      const isChecked = selectedBrands.includes(brand);
                      return (
                        <label
                          key={brand}
                          className="flex cursor-pointer items-center justify-between text-[13px] text-[#555]"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setSelectedBrands((prev) =>
                                  isChecked
                                    ? prev.filter((b) => b !== brand)
                                    : [...prev, brand],
                                );
                              }}
                              className="rounded border-[#DDD] accent-[#9A8060]"
                            />
                            <span>{brand}</span>
                          </div>
                          <span className="text-[11px] text-[#999]">
                            ({PRODUCTS.filter((p) => p.brand === brand).length})
                          </span>
                        </label>
                      );
                    })}
                </div>
              </div>

              <div className="border-t border-[#EEEAE3] pt-4 lg:pt-6">
                <h3 className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#38342E] lg:mb-4">
                  <button type="button" onClick={() => setCollapsedShopFilters((filters) => ({ ...filters, color: !filters.color }))} aria-expanded={!collapsedShopFilters.color} aria-controls="shop-color-options" className="flex min-h-8 flex-1 items-center justify-between text-left lg:pointer-events-none lg:min-h-0">
                    <span>Color</span><ChevronDown className={`mr-2 h-4 w-4 transition-transform lg:hidden ${collapsedShopFilters.color ? "-rotate-90" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedColors([])}
                    className="inline-flex min-h-7 items-center rounded-full border border-[#E4DED4] bg-[#FAF9F6] px-2.5 text-[11px] font-medium tracking-wide text-[#655D51] transition-colors hover:border-[#B7A58B] hover:bg-[#F2ECE1] hover:text-[#29231F]"
                  >
                    Reset
                  </button>
                </h3>
                <div id="shop-color-options" className={`space-y-2.5 ${collapsedShopFilters.color ? "hidden lg:block" : ""}`}>
                  {availableColorOptions.map((color) => {
                    const isChecked = selectedColors.includes(color.name);
                    const matchingProducts = productsForColorFilter.filter(
                      (product) =>
                        getMainImageColorFamily(
                          product.colors[0]?.name ?? "",
                        ) === color.name,
                    ).length;
                    return (
                      <label
                        key={color.name}
                        className="flex cursor-pointer items-center justify-between text-[13px] text-[#555]"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedColors((prev) =>
                                isChecked
                                  ? prev.filter((c) => c !== color.name)
                                  : [...prev, color.name],
                              );
                            }}
                            className="rounded border-[#DDD] accent-[#9A8060]"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                            style={{ background: color.hex }}
                          />
                          <span>{color.name}</span>
                        </div>
                        <span className="text-[11px] text-[#999]">
                          ({matchingProducts})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-[#EEEAE3] pt-4 lg:pt-6">
                <h3 className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#38342E] lg:mb-4">
                  <button type="button" onClick={() => setCollapsedShopFilters((filters) => ({ ...filters, size: !filters.size }))} aria-expanded={!collapsedShopFilters.size} aria-controls="shop-size-options" className="flex min-h-8 flex-1 items-center justify-between text-left lg:pointer-events-none lg:min-h-0">
                    <span>Size</span><ChevronDown className={`mr-2 h-4 w-4 transition-transform lg:hidden ${collapsedShopFilters.size ? "-rotate-90" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSizes([])}
                    className="inline-flex min-h-7 items-center rounded-full border border-[#E4DED4] bg-[#FAF9F6] px-2.5 text-[11px] font-medium tracking-wide text-[#655D51] transition-colors hover:border-[#B7A58B] hover:bg-[#F2ECE1] hover:text-[#29231F]"
                  >
                    Reset
                  </button>
                </h3>
                <div id="shop-size-options" className={`grid grid-cols-3 gap-2 ${collapsedShopFilters.size ? "hidden lg:grid" : ""}`}>
                  {["S", "M", "L", "XL", "XXL", "34", "36", "38", "4Y"].map(
                    (size) => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSizes((prev) =>
                              isSelected
                                ? prev.filter((s) => s !== size)
                                : [...prev, size],
                            );
                          }}
                          className={`rounded-md border py-1.5 text-[11px] font-semibold transition-all lg:py-2 lg:text-xs ${isSelected ? "border-black bg-black text-white" : "border-[#E3DED5] bg-[#FAF9F6] text-[#555] hover:border-[#9A8060]"}`}
                        >
                          {size}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-9">
              <div className="flex justify-between items-center mb-6 text-xs text-[#777]">
                <span>Showing {filteredPlpProducts.length} items</span>
                <span>Sorted by: Featured</span>
              </div>

              {filteredPlpProducts.length === 0 ? (
                <div className="text-center py-24 bg-white border border-[#E5E2DC]">
                  <p className="text-sm font-medium text-[#666] mb-4">
                    No products found matching your selected filters.
                  </p>
                  <button
                    onClick={() => {
                      setShopCategory("all");
                      setSelectedBrands([]);
                      setSelectedColors([]);
                      setSelectedSizes([]);
                    }}
                    className="bg-black text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlpProducts.map((product) => {
                    const isWishlisted = wishlist.includes(product.id);
                    return (
                      <div
                        key={product.id}
                        onClick={() => openProductPage(product)}
                        className="group cursor-pointer bg-white border border-[#EBE7DF] flex flex-col justify-between overflow-hidden transition-all hover:shadow-lg"
                      >
                        <div className="relative aspect-[4/5] bg-[#EFECE6] overflow-hidden">
                          {product.badge && (
                            <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                              {product.badge}
                            </span>
                          )}
                          <button
                            onClick={(e) => toggleWishlist(product.id, e)}
                            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                          >
                            <Heart
                              className={`w-4 h-4 ${isWishlisted ? "fill-black text-black" : ""}`}
                            />
                          </button>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <div>
                            <span className="text-[10px] text-[#888] uppercase tracking-widest block mb-1">
                              {product.brand}
                            </span>
                            <h3 className="font-serif-luxury text-xl font-normal text-black mb-1">
                              {product.name}
                            </h3>
                            <p className="text-xs text-[#666] font-light line-clamp-1 mb-3">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#F0ECE1]">
                            <span className="text-base font-semibold tabular-nums">
                              {formatPrice(product.price)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              className="text-xs uppercase tracking-widest font-semibold bg-black text-white px-4 py-2 hover:bg-[#333] transition-colors"
                            >
                              + Add
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      ) : currentView === "about" ? (
        <main className="flex-grow animate-fadeIn bg-white">
          <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#494238] sm:min-h-[380px] lg:min-h-[430px]">
            <img
              src="/images/hero_fashion_editorial_1791984648405.jpg"
              alt="A considered, modern look at the FashiOnia boutique"
              className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
            />
            <div className="absolute inset-0 bg-[#171813]/45" />
            <div className="relative z-10 px-6 text-center text-white">
              <span className="mb-4 block text-[9px] uppercase tracking-[0.32em] text-white/75">
                OUR STORY Ă‚Â· FASHIONIA
              </span>
              <h1 className="font-serif-luxury text-5xl font-normal tracking-tight sm:text-6xl lg:text-7xl">
                About Us
              </h1>
            </div>
          </section>

          <section className="px-6 py-16 text-center sm:py-20 lg:py-24">
            <span className="mb-5 block text-[9px] uppercase tracking-[0.28em] text-[#9A8060]">
              A NOTE ON PERSONAL STYLE
            </span>
            <blockquote className="mx-auto max-w-3xl font-serif-luxury text-2xl leading-snug text-[#282720] sm:text-3xl lg:text-4xl">
              “The best pieces feel like you from the very first wear.”
            </blockquote>
            <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#827F77]">
              THE FASHIONIA EDIT
            </p>
          </section>

          <section className="grid items-stretch bg-[#F2F0EB] lg:grid-cols-2">
            <div className="group relative min-h-[360px] overflow-hidden sm:min-h-[480px] lg:min-h-[600px]">
              <img
                src="/images/cat_womens_collection_1791984648546.jpg"
                alt="A timeless neutral tailoring look"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
            </div>
            <div className="flex items-center px-8 py-14 sm:px-14 sm:py-20 lg:px-[13%]">
              <div className="max-w-lg">
                <span className="mb-5 block text-[9px] font-semibold uppercase tracking-[0.26em] text-[#9A8060]">
                  DEFINING EVERYDAY STYLE
                </span>
                <h2 className="font-serif-luxury text-4xl font-normal leading-[1.05] text-[#24231F] sm:text-5xl">
                  Thoughtful pieces. <em>Effortless</em> expression.
                </h2>
                <p className="mt-6 text-sm leading-7 text-[#65635D]">
                  FashiOnia brings together modern essentials and distinctive
                  finds for a wardrobe that feels considered, comfortable, and
                  entirely your own.
                </p>
                <p className="mt-4 text-sm leading-7 text-[#65635D]">
                  From refined layers to the finishing details, each edit is
                  chosen to work beautifully together and move easily through
                  your day.
                </p>
                <button
                  type="button"
                  onClick={() => goToShop("all")}
                  className="group mt-7 inline-flex items-center gap-4 bg-[#24231F] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#50483B]"
                >
                  Learn more{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>

          <section className="grid items-stretch bg-white lg:grid-cols-2">
            <div className="order-2 flex items-center px-8 py-14 sm:px-14 sm:py-20 lg:order-1 lg:px-[13%]">
              <div className="max-w-lg">
                <span className="mb-5 block text-[9px] font-semibold uppercase tracking-[0.26em] text-[#9A8060]">
                  EXPLORE THE COLLECTIONS
                </span>
                <h2 className="font-serif-luxury text-4xl font-normal leading-[1.05] text-[#24231F] sm:text-5xl">
                  A little less noise. <em>A lot more you.</em>
                </h2>
                <p className="mt-6 text-sm leading-7 text-[#65635D]">
                  Personal style grows from pieces that feel right. Discover
                  versatile clothing, thoughtful accessories, and new-season
                  finds across women, men, and kids.
                </p>
                <p className="mt-4 text-sm leading-7 text-[#65635D]">
                  Find a new favorite, build on the pieces you love, and make
                  every look your own.
                </p>
                <button
                  type="button"
                  onClick={() => goToShop("women")}
                  className="group mt-7 inline-flex items-center gap-4 bg-[#24231F] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#50483B]"
                >
                  Shop the collection{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
            <div className="group relative order-1 min-h-[360px] overflow-hidden bg-[#F2F0EB] sm:min-h-[480px] lg:order-2 lg:min-h-[600px]">
              <img
                src="/images/cat_mens_collection_1791984648561.jpg"
                alt="A relaxed, tailored menswear look"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
            </div>
          </section>

          <section className="px-6 py-16 text-center sm:py-20 lg:py-24">
            <span className="mb-5 block text-[9px] uppercase tracking-[0.28em] text-[#9A8060]">
              FIND YOUR EVERYDAY
            </span>
            <h2 className="mx-auto max-w-2xl font-serif-luxury text-3xl font-normal leading-tight text-[#24231F] sm:text-4xl">
              Build a wardrobe that feels like you.
            </h2>
            <button
              type="button"
              onClick={() => goToShop("all")}
              className="group mt-7 inline-flex items-center gap-4 border border-[#292820] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#292820] transition-colors hover:bg-[#292820] hover:text-white"
            >
              Discover the edit{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </section>
        </main>
      ) : (
        /* ========================================================== */
        /* 3. HOME LANDING PAGE MATCHING REFERENCE HERO (STYLE BG + GLASS BAR) */
        /* ========================================================== */
        <main className="flex-grow">
          {/* Reference Hero Section */}
          <section ref={heroSequenceRef} className="relative h-[100svh]">
            <div className="group/hero relative isolate h-full overflow-hidden bg-[#22251F] flex flex-col justify-between">
              <div className="absolute inset-0 animate-hero-image-in">
                <canvas
                  ref={heroCanvasRef}
                  aria-hidden="true"
                  className="block h-full w-full"
                />
              </div>
              <div
                aria-hidden="true"
                className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[clamp(220px,34vh,390px)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(250,249,246,0) 0%, rgba(203,187,166,0.12) 36%, rgba(231,223,211,0.55) 78%, #FAF9F6 100%)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(250,249,246,0.16) 0%, rgba(250,249,246,0.08) 38%, rgba(250,249,246,0) 72%)",
                }}
              />
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/25 to-transparent" />
              <div className="hero-copy-container relative z-10 mx-auto flex w-full max-w-7xl flex-grow items-end justify-start px-5 pb-[10rem] pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:items-center lg:py-24">
                <div className="hero-copy-content hero-copy-reveal w-full max-w-[min(84vw,540px)] text-[#29211F] md:max-w-[min(45vw,620px)]">
                  <span className="mb-4 inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#43382E] drop-shadow-[0_1px_1px_rgba(250,249,246,0.35)] sm:text-xs">
                    NEW SEASON COLLECTION
                  </span>
                  <h1 className="mb-5 font-serif-luxury text-[clamp(2.6rem,6vw,5.4rem)] font-normal leading-[1.02] tracking-[-0.035em] text-[#29231F] drop-shadow-[0_1px_1px_rgba(250,249,246,0.3)] max-[360px]:text-[2rem] max-[360px]:leading-none">
                    Elevated Style.
                    <span className="block">Everyday You.</span>
                  </h1>
                  <p className="max-w-[440px] text-sm leading-6 text-[#494039] drop-shadow-[0_1px_1px_rgba(250,249,246,0.35)] sm:text-base sm:leading-7">
                    Timeless pieces. Modern attitude.
                    <br />
                    Designed to elevate your everyday.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center">
                    <button
                      type="button"
                      onClick={() => goToShop("all")}
                      className="group inline-flex items-center gap-3 border-b border-black py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#292820] drop-shadow-[0_1px_1px_rgba(250,249,246,0.35)] transition-colors hover:text-[#8A7357] sm:text-xs"
                    >
                      Shop new arrivals
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SHOP BY CATEGORY (4 CARDS) & PROMO BANNERS */}
          <section className="shop-category-section py-16 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6 max-[360px]:px-4">
              <div className="flex items-end justify-between gap-3 mb-10 max-[360px]:mb-7 max-[360px]:gap-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#777] font-medium block mb-2 max-[360px]:text-[9px]">
                    SHOP BY CATEGORY
                  </span>
                  <h2 className="font-serif-luxury text-3xl md:text-4xl font-normal max-[360px]:text-[1.45rem] max-[360px]:leading-[1.08]">
                    Find Your Perfect <span className="max-[360px]:block">Style</span>
                  </h2>
                </div>
                <button
                  onClick={() => goToShop("all")}
                  className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest hover:underline max-[360px]:flex-col max-[360px]:items-center max-[360px]:gap-0 max-[360px]:text-[9px] max-[360px]:leading-[1.25] max-[360px]:tracking-[0.1em]"
                >
                  <span>View All</span><span>Categories →</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                  {
                    title: "Women's Collection",
                    category: "women",
                    img: "/images/cat_womens_collection_1791984648546.jpg",
                    description: [
                      "Soft tailoring and considered",
                      "everyday pieces.",
                    ],
                  },
                  {
                    title: "Men's Collection",
                    category: "men",
                    img: "/images/cat_mens_collection_1791984648561.jpg",
                    description: [
                      "Relaxed essentials with a refined",
                      "point of view.",
                    ],
                  },
                  {
                    title: "Dresses",
                    category: "dresses",
                    img: "/images/cat_dresses_1791984649353.jpg",
                    description: [
                      "Elegant silhouettes for every",
                      "kind of occasion.",
                    ],
                  },
                  {
                    title: "Accessories",
                    category: "accessories",
                    img: "/images/cat_accessories_1791984648664.jpg",
                    description: [
                      "The finishing details that",
                      "make it yours.",
                    ],
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToShop(item.category)}
                    className="category-style-card group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-sm bg-[#EFECE6] text-left"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="category-card-image absolute inset-x-0 top-0 h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="category-card-image-shade pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 opacity-80" />
                    <span className="category-card-content pointer-events-none absolute inset-x-0 bottom-0 flex flex-col px-5 pb-6 text-left text-white sm:px-6 sm:pb-7">
                      <h3 className="category-card-title font-serif-luxury text-xl font-normal text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.4)] sm:text-2xl">
                        {item.title}
                      </h3>
                      <span className="category-card-hover-copy block">
                        <span className="category-card-hover-description mb-2 block text-[11px] font-medium leading-[1.45] text-white sm:text-xs sm:leading-5">
                          {item.description.map((line, lineIndex) => (
                            <span
                              key={line}
                              className="category-card-line-mask block overflow-hidden"
                            >
                              <span className="block">{line}</span>
                            </span>
                          ))}
                        </span>
                        <span className="category-card-action-mask block overflow-hidden">
                          <span className="category-card-hover-action inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-white sm:text-[10px]">
                            Explore now
                            <ArrowRight className="category-card-arrow h-3.5 w-3.5" />
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              <div
                ref={productScrollSectionRef}
                className="relative h-[280svh] -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16 xl:-mx-20 mb-8"
              >
                <div
                  data-product-gallery-stage
                  className="sticky top-20 h-[calc(100svh-5rem)] overflow-hidden border-y border-[#E5E2DC] bg-[#FAF9F6] flex flex-col justify-center py-8 max-[360px]:py-2 sm:py-12"
                >
                  <div className="px-5 sm:px-10 lg:px-16 mb-6 max-[360px]:mb-3 sm:mb-8 flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.28em] text-[#888] font-semibold block mb-2">
                        THE VELORA EDIT
                      </span>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight">
                        Pieces to discover
                      </h3>
                    </div>
                    <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[#777]">
                      Scroll to explore
                    </span>
                  </div>
                  <div
                    ref={productScrollTrackRef}
                    className="flex w-max gap-3 sm:gap-5 px-5 sm:px-10 lg:px-16 will-change-transform"
                  >
                    {DISCOVERY_PRODUCTS.map((product, index) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => openProductPage(product)}
                        className="group w-[68vw] max-[360px]:w-[60vw] sm:w-[38vw] lg:w-[27vw] max-w-[390px] flex-shrink-0 text-left"
                        aria-label={`View ${product.name}`}
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#F0EEE9]">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-3 left-3 bg-white/90 px-2.5 py-1.5 text-[9px] uppercase tracking-widest text-[#555]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-3 pt-3.5 max-[360px]:pt-2">
                          <div className="min-w-0">
                            <span className="text-[9px] uppercase tracking-widest text-[#777]">
                              {product.brand}
                            </span>
                            <p className="font-serif-luxury text-base sm:text-lg truncate">
                              {product.name}
                            </p>
                          </div>
                          <span className="text-xs sm:text-sm whitespace-nowrap pt-3">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-5 sm:px-10 lg:px-16 mt-5 max-[360px]:mt-3 sm:mt-7 flex items-center gap-3">
                    <div className="h-px flex-1 bg-black/10 relative overflow-hidden">
                      <div
                        ref={productScrollProgressRef}
                        className="absolute left-0 top-0 h-full w-0 bg-black/50"
                      />
                    </div>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#999]">
                      Scroll to explore
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                <div className="lg:col-span-8 bg-[#F2ECE1] border border-[#E5E2DC] p-5 sm:p-7 lg:p-8 flex flex-col">
                  <div className="mb-5 sm:mb-6 flex items-end justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#777] font-semibold block mb-2">
                        DISCOVER THE LOOK
                      </span>
                      <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-[2.75rem] font-normal leading-tight tracking-tight">
                        Shop the story
                      </h3>
                    </div>
                    <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[#777] pb-1">
                      Select a point to explore
                    </span>
                  </div>
                  {(() => {
                    const lookProducts = SHOP_STORY_PRODUCTS;
                    const hotspotPositions = [
                      { left: "54%", top: "48%" }, // blazer
                      { left: "57%", top: "78%" }, // trousers
                      { left: "72%", top: "82%" }, // bag
                    ];
                    return (
                      <div className="relative">
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#e4ded4] shadow-sm">
                          <img
                            src="/images/hero_fashion_editorial_1791984648405.jpg"
                            alt="Editorial look featuring a tailored blazer, wide-leg trousers, and a shoulder bag"
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                          {lookProducts.map((product, index) => (
                            <div
                              key={product.id}
                              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                              style={hotspotPositions[index]}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveSaleHotspot(
                                    activeSaleHotspot === index ? null : index,
                                  )
                                }
                                aria-label={`View ${product.name}`}
                                aria-expanded={activeSaleHotspot === index}
                                className="shop-story-hotspot w-9 h-9 rounded-full bg-white/95 text-black shadow-lg border border-white flex items-center justify-center hover:scale-110 transition-transform"
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-black" />
                                <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-50" />
                              </button>
                            </div>
                          ))}
                          <p className="absolute bottom-4 left-4 text-white text-[10px] uppercase tracking-[0.18em] drop-shadow">
                            The modern essentials edit
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="lg:col-span-4 bg-white border border-[#E5E2DC] p-6 sm:p-8 lg:p-7 flex flex-col justify-between">
                  {(() => {
                    const selectedStoryProduct =
                      activeSaleHotspot === null
                        ? null
                        : SHOP_STORY_PRODUCTS[activeSaleHotspot];
                    const displayedPieces = SHOP_STORY_PRODUCTS;
                    return (
                      <>
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.25em] text-[#888] font-semibold block mb-2">
                            COMPLETE THE EDIT
                          </span>
                          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal leading-tight tracking-tight">
                            The finishing touches
                          </h3>
                          <p className="text-xs text-[#777] leading-relaxed mt-3 mb-5">
                            Thoughtful layers and soft accessories to bring the
                            look together.
                          </p>
                          <div className="divide-y divide-[#E5E2DC] border-y border-[#E5E2DC]">
                            {displayedPieces.map((product) => {
                              const isSelected =
                                selectedStoryProduct?.id === product.id;
                              return (
                                <button
                                  key={product.id}
                                  type="button"
                                  onClick={() => openProductPage(product)}
                                  aria-pressed={isSelected}
                                  className={`w-full flex items-center gap-3 text-left group transition-all duration-300 ${isSelected ? "my-3 border border-[#D8C6AE] bg-[#F8F5EF] p-3 shadow-sm" : "px-2 py-3 hover:bg-[#FAF9F6]"}`}
                                >
                                  <img
                                    src={product.images[0]}
                                    alt=""
                                    className={`${isSelected ? "h-24 w-20" : "h-[4.5rem] w-16"} shrink-0 object-cover bg-[#F2ECE1] transition-all duration-300`}
                                    loading="lazy"
                                  />
                                  <span className="flex-1 min-w-0">
                                    {isSelected && (
                                      <span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9A8060]">
                                        Selected from the story
                                      </span>
                                    )}
                                    <span className="block text-[9px] uppercase tracking-widest text-[#888] mb-1">
                                      {product.category}
                                    </span>
                                    <span
                                      className={`block font-serif-luxury leading-snug group-hover:underline ${isSelected ? "text-base" : "text-sm"}`}
                                    >
                                      {product.name}
                                    </span>
                                    {isSelected && (
                                      <span className="mt-1 block line-clamp-2 text-[10px] leading-relaxed text-[#777]">
                                        {product.description}
                                      </span>
                                    )}
                                    <span className="block text-xs mt-1">
                                      {formatPrice(product.price)}
                                    </span>
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-[#999] group-hover:text-black group-hover:translate-x-1 transition-all" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <button
                          onClick={() => goToShop("all")}
                          className="mt-6 w-full border border-black py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                          Explore the collection{" "}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </section>

          {/* INFINITE BRAND CAROUSEL */}
          <div className="py-12 max-[360px]:py-6 bg-[#111111] text-white overflow-hidden border-y border-[#333]">
            <div className="max-w-7xl mx-auto px-6 mb-6 max-[360px]:mb-4 text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#888] max-[360px]:whitespace-nowrap max-[360px]:text-[8px] max-[360px]:tracking-[0.16em]">
                Featured Designer Partners & Houses
              </span>
            </div>
            <div className="relative w-full overflow-hidden flex">
              <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
                {[
                  "LUNORA ATELIER",
                  "VELORA",
                  "BOTTEGA VENETA",
                  "PRADA MILANO",
                  "CELINE",
                  "BURBERRY EDIT",
                  "ZARA STUDIO",
                  "NIKE LAB",
                  "LUNORA ATELIER",
                  "VELORA",
                  "BOTTEGA VENETA",
                  "PRADA MILANO",
                  "CELINE",
                  "BURBERRY EDIT",
                  "ZARA STUDIO",
                  "NIKE LAB",
                ].map((brandName, idx) => (
                  <div key={idx} className="flex items-center gap-16 shrink-0">
                    <span className="font-serif-luxury text-2xl md:text-3xl tracking-widest text-[#EAE6DF] hover:text-white transition-colors cursor-default max-[360px]:text-xl">
                      {brandName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#555]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BEST SELLERS */}
          <section className="py-16 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#777] font-medium block mb-2">
                    BEST SELLERS
                  </span>
                  <h2 className="font-serif-luxury text-3xl md:text-4xl font-normal">
                    Our Most Loved Picks
                  </h2>
                </div>
                <button
                  onClick={() => goToShop("all")}
                  className="text-xs uppercase tracking-widest font-semibold pb-1 border-b border-black"
                >
                  View All Products ({PRODUCTS.length}) →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOST_LOVED_PRODUCTS.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => openProductPage(product)}
                      className="group cursor-pointer flex flex-col bg-white border border-[#EBE7DF] overflow-hidden transition-all hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#EFECE6]">
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-black text-white text-[10px] uppercase px-2.5 py-1 font-semibold z-10">
                            {product.badge}
                          </span>
                        )}
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-white"
                        >
                          <Heart
                            className={`w-4 h-4 ${isWishlisted ? "fill-black text-black" : ""}`}
                          />
                        </button>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-5 flex flex-col justify-between bg-white">
                        <span className="text-[10px] text-[#888] uppercase tracking-widest block mb-1">
                          {product.brand}
                        </span>
                        <h3 className="font-serif-luxury text-xl font-normal text-black mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-base font-semibold tabular-nums">
                            {formatPrice(product.price)}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-black font-medium">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3.5 h-3.5 fill-black text-black"
                                />
                              ))}
                            </div>
                            <span className="text-[#666]">
                              ({product.reviewsCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* INTERACTIVE SEASON STORY GALLERY */}
          <section className="bg-[#FAF9F6] px-6 pb-8 pt-8 md:pb-10 md:pt-10">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-0 bg-[#FAF9F6] md:grid-cols-12">
                <div
                  key={`story-copy-${activeSeasonStoryIndex}`}
                  className="season-story-enter flex min-h-[300px] flex-col items-start justify-center bg-transparent px-7 py-9 sm:min-h-[340px] sm:px-10 md:col-span-5 md:px-8 lg:min-h-[430px] lg:px-12"
                  aria-live="polite"
                >
                  <div className="mb-8 flex w-full items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8A7357]">
                      {SEASON_STORIES[activeSeasonStoryIndex].eyebrow}
                    </span>
                    <span className="font-serif-luxury text-sm text-[#9A9489]">
                      {String(activeSeasonStoryIndex + 1).padStart(2, "0")}
                      <span className="mx-1.5 text-[#C7BDAE]">/</span>
                      {String(SEASON_STORIES.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="whitespace-pre-line font-serif-luxury text-4xl font-normal leading-[0.98] tracking-[-0.025em] text-[#292820] sm:text-5xl lg:text-[3.35rem]">
                    {SEASON_STORIES[activeSeasonStoryIndex].title}
                  </h2>
                  <p className="mt-5 max-w-sm text-xs leading-6 text-[#6F6B63] sm:text-sm sm:leading-7">
                    {SEASON_STORIES[activeSeasonStoryIndex].description}
                  </p>
                  <button
                    onClick={() =>
                      goToShop(SEASON_STORIES[activeSeasonStoryIndex].category)
                    }
                    className="group mt-7 inline-flex items-center gap-3 border-b border-[#8A7357] pb-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#292820] transition-colors hover:border-[#5E4B38] hover:text-[#8A7357] sm:text-[10px]"
                  >
                    Explore {SEASON_STORIES[activeSeasonStoryIndex].label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="group relative min-h-[280px] overflow-hidden bg-[#E7E1D8] sm:min-h-[360px] md:col-span-7 md:min-h-[430px]">
                  <img
                    key={`story-image-${activeSeasonStoryIndex}`}
                    src={SEASON_STORIES[activeSeasonStoryIndex].image}
                    alt={SEASON_STORIES[activeSeasonStoryIndex].alt}
                    className="season-story-image-enter absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[8px] font-medium uppercase tracking-[0.2em] text-white/90 drop-shadow sm:bottom-5 sm:left-6 sm:text-[9px]">
                    {SEASON_STORIES[activeSeasonStoryIndex].label}
                  </span>
                </div>
              </div>

              <div className="season-story-swipe-hint" aria-hidden="true">
                <span>Swipe to explore</span>
                <ArrowRight className="season-story-swipe-arrow h-3.5 w-3.5" />
              </div>

              <div
                ref={seasonStoryThumbsRef}
                className="season-story-track mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:gap-4"
                aria-label="Seasonal story images"
                onPointerDown={(event) => {
                  if (event.pointerType !== "mouse" || event.button !== 0)
                    return;
                  const track = seasonStoryThumbsRef.current;
                  if (!track) return;
                  if (seasonStoryScrollFrameRef.current !== null) {
                    cancelAnimationFrame(seasonStoryScrollFrameRef.current);
                    seasonStoryScrollFrameRef.current = null;
                  }
                  seasonStoryDraggedRef.current = false;
                  track.classList.add("is-dragging");
                  seasonStoryDragRef.current = {
                    startX: event.clientX,
                    targetScroll: track.scrollLeft,
                    active: false,
                    pointerDown: true,
                  };
                }}
                onPointerMove={(event) => {
                  if (event.pointerType !== "mouse") return;
                  const drag = seasonStoryDragRef.current;
                  const track = seasonStoryThumbsRef.current;
                  if (!drag || !track) return;
                  if (event.buttons !== 1) {
                    drag.pointerDown = false;
                    return;
                  }
                  const distance = event.clientX - drag.startX;
                  if (Math.abs(distance) > 5) drag.active = true;
                  if (drag.active) {
                    event.preventDefault();
                    drag.targetScroll =
                      drag.startX === event.clientX
                        ? track.scrollLeft
                        : drag.targetScroll + (drag.startX - event.clientX);
                    drag.startX = event.clientX;
                    if (seasonStoryScrollFrameRef.current === null) {
                      const easeScroll = () => {
                        const currentDrag = seasonStoryDragRef.current;
                        const currentTrack = seasonStoryThumbsRef.current;
                        if (!currentDrag || !currentTrack) {
                          seasonStoryScrollFrameRef.current = null;
                          return;
                        }
                        const remaining =
                          currentDrag.targetScroll - currentTrack.scrollLeft;
                        if (Math.abs(remaining) < 0.5) {
                          currentTrack.scrollLeft = currentDrag.targetScroll;
                          seasonStoryScrollFrameRef.current = null;
                          if (!currentDrag.pointerDown) {
                            currentTrack.classList.remove("is-dragging");
                            seasonStoryDragRef.current = null;
                          }
                          return;
                        }
                        currentTrack.scrollLeft += remaining * 0.32;
                        seasonStoryScrollFrameRef.current =
                          requestAnimationFrame(easeScroll);
                      };
                      seasonStoryScrollFrameRef.current =
                        requestAnimationFrame(easeScroll);
                    }
                  }
                }}
                onPointerUp={() => {
                  const drag = seasonStoryDragRef.current;
                  const track = seasonStoryThumbsRef.current;
                  seasonStoryDraggedRef.current = Boolean(drag?.active);
                  if (drag) drag.pointerDown = false;
                  if (!drag?.active) {
                    track?.classList.remove("is-dragging");
                    seasonStoryDragRef.current = null;
                  }
                }}
                onPointerCancel={() => {
                  const drag = seasonStoryDragRef.current;
                  if (drag) drag.pointerDown = false;
                }}
                onClickCapture={(event) => {
                  if (!seasonStoryDraggedRef.current) return;
                  event.preventDefault();
                  event.stopPropagation();
                  seasonStoryDraggedRef.current = false;
                }}
              >
                {SEASON_STORIES.map((story, index) => {
                  const isActive = activeSeasonStoryIndex === index;
                  return (
                    <button
                      key={story.label}
                      type="button"
                      onClick={() => setActiveSeasonStoryIndex(index)}
                      aria-pressed={isActive}
                      aria-label={`Show ${story.label}`}
                      className={`group relative aspect-[1.65] w-[42vw] shrink-0 snap-start cursor-pointer overflow-hidden rounded-sm bg-[#E7E1D8] text-left transition-all duration-300 sm:w-[210px] md:w-[194px] lg:w-[200px] ${isActive ? "ring-2 ring-[#8A7357] ring-offset-2 ring-offset-[#FAF9F6]" : ""}`}
                    >
                      <img
                        src={story.image}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className={`h-full w-full object-cover transition-all duration-500 ${isActive ? "group-hover:scale-105" : "season-story-thumb-muted scale-[1.03]"}`}
                        loading="lazy"
                      />
                      <span
                        className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${isActive ? "bg-black/20" : "bg-[#8A7357]/20 group-hover:bg-[#8A7357]/10"}`}
                      />
                      {isActive && (
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] sm:text-[10px]">
                          {story.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ANIMATED COMMUNITY TESTIMONIALS */}
          <section
            ref={testimonialScrollSectionRef}
            className="relative mt-14 h-[360svh] bg-[#FAF9F6] max-[360px]:mt-56 sm:mt-16"
          >
            <div
              data-testimonials-stage
              className="sticky top-20 h-[calc(100svh-5rem)] flex items-center"
            >
              <div className="testimonial-stage-content w-full max-w-7xl mx-auto px-6 py-8">
                <div className="testimonial-section-title flex items-end justify-between gap-5 mb-7 md:mb-9">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.28em] text-[#9A8060] font-semibold block mb-2">
                      WORN &amp; LOVED
                    </span>
                    <h2 className="testimonial-section-heading font-serif-luxury text-3xl sm:text-4xl font-normal tracking-tight">
                      Notes from our community
                    </h2>
                  </div>
                  <span className="hidden sm:block text-[9px] uppercase tracking-[0.2em] text-[#918C82]">
                    Real style, shared
                  </span>
                </div>

                <div className="testimonial-grid grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
                  <div className="testimonial-image relative min-h-[250px] overflow-hidden md:col-span-5 md:min-h-[380px]">
                    {STYLE_TESTIMONIALS.map((testimonial, index) => (
                      <div
                        key={testimonial.name}
                        aria-hidden={activeTestimonialIndex !== index}
                        className="absolute left-[9%] top-[7%] h-[82%] w-[76%] bg-[#FAF9F6] p-1 shadow-lg sm:p-1.5"
                        style={{
                          zIndex:
                            STYLE_TESTIMONIALS.length -
                            ((index -
                              activeTestimonialIndex +
                              STYLE_TESTIMONIALS.length) %
                              STYLE_TESTIMONIALS.length),
                          opacity:
                            (index -
                              activeTestimonialIndex +
                              STYLE_TESTIMONIALS.length) %
                              STYLE_TESTIMONIALS.length <
                            3
                              ? 1
                              : 0,
                          transform: (() => {
                            const stackPosition =
                              (index -
                                activeTestimonialIndex +
                                STYLE_TESTIMONIALS.length) %
                              STYLE_TESTIMONIALS.length;
                            return `translate3d(${stackPosition * 16}px, ${stackPosition * 9}px, 0) rotate(${stackPosition * 4}deg) scale(${1 - stackPosition * 0.045})`;
                          })(),
                          transition:
                            "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease",
                        }}
                      >
                        <img
                          src={testimonial.image}
                          alt={
                            activeTestimonialIndex === index
                              ? `Style portrait for ${testimonial.name}`
                              : ""
                          }
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                    <span className="absolute bottom-4 left-5 z-10 text-[8px] uppercase tracking-[0.24em] text-[#77736B]">
                      FashiOnia community
                    </span>
                  </div>

                  <div className="testimonial-copy flex flex-col justify-between md:col-span-7 md:py-8 md:pl-4 lg:pl-10">
                    <div
                      key={activeTestimonialIndex}
                      className="animate-testimonial-enter"
                      aria-live="polite"
                    >
                      <span
                        aria-hidden="true"
                        className="testimonial-quote-mark block font-serif-luxury text-5xl leading-none text-[#C9AE76]"
                      >
                        “
                      </span>
                      <blockquote className="testimonial-quote font-serif-luxury text-2xl sm:text-3xl lg:text-4xl leading-[1.2] text-[#242320]">
                        “
                        {STYLE_TESTIMONIALS[activeTestimonialIndex].description}
                        ”
                      </blockquote>
                      <div className="mt-8 flex items-center gap-3">
                        <span className="h-px w-8 bg-[#C9AE76]" />
                        <div>
                          <p className="text-xs font-semibold tracking-wide text-[#222]">
                            {STYLE_TESTIMONIALS[activeTestimonialIndex].name}
                          </p>
                          <p className="mt-1 text-[10px] tracking-wide text-[#888]">
                            {STYLE_TESTIMONIALS[activeTestimonialIndex].handle}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="testimonial-controls mt-9 flex items-center justify-between border-t border-[#EAE7E1] pt-5">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#999]">
                        {String(activeTestimonialIndex + 1).padStart(2, "0")} /{" "}
                        {String(STYLE_TESTIMONIALS.length).padStart(2, "0")}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="mr-3 flex items-center gap-1.5">
                          {STYLE_TESTIMONIALS.map((testimonial, index) => (
                            <button
                              key={testimonial.name}
                              type="button"
                              onClick={() => scrollToTestimonial(index)}
                              aria-label={`Show testimonial from ${testimonial.name}`}
                              aria-current={
                                activeTestimonialIndex === index
                                  ? "true"
                                  : undefined
                              }
                              className={`h-1 transition-all duration-300 ${activeTestimonialIndex === index ? "w-7 bg-[#262522]" : "w-2 bg-[#D5D1C9] hover:bg-[#999]"}`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            scrollToTestimonial(
                              (activeTestimonialIndex -
                                1 +
                                STYLE_TESTIMONIALS.length) %
                                STYLE_TESTIMONIALS.length,
                            )
                          }
                          aria-label="Previous testimonial"
                          className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D0C4] bg-transparent text-[#6F6253] transition-all duration-300 hover:border-[#8A7357] hover:bg-[#292820] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A76] focus-visible:ring-offset-2"
                        >
                          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            scrollToTestimonial(
                              (activeTestimonialIndex + 1) %
                                STYLE_TESTIMONIALS.length,
                            )
                          }
                          aria-label="Next testimonial"
                          className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D0C4] bg-transparent text-[#6F6253] transition-all duration-300 hover:border-[#8A7357] hover:bg-[#292820] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A76] focus-visible:ring-offset-2"
                        >
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW SEASON EDITORIAL BANNER */}
          <section
            ref={newSeasonBannerRef}
            className="new-season-banner mt-8 mb-8 bg-[#FAF9F6] py-8 md:my-10 md:py-10"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-6 lg:gap-12">
                <div className="flex flex-col items-start justify-center py-4 md:col-span-5 md:py-8 md:pr-8 lg:pr-12">
                  <span className="mb-4 text-[9px] font-semibold uppercase tracking-[0.26em] text-[#9A8060]">
                    THE NEW SEASON{" "}
                    <span className="mx-1 text-[#B7AA95]">/</span> 2026
                  </span>
                  <h2 className="font-serif-luxury text-5xl font-normal leading-[0.95] tracking-tight text-[#292820] sm:text-6xl lg:text-7xl">
                    New season,
                    <br />
                    <em className="text-[#8A7357]">new feeling.</em>
                  </h2>
                  <p className="mt-5 max-w-sm text-sm leading-7 text-[#6F6B63]">
                    Discover the pieces shaping your season, chosen to feel like
                    you.
                  </p>
                  <button
                    onClick={() => goToShop("all")}
                    className="group mt-6 inline-flex items-center gap-3 border-b border-[#8A7357] py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#292820] transition-colors hover:text-[#8A7357]"
                  >
                    Explore collection
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <span className="mt-6 text-[8px] uppercase tracking-[0.22em] text-[#9A9489]">
                    FASHIONIA <span className="mx-1">/</span> THE SEASONAL EDIT
                  </span>
                </div>
                <div className="group relative min-h-[250px] overflow-hidden sm:min-h-[320px] md:col-span-7 md:min-h-[400px]">
                  <div
                    ref={newSeasonImageLayerRef}
                    className="absolute inset-x-0 -inset-y-[6%] will-change-transform"
                  >
                    <img
                      src="/images/plp_mens_streetwear_1791985698988.jpg"
                      alt="Model wearing a clean, modern streetwear look"
                      className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.025]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-4 right-5 text-[8px] uppercase tracking-[0.22em] text-white/80 drop-shadow">
                    The everyday, reimagined
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[#E5E0D7] bg-[#F2F0EB] text-[#292820]">
        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16">
          <div>
            <span className="mb-3 block text-[9px] font-medium uppercase tracking-[0.25em] text-[#9A8060]">
              A considered note from us
            </span>
            <h2 className="footer-heading font-serif-luxury text-3xl font-normal sm:text-4xl">
              A little style, now <span className="footer-heading-break">and then.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#77736B]">
              New arrivals, thoughtful edits, and a touch of inspiration for
              your everyday wardrobe.
            </p>
          </div>
          <div>
            {newsletterSubscribed ? (
              <p className="border-b border-[#B7AA95] py-4 text-sm text-[#625640]">
                Thanks for joining our style community.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail) setNewsletterSubscribed(true);
                }}
                className="flex border-b border-[#B7AA95]"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-1 py-4 text-sm text-[#292820] outline-none placeholder:text-[#918C82]"
                />
                <button
                  type="submit"
                  className="px-2 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#292820] transition-colors hover:text-[#9A8060]"
                >
                  Subscribe <ArrowRight className="ml-2 inline h-3.5 w-3.5" />
                </button>
              </form>
            )}
            <p className="mt-3 text-[10px] leading-5 text-[#918C82]">
              Occasional notes only. Unsubscribe whenever you like.
            </p>
          </div>
        </section>

        <div className="border-t border-[#E1DCD2]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-5 py-8 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-10 sm:px-6 sm:py-12">
            <div className="col-span-2 border-b border-[#E1DCD2] pb-6 sm:col-span-1 sm:border-0 sm:pb-0">
              <button
                type="button"
                onClick={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-serif-luxury text-[27px] font-semibold tracking-tight text-[#24231F] sm:text-2xl"
              >
                Velora
              </button>
              <p className="mt-2 max-w-[230px] text-[12px] leading-5 tracking-[0.01em] text-[#817C72]">
                Thoughtful style for every day, and every you.
              </p>
            </div>

            <div className="col-span-2 flex items-start justify-between gap-4 sm:col-span-1 sm:block">
              <h3 className="mb-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#777166] sm:mb-4 sm:text-[11px] sm:tracking-[0.2em]">
                Explore
              </h3>
              <div className="flex flex-row flex-wrap items-center justify-end gap-x-3 text-[13px] text-[#625F58] sm:flex-col sm:items-start sm:justify-start sm:gap-x-0 sm:space-y-1 sm:text-xs">
                <button
                  onClick={() => goToShop("all")}
                  className="block min-h-0 whitespace-nowrap py-1 transition-colors hover:text-black sm:min-h-9 sm:py-2"
                >
                  Shop all
                </button>
                <button
                  onClick={() => {
                    setCurrentView("about");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="block min-h-0 whitespace-nowrap py-1 transition-colors hover:text-black sm:min-h-9 sm:py-2"
                >
                  Our story
                </button>
              </div>
            </div>

            <div className="col-span-2 flex items-start justify-between gap-4 sm:col-span-1 sm:block">
              <h3 className="mb-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#777166] sm:mb-4 sm:text-[11px] sm:tracking-[0.2em]">
                Collections
              </h3>
              <div className="flex flex-row flex-wrap items-center justify-end gap-x-3 text-[13px] text-[#625F58] sm:flex-col sm:items-start sm:justify-start sm:gap-x-0 sm:space-y-1 sm:text-xs">
                <button
                  onClick={() => goToShop("women")}
                  className="block min-h-0 whitespace-nowrap py-1 transition-colors hover:text-black sm:min-h-9 sm:py-2"
                >
                  Women
                </button>
                <button
                  onClick={() => goToShop("men")}
                  className="block min-h-0 whitespace-nowrap py-1 transition-colors hover:text-black sm:min-h-9 sm:py-2"
                >
                  Men
                </button>
                <button
                  onClick={() => goToShop("children")}
                  className="block min-h-0 whitespace-nowrap py-1 transition-colors hover:text-black sm:min-h-9 sm:py-2"
                >
                  Kids
                </button>
              </div>
            </div>

            <div className="col-span-2 flex items-center justify-between border-t border-[#E1DCD2] pt-5 sm:col-span-1 sm:block sm:border-0 sm:pt-0">
              <h3 className="mb-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B8377] sm:mb-4 sm:text-[11px] sm:tracking-[0.2em]">
                Follow along
              </h3>
              <div className="flex items-center gap-2 text-[#625F58] sm:gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E1DCD2] transition-colors hover:text-[#9A8060] sm:h-auto sm:w-auto sm:rounded-none sm:border-0"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E1DCD2] transition-colors hover:text-[#9A8060] sm:h-auto sm:w-auto sm:rounded-none sm:border-0"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="Pinterest"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E1DCD2] font-serif-luxury text-lg transition-colors hover:text-[#9A8060] sm:h-auto sm:w-auto sm:rounded-none sm:border-0"
                >
                  P
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E1DCD2]">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-[10px] text-[#918C82] sm:flex-row sm:items-center sm:justify-between">
            <span>Ă‚Â© 2026 Velora. All rights reserved.</span>
            <span>Made for everyday style.</span>
          </div>
        </div>
      </footer>
      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slideLeft">
            <div className="p-6 border-b border-[#E5E2DC] flex items-center justify-between">
              <h3 className="font-serif-luxury text-2xl">
                Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 pb-6 border-b border-[#F0ECE1]"
                >
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-20 h-24 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-lg">
                      {item.product.name}
                    </h4>
                    <span className="text-sm font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slideLeft">
            <div className="p-6 border-b border-[#E5E2DC] flex items-center justify-between">
              <h3 className="font-serif-luxury text-2xl">
                My Wishlist ({wishlist.length})
              </h3>
              <button onClick={() => setIsWishlistOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {PRODUCTS.filter((p) => wishlist.includes(p.id)).map(
                (product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 pb-6 border-b border-[#F0ECE1] items-center"
                  >
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-16 h-20 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif-luxury">{product.name}</h4>
                      <p className="text-xs font-semibold">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </Localize>
  );
}
