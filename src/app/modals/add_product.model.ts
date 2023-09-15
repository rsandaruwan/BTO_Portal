export interface AddProductIntarface {
  

    
        product: {
          product_id: string,
          category_has_sub_category_id: [string ],
          product_name: string,
          product_main_image: string,
          product_description: string,
          product_ingredients: [string],
          product_in_stock: 1,
          product_featured: 2,
          product_rating: 5,
          product_status: 1
        },
        product_variant: [
          {
            product_variant_id: string,
            product_variant_name: string,
            product_images: [
              {
                product_image:string,
                product_image_order: 0
              }
            ],
            product_price: 0,
            product_attribute_list: [
              {
                attribute_id: string,
                attribute_value: string
              }
            ],
            product_variant_nutrition_list: [
              {
                nutrition_name: string,
                nutrition_per_100_gram: [string ],
                nutrition_in_this_pack: [ string ]
              }
            ]
          }
        ]
      }
    