'use strict';

// Destinations data with hotels
const destinationsData = {
    'taj-mahal': {
        name: 'Taj Mahal, Agra',
        tagline: 'The Eternal Symbol of Love',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1920',
        description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.',
        highlights: ['UNESCO World Heritage Site', 'Sunrise & Sunset Views', 'Mughal Architecture', 'Garden Complex'],
        hotels: [
            { id: 1, name: 'The Oberoi Amarvilas', type: 'hotel', rating: 4.9, reviews: 2340, price: 25000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Taj View'], description: 'Luxury hotel with uninterrupted views of the Taj Mahal from every room.' },
            { id: 2, name: 'ITC Mughal Resort', type: 'resort', rating: 4.7, reviews: 1890, price: 18000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Spa', 'Golf', 'Gardens'], description: 'Sprawling resort inspired by Mughal gardens with world-class amenities.' },
            { id: 3, name: 'Radisson Blu Agra', type: 'hotel', rating: 4.5, reviews: 1456, price: 8500, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Pool', 'Gym', 'Restaurant', 'Bar'], description: 'Modern comfort meets Mughal charm in the heart of Agra.' },
            { id: 4, name: 'Taj Mahal Homestay', type: 'homestay', rating: 4.6, reviews: 890, price: 3500, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['WiFi', 'Breakfast', 'AC', 'Rooftop'], description: 'Authentic local experience with rooftop Taj views.' },
            { id: 5, name: 'Crystal Sarovar Premiere', type: 'hotel', rating: 4.3, reviews: 1234, price: 6000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Pool', 'Restaurant', 'Spa', 'WiFi'], description: 'Contemporary hotel offering excellent value and comfort.' }
        ]
    },
    'golden-temple': {
        name: 'Golden Temple, Amritsar',
        tagline: 'The Holiest Shrine of Sikhism',
        image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1920',
        description: 'Harmandir Sahib, known as the Golden Temple, is the most important pilgrimage site of Sikhism. The temple is surrounded by a large lake, known as the Sarovar, which consists of Amrit (holy water).',
        highlights: ['Langar (Free Kitchen)', 'Night Illumination', 'Spiritual Experience', 'Jallianwala Bagh Nearby'],
        hotels: [
            { id: 1, name: 'Taj Swarna Amritsar', type: 'hotel', rating: 4.8, reviews: 1567, price: 12000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Bar'], description: 'Luxury hotel blending Punjab heritage with modern comfort.' },
            { id: 2, name: 'Radisson Blu Amritsar', type: 'hotel', rating: 4.6, reviews: 1234, price: 8000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Pool', 'Gym', 'Restaurant', 'WiFi'], description: 'Contemporary hotel near the Golden Temple.' },
            { id: 3, name: 'Hotel Narain Niwas', type: 'hotel', rating: 4.4, reviews: 890, price: 4500, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Restaurant', 'WiFi', 'AC', 'Parking'], description: 'Heritage hotel with traditional Punjabi hospitality.' },
            { id: 4, name: 'Golden Tulip Amritsar', type: 'hotel', rating: 4.3, reviews: 678, price: 5500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Restaurant', 'Gym', 'WiFi', 'Bar'], description: 'Modern comfort in the holy city.' },
            { id: 5, name: 'Amritsar Homestay', type: 'homestay', rating: 4.7, reviews: 456, price: 2500, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Breakfast', 'WiFi', 'AC', 'Local Guide'], description: 'Experience authentic Punjabi culture and cuisine.' }
        ]
    },
    'kerala-backwaters': {
        name: 'Kerala Backwaters',
        tagline: "God's Own Country",
        image: 'https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?q=80&w=1920',
        description: 'The Kerala backwaters are a network of brackish lagoons and lakes lying parallel to the Arabian Sea coast. This intricate system of waterways is home to unique ecosystems and traditional houseboats.',
        highlights: ['Houseboat Cruises', 'Ayurvedic Treatments', 'Coconut Lagoons', 'Village Life'],
        hotels: [
            { id: 1, name: 'Kumarakom Lake Resort', type: 'resort', rating: 4.9, reviews: 2100, price: 22000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Pool', 'Spa', 'Ayurveda', 'Lake View'], description: 'Award-winning luxury resort on Vembanad Lake.' },
            { id: 2, name: 'Coconut Lagoon', type: 'resort', rating: 4.8, reviews: 1780, price: 18000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Spa', 'Boat Rides', 'Restaurant'], description: 'Eco-friendly heritage resort accessible only by boat.' },
            { id: 3, name: 'Premium Houseboat', type: 'villa', rating: 4.7, reviews: 1456, price: 15000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['AC', 'Chef', 'Cruise', 'Sundeck'], description: 'Luxury houseboat cruise through the backwaters.' },
            { id: 4, name: 'Backwater Ripples', type: 'homestay', rating: 4.5, reviews: 890, price: 4200, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Breakfast', 'Canoe', 'WiFi', 'Garden'], description: 'Charming homestay on the backwater banks.' },
            { id: 5, name: 'Alleppey Beach Resort', type: 'resort', rating: 4.4, reviews: 1123, price: 7500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Pool', 'Beach', 'Ayurveda', 'Restaurant'], description: 'Beach resort with backwater access.' }
        ]
    },
    'goa': {
        name: 'Goa',
        tagline: 'Sun, Sand & Susegad',
        image: 'https://plus.unsplash.com/premium_photo-1697730411634-5313371ad8fe?q=80&w=1920',
        description: 'Goa is a state on the southwestern coast of India known for its beaches, Portuguese heritage, and vibrant nightlife. From party beaches to serene retreats, Goa has something for everyone.',
        highlights: ['Beach Life', 'Portuguese Architecture', 'Nightlife', 'Water Sports'],
        hotels: [
            { id: 1, name: 'Taj Exotica Resort & Spa', type: 'resort', rating: 4.9, reviews: 2890, price: 28000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Beach', 'Pool', 'Spa', 'Golf'], description: 'Mediterranean-style luxury on Benaulim Beach.' },
            { id: 2, name: 'W Goa', type: 'resort', rating: 4.8, reviews: 2340, price: 22000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Beach', 'Pool', 'Nightclub', 'Spa'], description: 'Trendy beachfront resort with vibrant nightlife.' },
            { id: 3, name: 'Alila Diwa Goa', type: 'resort', rating: 4.7, reviews: 1890, price: 15000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Yoga'], description: 'Serene retreat amidst paddy fields.' },
            { id: 4, name: 'Anjuna Beach Villa', type: 'villa', rating: 4.6, reviews: 1234, price: 10000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Pool', 'Kitchen', 'WiFi', 'Garden'], description: 'Private villa near famous Anjuna flea market.' },
            { id: 5, name: 'Palolem Beach Huts', type: 'homestay', rating: 4.4, reviews: 890, price: 3500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Beach', 'Restaurant', 'WiFi', 'AC'], description: 'Beachfront huts on the crescent-shaped Palolem beach.' }
        ]
    },
    'jaipur': {
        name: 'Jaipur',
        tagline: 'The Pink City',
        image: 'https://plus.unsplash.com/premium_photo-1661962404003-e0ca40da40ef?q=80&w=1920',
        description: 'Jaipur is the capital of Rajasthan, known for its iconic pink-hued buildings, magnificent palaces, and vibrant bazaars. The city is part of the famous Golden Triangle tourist circuit.',
        highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Colorful Bazaars'],
        hotels: [
            { id: 1, name: 'Rambagh Palace', type: 'hotel', rating: 4.9, reviews: 2567, price: 35000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Gardens'], description: 'Former residence of the Maharaja, now a grand palace hotel.' },
            { id: 2, name: 'The Oberoi Rajvilas', type: 'resort', rating: 4.9, reviews: 2100, price: 30000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Fort'], description: 'Luxury resort set within a 32-acre fort.' },
            { id: 3, name: 'ITC Rajputana', type: 'hotel', rating: 4.6, reviews: 1890, price: 12000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Bar'], description: 'Grand hotel reflecting Rajasthani architecture.' },
            { id: 4, name: 'Samode Haveli', type: 'hotel', rating: 4.7, reviews: 1234, price: 9000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Pool', 'Restaurant', 'Heritage', 'Garden'], description: 'Historic haveli with traditional Rajasthani hospitality.' },
            { id: 5, name: 'Pink City Homestay', type: 'homestay', rating: 4.5, reviews: 678, price: 3000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Breakfast', 'WiFi', 'AC', 'Tour Guide'], description: 'Authentic Rajasthani experience in a local home.' }
        ]
    },
    'mumbai': {
        name: 'Mumbai',
        tagline: 'The City of Dreams',
        image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=1920',
        description: 'Mumbai is the financial capital of India and home to Bollywood. From the iconic Gateway of India to marine Drive, the city offers a unique blend of heritage and modernity.',
        highlights: ['Gateway of India', 'Marine Drive', 'Bollywood Tours', 'Street Food'],
        hotels: [
            { id: 1, name: 'The Taj Mahal Palace', type: 'hotel', rating: 4.9, reviews: 3456, price: 32000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Sea View'], description: 'Iconic luxury hotel overlooking the Gateway of India.' },
            { id: 2, name: 'The Oberoi Mumbai', type: 'hotel', rating: 4.8, reviews: 2890, price: 25000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Ocean View'], description: 'Contemporary luxury with stunning ocean views.' },
            { id: 3, name: 'Trident Nariman Point', type: 'hotel', rating: 4.6, reviews: 2100, price: 15000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Bar'], description: 'Business hotel with Marine Drive views.' },
            { id: 4, name: 'ITC Grand Central', type: 'hotel', rating: 4.5, reviews: 1780, price: 12000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], description: 'Luxury hotel in the heart of Mumbai.' },
            { id: 5, name: 'Bandra Beach Stay', type: 'homestay', rating: 4.4, reviews: 890, price: 5000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['WiFi', 'AC', 'Kitchen', 'Beach Access'], description: 'Modern apartment in trendy Bandra area.' }
        ]
    },
    'delhi': {
        name: 'Delhi',
        tagline: 'Where History Meets Modernity',
        image: 'https://plus.unsplash.com/premium_photo-1697730447144-a2f7257e4a1f?q=80&w=1920',
        description: 'Delhi, the capital of India, is a city that seamlessly blends the ancient with the modern. From Mughal monuments to contemporary architecture, Delhi offers a rich tapestry of experiences.',
        highlights: ['Red Fort', 'Qutub Minar', 'India Gate', 'Chandni Chowk'],
        hotels: [
            { id: 1, name: 'The Leela Palace', type: 'hotel', rating: 4.9, reviews: 2890, price: 28000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Butler'], description: 'Palatial luxury in the diplomatic enclave.' },
            { id: 2, name: 'The Imperial', type: 'hotel', rating: 4.8, reviews: 2456, price: 22000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Spa', 'Art Gallery', 'Restaurant'], description: 'Historic hotel with one of India\'s finest art collections.' },
            { id: 3, name: 'ITC Maurya', type: 'hotel', rating: 4.7, reviews: 2100, price: 18000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Pool', 'Spa', 'Bukhara Restaurant', 'Bar'], description: 'Home to the legendary Bukhara restaurant.' },
            { id: 4, name: 'The Claridges', type: 'hotel', rating: 4.5, reviews: 1567, price: 12000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Garden'], description: 'Colonial charm in Lutyens Delhi.' },
            { id: 5, name: 'Paharganj Boutique Stay', type: 'homestay', rating: 4.3, reviews: 890, price: 3500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['WiFi', 'AC', 'Breakfast', 'Tour Help'], description: 'Budget-friendly stay near New Delhi station.' }
        ]
    },
    'kashmir': {
        name: 'Kashmir',
        tagline: 'Paradise on Earth',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1920',
        description: 'Kashmir is a region in the northern part of the Indian subcontinent, known for its stunning natural beauty - from the Dal Lake to the snow-capped Himalayas.',
        highlights: ['Dal Lake Houseboats', 'Gulmarg Skiing', 'Mughal Gardens', 'Shikara Rides'],
        hotels: [
            { id: 1, name: 'The Lalit Grand Palace', type: 'hotel', rating: 4.9, reviews: 1890, price: 22000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Lake View'], description: 'Former palace of the Maharaja with Dal Lake views.' },
            { id: 2, name: 'Vivanta Dal View', type: 'hotel', rating: 4.7, reviews: 1567, price: 15000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Mountain View'], description: 'Modern luxury overlooking Dal Lake.' },
            { id: 3, name: 'Deluxe Houseboat', type: 'villa', rating: 4.8, reviews: 2100, price: 12000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Lake Stay', 'Meals', 'Shikara', 'Butler'], description: 'Traditional Kashmiri houseboat experience on Dal Lake.' },
            { id: 4, name: 'Khyber Himalayan Resort', type: 'resort', rating: 4.9, reviews: 1234, price: 28000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Spa', 'Skiing', 'Restaurant', 'Mountain View'], description: 'Luxury ski resort in Gulmarg.' },
            { id: 5, name: 'Srinagar Homestay', type: 'homestay', rating: 4.5, reviews: 678, price: 4000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Breakfast', 'WiFi', 'Heater', 'Local Guide'], description: 'Warm Kashmiri hospitality in a local home.' }
        ]
    },
    'rishikesh': {
        name: 'Rishikesh',
        tagline: 'The Yoga Capital of the World',
        image: 'https://images.unsplash.com/photo-1716573260891-23ad993e8833?q=80&w=1920',
        description: 'Rishikesh is a city in the foothills of the Himalayas, known as the Gateway to the Garhwal Himalayas. It is famous for yoga, meditation, and adventure sports.',
        highlights: ['Yoga & Meditation', 'River Rafting', 'Beatles Ashram', 'Ganga Aarti'],
        hotels: [
            { id: 1, name: 'Ananda in the Himalayas', type: 'resort', rating: 4.9, reviews: 1890, price: 35000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Spa', 'Yoga', 'Ayurveda', 'Pool'], description: 'World-renowned wellness retreat in a palace setting.' },
            { id: 2, name: 'Taj Rishikesh Resort', type: 'resort', rating: 4.8, reviews: 1456, price: 18000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Spa', 'Yoga', 'River View'], description: 'Luxury resort on the banks of the Ganges.' },
            { id: 3, name: 'Divine Resort', type: 'resort', rating: 4.5, reviews: 1123, price: 8000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Pool', 'Yoga', 'Restaurant', 'Rafting'], description: 'Comfortable resort with adventure activities.' },
            { id: 4, name: 'Yoga Ashram Stay', type: 'homestay', rating: 4.6, reviews: 890, price: 2500, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Yoga', 'Meditation', 'Meals', 'Classes'], description: 'Authentic ashram experience with daily yoga.' },
            { id: 5, name: 'Ganga View Cottage', type: 'homestay', rating: 4.4, reviews: 567, price: 3500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['River View', 'WiFi', 'Breakfast', 'Terrace'], description: 'Peaceful cottage overlooking the Ganges.' }
        ]
    },
    'udaipur': {
        name: 'Udaipur',
        tagline: 'The City of Lakes',
        image: 'https://plus.unsplash.com/premium_photo-1661964079694-ccfaf7dc8028?q=80&w=1920',
        description: 'Udaipur is a city in the western Indian state of Rajasthan, known for its elaborate royal palaces and romantic lakeside setting.',
        highlights: ['Lake Pichola', 'City Palace', 'Jag Mandir', 'Sunset Boat Rides'],
        hotels: [
            { id: 1, name: 'Taj Lake Palace', type: 'hotel', rating: 4.9, reviews: 2567, price: 45000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Lake', 'Spa', 'Restaurant', 'Boat'], description: 'Floating palace on Lake Pichola - a dream destination.' },
            { id: 2, name: 'The Oberoi Udaivilas', type: 'resort', rating: 4.9, reviews: 2340, price: 40000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Spa', 'Lake View', 'Gardens'], description: 'Palatial resort with semi-private pools.' },
            { id: 3, name: 'Leela Palace Udaipur', type: 'hotel', rating: 4.8, reviews: 1890, price: 32000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Lake View'], description: 'Luxury palace hotel on the lake shore.' },
            { id: 4, name: 'Fateh Prakash Palace', type: 'hotel', rating: 4.6, reviews: 1234, price: 15000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Heritage', 'Restaurant', 'Lake View', 'Bar'], description: 'Heritage hotel within the City Palace complex.' },
            { id: 5, name: 'Lake Pichola Haveli', type: 'homestay', rating: 4.5, reviews: 678, price: 5000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Rooftop', 'Lake View', 'WiFi', 'Breakfast'], description: 'Charming haveli with rooftop lake views.' }
        ]
    },
    'mysore-palace': {
        name: 'Mysore',
        tagline: 'The City of Palaces',
        image: 'https://images.unsplash.com/photo-1659126574791-13313aa424bd?q=80&w=1920',
        description: 'Mysore is a city in the southern Indian state of Karnataka, known for the opulent Mysore Palace and as the center of traditional Indian art and culture.',
        highlights: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens', 'Mysore Silk'],
        hotels: [
            { id: 1, name: 'Radisson Blu Plaza Mysore', type: 'hotel', rating: 4.6, reviews: 1567, price: 8500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], description: 'Modern luxury hotel in the heart of Mysore.' },
            { id: 2, name: 'Royal Orchid Metropole', type: 'hotel', rating: 4.5, reviews: 1234, price: 7000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Heritage', 'Restaurant', 'Bar'], description: 'Heritage hotel with colonial charm.' },
            { id: 3, name: 'Lalitha Mahal Palace', type: 'hotel', rating: 4.7, reviews: 1890, price: 12000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Palace', 'Pool', 'Restaurant', 'Gardens'], description: 'Former royal guesthouse, now a heritage hotel.' },
            { id: 4, name: 'Fortune JP Palace', type: 'hotel', rating: 4.3, reviews: 890, price: 5500, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Pool', 'Restaurant', 'WiFi', 'Gym'], description: 'Comfortable business hotel with good amenities.' },
            { id: 5, name: 'Mysore Heritage Homestay', type: 'homestay', rating: 4.4, reviews: 456, price: 3000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Breakfast', 'WiFi', 'AC', 'Local Tips'], description: 'Experience authentic Mysorean hospitality.' }
        ]
    },
    'nagaland': {
        name: 'Nagaland',
        tagline: 'The Land of Festivals',
        image: 'https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?q=80&w=1920',
        description: 'Nagaland is a state in northeastern India, known for its 16 distinct Naga tribes, vibrant traditions, and the famous Hornbill Festival celebrating tribal culture.',
        highlights: ['Hornbill Festival', 'Tribal Villages', 'Dzukou Valley', 'Local Cuisine'],
        hotels: [
            { id: 1, name: 'The Vivor Hotel', type: 'hotel', rating: 4.4, reviews: 567, price: 6000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', amenities: ['Restaurant', 'WiFi', 'Conference', 'Bar'], description: 'Premium hotel in Kohima with modern amenities.' },
            { id: 2, name: 'Niathu Resort', type: 'resort', rating: 4.5, reviews: 890, price: 8000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600', amenities: ['Pool', 'Restaurant', 'Mountain View', 'Garden'], description: 'Scenic resort with stunning valley views.' },
            { id: 3, name: 'Hotel Japfu', type: 'hotel', rating: 4.2, reviews: 456, price: 4500, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', amenities: ['Restaurant', 'WiFi', 'Parking', 'Room Service'], description: 'Centrally located hotel in Kohima.' },
            { id: 4, name: 'Tribal Homestay Khonoma', type: 'homestay', rating: 4.7, reviews: 234, price: 2500, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', amenities: ['Meals', 'Cultural Tour', 'Trekking', 'Guide'], description: 'Stay with a Naga family in the first green village of India.' },
            { id: 5, name: 'Dzukou Valley Camp', type: 'homestay', rating: 4.6, reviews: 345, price: 3000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600', amenities: ['Camping', 'Trekking', 'Meals', 'Guide'], description: 'Adventure camping near the beautiful Dzukou Valley.' }
        ]
    }
};

// State
let currentDestination = null;
let currentHotel = null;
let filteredHotels = [];

/**
 * Initialize destination page
 */
function initDestinationPage() {
    loadDestination();
    initFilters();
    initModal();
    autoOpenBookingFromQuery();
}

/**
 * Load destination from URL parameter
 */
function loadDestination() {
    const params = new URLSearchParams(window.location.search);
    const destinationSlug = params.get('place');

    if (!destinationSlug || !destinationsData[destinationSlug]) {
        // Redirect to home if invalid destination
        window.location.href = 'index.html';
        return;
    }

    currentDestination = destinationsData[destinationSlug];
    filteredHotels = [...currentDestination.hotels];
    
    renderDestination();
    renderHotels();
}

/**
 * Render destination details
 */
function renderDestination() {
    // Update page title
    document.title = `ZENDESI - ${currentDestination.name}`;
    
    // Hero section
    const hero = document.getElementById('destination-hero');
    hero.style.backgroundImage = `url(${currentDestination.image})`;
    
    document.getElementById('destination-name').textContent = currentDestination.name;
    document.getElementById('destination-tagline').textContent = currentDestination.tagline;
    
    // Stats
    document.getElementById('hotel-count').textContent = currentDestination.hotels.length;
    const avgRating = (currentDestination.hotels.reduce((sum, h) => sum + h.rating, 0) / currentDestination.hotels.length).toFixed(1);
    document.getElementById('avg-rating').textContent = avgRating;
    const prices = currentDestination.hotels.map(h => h.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    document.getElementById('starting-price').textContent = `₹${minPrice.toLocaleString()}`;
    const rangeEl = document.getElementById('price-range');
    if (rangeEl) {
        rangeEl.textContent = `₹${minPrice.toLocaleString()} – ₹${maxPrice.toLocaleString()}`;
    }
    
    // About section
    document.getElementById('destination-description').textContent = currentDestination.description;
    
    // Highlights
    const highlightsContainer = document.getElementById('highlights-container');
    highlightsContainer.innerHTML = currentDestination.highlights.map(h => 
        `<span class="highlight-tag">${h}</span>`
    ).join('');
}

/**
 * Render hotels grid
 */
function renderHotels() {
    const grid = document.getElementById('hotels-grid');
    
    if (filteredHotels.length === 0) {
        grid.innerHTML = '<p class="no-results">No hotels match your filters. Try adjusting your criteria.</p>';
        return;
    }
    
    grid.innerHTML = filteredHotels.map((hotel, index) => `
        <article class="hotel-card" data-hotel-id="${hotel.id}" style="animation-delay: ${index * 0.1}s">
            <div class="hotel-image">
                <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
                <span class="hotel-type">${hotel.type}</span>
                <button class="wishlist-btn" aria-label="Add to wishlist">♡</button>
            </div>
            <div class="hotel-content">
                <div class="hotel-header">
                    <h3>${hotel.name}</h3>
                    <div class="hotel-rating">
                        <span class="stars">${getStars(hotel.rating)}</span>
                        <span class="rating-value">${hotel.rating}</span>
                        <span class="reviews">(${hotel.reviews.toLocaleString()} reviews)</span>
                    </div>
                </div>
                <p class="hotel-description">${hotel.description}</p>
                <div class="hotel-amenities">
                    ${hotel.amenities.slice(0, 4).map(a => `<span class="amenity">${a}</span>`).join('')}
                </div>
                <div class="hotel-footer">
                    <div class="hotel-price">
                        <span class="price-value">₹${hotel.price.toLocaleString()}</span>
                        <span class="price-unit">per night</span>
                    </div>
                    <button class="book-btn" data-hotel-id="${hotel.id}">Book Now</button>
                </div>
            </div>
        </article>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const hotelId = parseInt(e.target.dataset.hotelId);
            openBookingModal(hotelId);
        });
    });
    
    // Wishlist handlers
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
        });
    });
}

/**
 * Generate star rating display
 */
function getStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '½';
    stars += '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
    return stars;
}

/**
 * Initialize filters
 */
function initFilters() {
    const sortFilter = document.getElementById('sort-filter');
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    
    [sortFilter, typeFilter, priceFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Apply default sort/filter once on load
    applyFilters();
}

function applyFilters() {
    const sortBy = document.getElementById('sort-filter').value;
    const type = document.getElementById('type-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    
    // Start with all hotels
    filteredHotels = [...currentDestination.hotels];
    
    // Filter by type
    if (type !== 'all') {
        filteredHotels = filteredHotels.filter(h => h.type === type);
    }
    
    // Filter by price
    switch (priceRange) {
        case 'budget':
            filteredHotels = filteredHotels.filter(h => h.price < 3000);
            break;
        case 'mid':
            filteredHotels = filteredHotels.filter(h => h.price >= 3000 && h.price < 8000);
            break;
        case 'premium':
            filteredHotels = filteredHotels.filter(h => h.price >= 8000 && h.price < 15000);
            break;
        case 'luxury':
            filteredHotels = filteredHotels.filter(h => h.price >= 15000);
            break;
    }
    
    // Sort
    switch (sortBy) {
        case 'price-low':
            filteredHotels.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredHotels.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredHotels.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    renderHotels();
}

/**
 * Modal functionality
 */
function initModal() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('modal-close');
    const bookingForm = document.getElementById('booking-form');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;
    checkoutInput.min = today;
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Update summary on date change
    checkinInput.addEventListener('change', updateBookingSummary);
    checkoutInput.addEventListener('change', updateBookingSummary);
    document.getElementById('rooms').addEventListener('change', updateBookingSummary);
    
    // Form submission
    bookingForm.addEventListener('submit', handleBookingSubmit);
}

function openBookingModal(hotelId) {
    // Check if user is logged in
    const token = localStorage.getItem('zendesi_token');
    if (!token) {
        // Redirect to auth with return URL
        const redirectUrl = new URL(window.location.href);
        redirectUrl.searchParams.set('hotel', String(hotelId));
        window.location.href = `auth.html?redirect=${encodeURIComponent(redirectUrl.toString())}`;
        return;
    }
    
    currentHotel = currentDestination.hotels.find(h => h.id === hotelId);
    if (!currentHotel) return;
    
    document.getElementById('modal-hotel-name').textContent = currentHotel.name;
    document.getElementById('modal-price').textContent = `₹${currentHotel.price.toLocaleString()}`;
    
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    document.getElementById('checkin').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('checkout').value = dayAfter.toISOString().split('T')[0];
    
    updateBookingSummary();
    
    const modal = document.getElementById('booking-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function autoOpenBookingFromQuery() {
    const token = localStorage.getItem('zendesi_token');
    if (!token) return;

    const params = new URLSearchParams(window.location.search);
    const hotelParam = params.get('hotel');
    if (!hotelParam) return;

    const hotelId = parseInt(hotelParam, 10);
    if (!Number.isFinite(hotelId)) return;

    // Clean URL for nicer sharing after we use it
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('hotel');
    window.history.replaceState({}, '', cleanUrl.toString());

    // Give the modal init a moment to attach listeners
    setTimeout(() => {
        openBookingModal(hotelId);
    }, 150);
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateBookingSummary() {
    if (!currentHotel) return;
    
    const checkin = new Date(document.getElementById('checkin').value);
    const checkout = new Date(document.getElementById('checkout').value);
    const rooms = parseInt(document.getElementById('rooms').value);
    
    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) return;
    
    const nights = Math.max(1, Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)));
    const subtotal = currentHotel.price * nights * rooms;
    const taxes = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + taxes;
    
    document.getElementById('modal-nights').textContent = `${nights} night${nights > 1 ? 's' : ''}`;
    document.getElementById('modal-taxes').textContent = `₹${taxes.toLocaleString()}`;
    document.getElementById('modal-total').textContent = `₹${total.toLocaleString()}`;
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const rooms = document.getElementById('rooms').value;
    
    // Calculate total
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const nights = Math.max(1, Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)));
    const subtotal = currentHotel.price * nights * parseInt(rooms);
    const taxes = Math.round(subtotal * 0.18);
    const total = subtotal + taxes;
    
    // Save booking details to session storage
    const bookingDetails = {
        hotel: currentHotel,
        destination: currentDestination.name,
        checkin,
        checkout,
        nights,
        guests,
        rooms,
        subtotal,
        taxes,
        total
    };
    
    sessionStorage.setItem('zendesi_booking', JSON.stringify(bookingDetails));
    
    // Redirect to payment page
    window.location.href = 'payment.html';
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDestinationPage);
} else {
    initDestinationPage();
}
