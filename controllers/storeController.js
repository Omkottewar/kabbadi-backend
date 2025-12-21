import { supabase } from "../client.js";

export const getStoreHome = async (req, res) => {
  try {
    // 1️⃣ Categories
    const { data: categories, error: catErr } = await supabase
      .from("categories")
      .select("id, name");

    if (catErr) throw catErr;

    const formattedCategories = [
      { id: "all", name: "All" },
      ...categories.map(c => ({
        id: c.id.toString(),
        name: c.name
      }))
    ];

    // 2️⃣ PRODUCTS + FIRST VARIANT PRICE
    const { data: products, error: prodErr } = await supabase
      .from("products")
      .select(`
        id,
        name,
        main_image,
        category_id,
        product_variants (
          id,
          price,
          old_price,
          image
        )
      `)
      .limit(20);

    if (prodErr) throw prodErr;

    const formattedProducts = products.map(p => {
      const firstVariant = p.product_variants?.[0] ?? null;

      return {
        id: p.id,
        name: p.name,
        price: firstVariant?.price ?? 0,
        oldPrice: firstVariant?.old_price ?? 0,
        image: firstVariant?.image ?? p.main_image,
        category_id: p.category_id
      };
    });

    // 3️⃣ Dummy offer for now
    const offer = {
      title: "Special Offer!",
      subtitle: "Up to 30% off on Kabaddi gear",
      discount: "30% OFF"
    };

    return res.json({
      categories: formattedCategories,
      offer,
      cartCount: 0,
      products: formattedProducts
    });

  } catch (err) {
    console.error("STORE HOME ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load store"
    });
  }
};

export const getProductsWithVariants = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        brand,
        category_id,
        main_image,
        product_variants (
          id,
          sku,
          color,
          size,
          price,
          old_price,
          image,
          additional_images,
          inventory (
            stock
          )
        )
      `);

    if (error) throw error;

    return res.json({
      success: true,
      products: data
    });

  } catch (err) {
    console.error("PRODUCT API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load product list"
    });
  }
};
