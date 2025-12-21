// import { supabase } from "../client.js";

// export const getStoreHome = async (req, res) => {
//   try {
//     const userId = req.user?.id; // from Mongo JWT

//     // 1️⃣ Categories
//     const { data: categories, error: catErr } = await supabase
//       .from("categories")
//       .select("id, name");

//     if (catErr) throw catErr;

//     const formattedCategories = [
//       { id: 1, name: "All" },
//       ...categories
//     ];

//     // 2️⃣ Products
//     const { data: products, error: prodErr } = await supabase
//       .from("products")
//       .select(`
//         id,
//         name,
//         price,
//         old_price,
//         rating,
//         featured,
//         image
//       `)
//       .order("featured", { ascending: false })
//       .limit(20);

//     if (prodErr) throw prodErr;

//     const formattedProducts = products.map(p => ({
//       id: p.id,
//       name: p.name,
//       price: p.price,
//       oldPrice: p.old_price,
//       rating: p.rating,
//       featured: p.featured,
//       image: p.image
//     }));

//     // 3️⃣ Cart Count (Supabase, user from Mongo)
//     let cartCount = 0;

//     if (userId) {
//       const { data: cart } = await supabase
//         .from("carts")
//         .select("id")
//         .eq("user_id", userId)
//         .single();

//       if (cart) {
//         const { data: items } = await supabase
//           .from("cart_items")
//           .select("qty")
//           .eq("cart_id", cart.id);

//         cartCount = items?.reduce((sum, i) => sum + i.qty, 0) || 0;
//       }
//     }

//     // 4️⃣ Offer (can move to DB later)
//     const offer = {
//       title: "Special Offer!",
//       subtitle: "Up to 30% off on Kabaddi gear",
//       discount: "30% OFF"
//     };

//     return res.json({
//       categories: formattedCategories,
//       offer,
//       cartCount,
//       products: formattedProducts
//     });

//   } catch (err) {
//     console.error("STORE HOME ERROR:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to load store"
//     });
//   }
// };
