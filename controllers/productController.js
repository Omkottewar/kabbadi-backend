import { supabase } from "../client.js";

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // 1️⃣ Fetch product + variants + stock
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        brand,
        main_image,
        category_id,
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
      `)
      .eq("id", productId)
      .single();

    if (error) throw error;

    // 2️⃣ Product not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const variants = data.product_variants.map(v => ({
      id: v.id,
      sku: v.sku,
      color: v.color,
      size: v.size,
      price: v.price,
      oldPrice: v.old_price,

      // 🔥 Merge single + multiple images
      images: [
        v.image,
        ...(v.additional_images || [])
      ].filter(Boolean),

      stock: v.inventory?.stock ?? 0
    }));


    // 4️⃣ Format final product response
    const finalProduct = {
      id: data.id,
      name: data.name,
      description: data.description,
      brand: data.brand,
      mainImage: data.main_image,
      categoryId: data.category_id,
      variants
    };

    return res.json({
      success: true,
      product: finalProduct
    });

  } catch (err) {
    console.error("PRODUCT DETAIL ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load product details"
    });
  }
};
