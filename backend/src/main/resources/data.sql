-- ==========================================
-- 1. BRAND CATALOG SEEDS (Cloud Rasoi Brand)
-- ==========================================

-- Seed Products
INSERT INTO products (name, subtitle, description, category, image_name, ingredients, nutrition_energy, nutrition_fat, nutrition_carbs, nutrition_protein, nutrition_salt) VALUES 
('Signature Mango Chutney', 'Sweet, tangy & artisanal', 'Our signature sweet and tangy chutney made from fresh hand-picked Alphonso mangoes, slowly simmered with roasted cumin, ginger, and red chili flakes.', 'Sauces', 'mango_chutney.jpg', 'Alphonso Mango;Cane Sugar;Ginger;Cumin;Red Chili;Salt', '180 kcal', '0.2g', '44g', '0.5g', '1.2g'),
('Spicy Garlic Tadka Spread', 'Rich, fiery & aromatic', 'A creamy, velvety cashew-based spread infused with slow-roasted garlic cloves and a tempering (tadka) of Kashmiri red chilies and mustard seeds.', 'Spreads', 'garlic_spread.jpg', 'Raw Cashews;Slow-Roasted Garlic;Kashmiri Red Chili;Mustard Seeds;Coconut Oil;Lemon Juice;Salt', '310 kcal', '28g', '12g', '7.5g', '0.9g'),
('Coriander Mint Pesto', 'Fresh, herbal & zesty', 'A vibrant green herb pesto made from fresh organic coriander, mint leaves, green chilies, roasted peanuts, and lime juice.', 'Sauces', 'mint_pesto.jpg', 'Fresh Coriander;Fresh Mint;Green Chilies;Roasted Peanuts;Lime Juice;Olive Oil;Salt', '140 kcal', '12g', '6g', '3.2g', '1.1g'),
('Creamy Cashew Makhani Spread', 'Velvety, mild & authentic', 'Our signature dairy-free makhani spread, rich in cashew cream and infused with traditional Indian spices like fenugreek (kasuri methi) and cardamom.', 'Spreads', 'makhani_spread.jpg', 'Cashew Cream;Tomato Paste;Kashmiri Chili;Kasuri Methi;Garlic;Cardamom;Salt', '240 kcal', '21g', '9g', '4.8g', '0.8g');

-- Seed Recipes
INSERT INTO recipes (title, description, image_name, time_badge, difficulty, badges, ingredients, instructions) VALUES 
('Falafel Wraps with Garlic Tadka', 'Crispy chickpea falafel balls wrapped in warm, soft tortillas, loaded with fresh cucumber, tomatoes, onions, and smothered in our Spicy Garlic Tadka Spread.', 'falafel_wrap.jpg', '20 min', 2, 'Easy,Vegan,Wrap', '1 pack tortillas;6 falafel balls;1 cucumber sliced;1 tomato diced;3 tbsp Spicy Garlic Tadka Spread;Fresh coriander', 'Warm the tortillas on a tandoor or pan;Spread a generous layer of Spicy Garlic Tadka Spread on each tortilla;Arrange the sliced cucumber, tomatoes, and warm falafel balls;Roll tightly and serve cut in half with extra chutney'),
('Makhani Paneer Flatbread', 'A quick and incredibly delicious flatbread topped with marinated paneer cubes, capsicum, onions, and our Creamy Cashew Makhani Spread, baked to perfection.', 'paneer_flatbread.jpg', '15 min', 1, 'Quick,Vegetarian,Baking', '1 ready-made flatbread or naan;100g paneer cubes;1/2 capsicum sliced;1/2 red onion sliced;4 tbsp Creamy Cashew Makhani Spread;1 tsp chat masala', 'Preheat your oven to 200°C (390°F);Spread Creamy Cashew Makhani Spread evenly over the flatbread;Top with paneer cubes, sliced capsicum, and red onions;Bake for 8-10 minutes until the edges are crispy;Sprinkle chat masala and serve hot'),
('Artisanal Dosa Rollups', 'Crispy South Indian masala dosa rollups filled with spiced potato mash, served with fresh Coriander Mint Pesto and coconut chutney.', 'dosa_rollup.jpg', '25 min', 3, 'South Indian,Gluten-Free', '1 cup dosa batter;1 cup spiced potato mash;3 tbsp Coriander Mint Pesto;Coconut chutney for serving', 'Heat a non-stick tawa and spread the dosa batter in a thin circular motion;Drizzle some oil and cook until the bottom is golden and crispy;Spread a thin layer of Coriander Mint Pesto on the dosa;Place a log of spiced potato mash in the center and roll tightly;Slice into bite-sized rollups and serve with coconut chutney');


-- ==========================================
-- 2. FOOD DELIVERY SEEDS (Zomato/Swiggy)
-- ==========================================

-- Seed Restaurants (10 Premium Restaurants across different cities)
INSERT INTO restaurants (name, cuisines, rating, delivery_time_minutes, cost_for_two, image_name, location) VALUES 
('Spicy Tadka', 'North Indian, Punjabi, Mughlai', 4.3, 25, 400, 'spicy_tadka.jpg', 'Connaught Place, New Delhi'),
('Dosa Express', 'South Indian, Karnataka, Pure Veg', 4.5, 20, 250, 'dosa_express.jpg', 'Indiranagar, Bangalore'),
('Royal Biryani House', 'Biryani, Mughlai, Hyderabadi', 4.4, 30, 500, 'royal_biryani.jpg', 'Gachibowli, Hyderabad'),
('Chaat Corner', 'Street Food, Snacks, Fast Food', 4.2, 15, 150, 'chaat_corner.jpg', 'Juhu, Mumbai'),
('Sweet Delight', 'Desserts, Bengali, Mithai', 4.6, 20, 300, 'sweet_delight.jpg', 'Salt Lake, Kolkata'),
('Tandoori Heights', 'North Indian, Kebabs, Mughlai', 4.4, 25, 450, 'spicy_tadka.jpg', 'Sector 29, Gurgaon'),
('Dakshin Delights', 'South Indian, Kerala, Pure Veg', 4.3, 18, 200, 'dosa_express.jpg', 'Jayanagar, Bangalore'),
('Biryani Nawab', 'Biryani, Hyderabadi, Mughlai', 4.6, 22, 350, 'royal_biryani.jpg', 'Banjara Hills, Hyderabad'),
('Mumbai Masala', 'Street Food, Fast Food, Snacks', 4.1, 15, 180, 'chaat_corner.jpg', 'Bandra West, Mumbai'),
('Sweet Nirvana', 'Desserts, Bengali, Sweets', 4.7, 20, 280, 'sweet_delight.jpg', 'Park Street, Kolkata');

-- Seed Menu Items (Dishes)
INSERT INTO menu_items (restaurant_id, name, description, price, category, is_veg, rating, image_name) VALUES 
-- 1. Spicy Tadka (North Indian - Delhi)
(1, 'Butter Paneer Masala', 'Rich and creamy cottage cheese cubes cooked in a tomato, butter, and cashew gravy.', 240.0, 'Main Course', true, 4.5, 'butter_paneer.jpg'),
(1, 'Dal Makhani', 'Black lentils cooked overnight with butter and cream, slowly simmered on hot tandoor.', 210.0, 'Main Course', true, 4.4, 'dal_makhani.jpg'),
(1, 'Butter Chicken', 'Tender tandoori chicken simmered in a smooth, velvety tomato, butter, and cream gravy.', 290.0, 'Main Course', false, 4.7, 'butter_chicken.jpg'),
(1, 'Paneer Tikka', 'Spiced cottage cheese cubes marinated in yogurt and grilled in a traditional clay oven.', 190.0, 'Starters', true, 4.3, 'paneer_tikka.jpg'),
(1, 'Chicken Tikka', 'Boneless chicken chunks marinated in spices and yogurt, grilled to perfection in tandoor.', 220.0, 'Starters', false, 4.5, 'chicken_tikka.jpg'),
(1, 'Butter Naan', 'Fine flour bread baked in tandoor and glazed with fresh butter.', 40.0, 'Breads', true, 4.6, 'butter_naan.jpg'),
(1, 'Tandoori Roti', 'Whole wheat flatbread baked in clay oven.', 25.0, 'Breads', true, 4.2, 'tandoori_roti.jpg'),

-- 2. Dosa Express (South Indian - Bangalore)
(2, 'Masala Dosa', 'Crispy rice and lentil crepe stuffed with a spiced mashed potato filling, served with sambar and chutneys.', 90.0, 'South Indian', true, 4.7, 'masala_dosa.jpg'),
(2, 'Idli Sambar (2 Pcs)', 'Soft, fluffy steamed rice cakes served with hot vegetable lentil stew (sambar) and coconut chutney.', 60.0, 'South Indian', true, 4.5, 'idli_sambar.jpg'),
(2, 'Medu Vada (2 Pcs)', 'Crispy, deep-fried savory lentil doughnuts served with sambar and coconut chutney.', 70.0, 'South Indian', true, 4.4, 'medu_vada.jpg'),
(2, 'Rava Onion Dosa', 'Crispy crepe made of semolina and rice flour, topped with chopped onions and green chilies.', 110.0, 'South Indian', true, 4.3, 'rava_dosa.jpg'),
(2, 'Filter Coffee', 'Authentic South Indian chicory-blended coffee frothed with hot milk in a traditional brass tumbler.', 40.0, 'Beverages', true, 4.8, 'filter_coffee.jpg'),

-- 3. Royal Biryani House (Biryani - Hyderabad)
(3, 'Chicken Dum Biryani', 'Fragrant basmati rice layered with spiced marinated chicken, slow-cooked in dum style with saffron.', 290.0, 'Biryani', false, 4.8, 'chicken_biryani.jpg'),
(3, 'Mutton Biryani', 'Traditional Hyderabadi biryani cooked with tender pieces of spiced mutton and aromatic basmati rice.', 350.0, 'Biryani', false, 4.7, 'mutton_biryani.jpg'),
(3, 'Paneer Dum Biryani', 'Aromatic basmati rice cooked on dum with marinated cottage cheese cubes and rich Indian spices.', 260.0, 'Biryani', true, 4.6, 'paneer_biryani.jpg'),
(3, 'Veg Hyderabadi Biryani', 'Long grain basmati rice cooked with fresh seasonal vegetables and spices in Hyderabadi style.', 240.0, 'Biryani', true, 4.5, 'veg_biryani.jpg'),
(3, 'Garlic Naan', 'Tandoori naan topped with minced garlic, fresh coriander, and butter.', 50.0, 'Breads', true, 4.4, 'garlic_naan.jpg'),
(3, 'Mirchi Ka Salan', 'A traditional spicy Hyderabadi side dish made of green chilies, peanuts, sesame, and tamarind.', 80.0, 'Sides', true, 4.1, 'mirchi_salan.jpg'),

-- 4. Chaat Corner (Street Food - Mumbai)
(4, 'Pani Puri (Golgappa)', 'Crispy hollow puris filled with spicy tamarind water, potatoes, chickpeas, and sweet chutney.', 50.0, 'Chaat', true, 4.8, 'pani_puri.jpg'),
(4, 'Samosa Chaat', 'Crushed spiced potato pastries topped with hot chickpea curry, yogurt, sweet & sour chutneys, and sev.', 70.0, 'Chaat', true, 4.4, 'samosa_chaat.jpg'),
(4, 'Chole Bhature', 'A combination of spicy chickpea curry (chole) and deep-fried leavened sourdough bread (bhatura).', 120.0, 'Snacks', true, 4.6, 'chole_bhature.jpg'),
(4, 'Pav Bhaji', 'A spicy blend of mashed vegetables cooked in butter, served with soft toasted buttered bread buns.', 100.0, 'Snacks', true, 4.5, 'pav_bhaji.jpg'),

-- 5. Sweet Delight (Desserts - Kolkata)
(5, 'Gulab Jamun (2 Pcs)', 'Deep-fried milk-solid dumplings soaked in warm cardamom-flavored sugar syrup.', 60.0, 'Sweets', true, 4.7, 'gulab_jamun.jpg'),
(5, 'Rasgulla (2 Pcs)', 'Spongy and soft cottage cheese balls cooked in light sugar syrup.', 50.0, 'Sweets', true, 4.5, 'rasgulla.jpg'),
(5, 'Kesar Pista Kulfi', 'Traditional Indian rich, dense ice cream flavored with saffron, pistachios, and green cardamom.', 80.0, 'Sweets', true, 4.7, 'kulfi.jpg'),
(5, 'Sweet Lassi', 'Chilled sweet yogurt beverage topped with a dollop of fresh malai and nuts.', 70.0, 'Beverages', true, 4.6, 'lassi.jpg'),

-- 6. Tandoori Heights (North Indian - Gurgaon)
(6, 'Kadhai Paneer', 'Paneer cubes cooked with bell peppers and freshly ground spices in a traditional kadhai.', 230.0, 'Main Course', true, 4.4, 'butter_paneer.jpg'),
(6, 'Murg Malai Tikka', 'Chicken chunks marinated in cream, cheese, and mild spices, grilled in clay oven.', 240.0, 'Starters', false, 4.5, 'chicken_tikka.jpg'),
(6, 'Lacha Paratha', 'Layered whole wheat bread baked in tandoor.', 35.0, 'Breads', true, 4.3, 'tandoori_roti.jpg'),

-- 7. Dakshin Delights (South Indian - Bangalore)
(7, 'Onion Rava Masala Dosa', 'Crispy semolina crepe topped with onions and filled with potato masala.', 105.0, 'South Indian', true, 4.4, 'rava_dosa.jpg'),
(7, 'Coconut Lassi', 'Frothed yogurt drink with fresh coconut milk and cardamom.', 65.0, 'Beverages', true, 4.5, 'lassi.jpg'),

-- 8. Biryani Nawab (Biryani - Hyderabad)
(8, 'Special Mutton Dum Biryani', 'Slow dum-cooked premium basmati rice with tender lamb chops and authentic Hyderabadi spices.', 360.0, 'Biryani', false, 4.8, 'mutton_biryani.jpg'),
(8, 'Egg Biryani', 'Fragrant rice cooked with boiled eggs and caramelized onions.', 210.0, 'Biryani', false, 4.3, 'chicken_biryani.jpg'),

-- 9. Mumbai Masala (Street Food - Mumbai)
(9, 'Dahi Puri', 'Crispy puris stuffed with potatoes, sweet yogurt, tamarind chutney, and fine sev.', 60.0, 'Chaat', true, 4.5, 'pani_puri.jpg'),
(9, 'Vada Pav (2 Pcs)', 'The iconic Mumbai spicy potato fritter stuffed inside a soft bread bun with dry garlic chutney.', 50.0, 'Snacks', true, 4.7, 'pav_bhaji.jpg'),

-- 10. Sweet Nirvana (Desserts - Kolkata)
(10, 'Mishti Doi', 'Traditional Bengali sweetened yogurt fermented in a clay pot.', 70.0, 'Sweets', true, 4.9, 'gulab_jamun.jpg'),
(10, 'Sandesh (4 Pcs)', ' Bengali dessert made of fresh cottage cheese, cardamom, and saffron.', 90.0, 'Sweets', true, 4.6, 'rasgulla.jpg');

-- Seed default user (password: 'password')
INSERT INTO users (username, password, email, phone, address) VALUES 
('customer', 'password', 'customer@example.com', '9876543210', 'Flat 405, Block B, Indiranagar, Bangalore');

-- Seed default addresses for user ID 1
INSERT INTO user_addresses (user_id, label, address_line, latitude, longitude) VALUES 
(1, 'Home', 'Flat 405, Block B, Indiranagar, Bangalore', 12.9716, 77.6412),
(1, 'Work', 'Tech Park Phase 2, Whitefield, Bangalore', 12.9698, 77.7499),
(1, 'Other', 'Grand Plaza, Connaught Place, New Delhi', 28.6304, 77.2177);
