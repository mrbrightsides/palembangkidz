
import { CultureItem } from './types';

export const VOICE_AVATARS = {
  Kore: {
    name: 'Kore',
    role: 'Cheerful Guide',
    img: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Kore&backgroundColor=ffc300'
  },
  Puck: {
    name: 'Puck',
    role: 'Fun Explorer',
    img: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Puck&backgroundColor=9d4edd'
  },
  Zephyr: {
    name: 'Zephyr',
    role: 'Wise Sage',
    img: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Zephyr&backgroundColor=48cae4'
  }
};

export const CULTURE_DATA: CultureItem[] = [
  {
    id: 'ampera',
    difficulty: 'Easy',
    title: { id: 'Jembatan Ampera', en: 'Ampera Bridge', plm: 'Jembatan Ampera' },
    pronunciation: { id: 'Am-pe-ra', en: 'Am-peh-rah', plm: 'Am-pe-rah' },
    description: {
      id: 'Ikon kota Palembang yang megah di atas Sungai Musi.',
      en: 'The majestic icon of Palembang city spanning across the Musi River.',
      plm: 'Jembatan paling besak di Palembang.'
    },
    funFact: {
      id: 'Dulu bagian tengah Jembatan Ampera bisa terangkat agar kapal besar bisa lewat!',
      en: 'Originally, the center of Ampera Bridge could be raised to let large ships pass!',
      plm: 'Dulu jembatan iko pacak teangkat tengahnyo, biar kapal besak pacak liwat.'
    },
    imageUrl: 'https://bams.jambiprov.go.id/wp-content/uploads/2023/10/Jembatan-Ampera-1.png',
    videoUrl: 'https://github.com/user-attachments/assets/ec2cfd0f-dd8d-4cb8-83cf-f6cb9a0ecfe1',
    voiceoverScript: { id: 'Lihat jembatan merah ini!', en: 'Look at this red bridge!', plm: 'Cubo jingok jembatan abang iko!' },
    quiz: [
      { question: 'Apa warna Jembatan Ampera?', options: ['Biru', 'Hijau', 'Merah', 'Kuning'], correctIndex: 2 },
      { question: 'Di atas sungai apa jembatan ini berada?', options: ['Sungai Nil', 'Sungai Musi', 'Sungai Amazon', 'Sungai Kapuas'], correctIndex: 1 },
      { question: 'Apa yang spesial dari jembatan ini dulu?', options: ['Bisa terbang', 'Bisa terangkat tengahnya', 'Bisa menyelam', 'Bisa bicara'], correctIndex: 1 }
    ],
    mapPos: { x: 50, y: 50 }
  },
  {
    id: 'bkb',
    difficulty: 'Medium',
    title: { id: 'Benteng Kuto Besak', en: 'Kuto Besak Fort', plm: 'Benteng Kuto Besak' },
    pronunciation: { id: 'Ben-teng Ku-to Be-sak', en: 'Ben-teng Koo-toh Beh-sack', plm: 'Ben-teng Ku-to Be-sak' },
    description: { id: 'Benteng pertahanan bersejarah di tepi Sungai Musi.', en: 'Historic fort on the banks of Musi River.', plm: 'Benteng kito deket sungai Musi, tempat nongkrong seru.' },
    funFact: {
      id: 'Benteng ini dibangun menggunakan bahan campuran putih telur sebagai perekat batunya!',
      en: 'This fort was built using a mixture containing egg whites as an adhesive for the stones!',
      plm: 'Benteng iko dulu dibuat nempelke batunyo pake putih telok, kuat nian kan?'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: { id: 'Ayo jalan-jalan ke Benteng Kuto Besak!', en: 'Let\'s visit Kuto Besak Fort!', plm: 'Payo bejalan ke BKB sore-sore!' },
    quiz: [
      { question: 'BKB adalah singkatan dari?', options: ['Benteng Kuto Besak', 'Batu Kuat Banget', 'Bermain Ke Bukit', 'Banyak Kapal Besar'], correctIndex: 0 },
      { question: 'Apa bahan rahasia perekat batunya?', options: ['Lem Super', 'Semen Ajaib', 'Putih Telur', 'Madu'], correctIndex: 2 },
      { question: 'Benteng ini berada di tepi sungai apa?', options: ['Sungai Ogan', 'Sungai Musi', 'Sungai Komering', 'Sungai Lematang'], correctIndex: 1 }
    ],
    mapPos: { x: 42, y: 48 }
  },
  {
    id: 'pulau-kemaro',
    difficulty: 'Hard',
    title: { id: 'Pulau Kemaro', en: 'Kemaro Island', plm: 'Pulo Kemaro' },
    pronunciation: { id: 'Pu-lau Ke-ma-ro', en: 'Poo-lau Keh-mah-roh', plm: 'Pu-lo Ke-ma-ro' },
    description: {
      id: 'Pulau legendaris di tengah Sungai Musi dengan kisah cinta abadi Putri Siti Fatimah.',
      en: 'A legendary island in the Musi River with the eternal love story of Princess Siti Fatimah.',
      plm: 'Pulo legendaris di tengah sungi Musi, ado cerito cinto abadi Putri Siti Fatimah.'
    },
    funFact: {
      id: 'Ada "Pohon Cinta" di sana, konon jika pasangan menulis nama mereka, cinta mereka akan abadi!',
      en: 'There is a "Tree of Love" there; legend says if couples write their names, their love lasts forever!',
      plm: 'Ado "Pohon Cinto" disano, katenyo kalo nulis namo bareng pasangan pacak abadi cintonyo.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a594?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Selamat datang di Pulau Kemaro, tempat legenda cinta yang sangat indah.',
      en: 'Welcome to Kemaro Island, the place of a beautiful love legend.',
      plm: 'Payo kito ke Pulo Kemaro, tempat cerito cinto yang elok nian.'
    },
    quiz: [
      { question: 'Apa nama pohon yang terkenal di sini?', options: ['Pohon Kelapa', 'Pohon Cinta', 'Pohon Pisang', 'Pohon Mangga'], correctIndex: 1 },
      { question: 'Pulau Kemaro terletak di tengah?', options: ['Laut Jawa', 'Sungai Musi', 'Danau Ranau', 'Hutan Belantara'], correctIndex: 1 },
      { question: 'Siapa nama putri dalam legenda pulau ini?', options: ['Siti Fatimah', 'Siti Nurbaya', 'Siti Khadijah', 'Siti Aminah'], correctIndex: 0 }
    ],
    mapPos: { x: 75, y: 35 }
  },
  {
    id: 'pempek',
    difficulty: 'Easy',
    title: { id: 'Pempek', en: 'Pempek', plm: 'Pempek' },
    pronunciation: { id: 'Pem-pek', en: 'Pem-peck', plm: 'Pem-pek' },
    description: {
      id: 'Makanan khas dari ikan dan sagu yang disajikan dengan cuko pedas-manis.',
      en: 'A traditional savory fish cake made of fish and sago, served with spicy-sweet vinegar sauce.',
      plm: 'Iwak giling samo sagu yang dimasak, dimakan pake cuko yang mantap nian.'
    },
    funFact: {
      id: 'Dahulu pempek disebut "Kelesan" sebelum populer with name Pempek!',
      en: 'Pempek was originally called "Kelesan" before it became famous as Pempek!',
      plm: 'Dulu nian pempek tu namonyo Kelesan, baru laju dipanggil Pempek pas lamo-lamo.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Halo Adik-adik! Ini adalah Pempek, makanan paling terkenal dari Palembang.',
      en: 'Hello kids! This is Pempek, the most famous food from Palembang.',
      plm: 'Halo budak-budak! Iko namonyo Pempek. Lemak nian rasonyo!'
    },
    quiz: [
      { question: 'Apa bahan utama pempek?', options: ['Ayam', 'Ikan dan Sagu', 'Daging Sapi', 'Sayuran'], correctIndex: 1 },
      { question: 'Apa nama saus hitam pendamping pempek?', options: ['Kecap', 'Cuko', 'Saus Tomat', 'Saus Sambal'], correctIndex: 1 },
      { question: 'Apa nama lama pempek sebelum terkenal?', options: ['Kelesan', 'Kemplang', 'Kerupuk', 'Laksan'], correctIndex: 0 }
    ],
    mapPos: { x: 30, y: 60 }
  },
  {
    id: 'sriwijaya',
    difficulty: 'Hard',
    title: { id: 'Kerajaan Sriwijaya', en: 'Srivijaya Kingdom', plm: 'Kerajaan Sriwijaya' },
    pronunciation: { id: 'Sri-wi-ja-ya', en: 'Sree-wee-jah-yah', plm: 'Sri-wi-ja-yo' },
    description: { id: 'Kerajaan maritim terbesar di Asia Tenggara.', en: 'Largest maritime empire in Southeast Asia.', plm: 'Kerajaan paling hebat jaman dulu.' },
    funFact: {
      id: 'Nama "Sriwijaya" berasal dari bahasa Sansekerta yang berarti "Kemenangan yang Gemilang".',
      en: 'The name "Srivijaya" comes from Sanskrit, meaning "Glorious Victory".',
      plm: 'Sriwijaya tu artinyo menang yang mantap nian, dari bahasa Sansekerta.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1605649424824-479304443913?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: { id: 'Dahulu kala, Palembang adalah pusat Kerajaan Sriwijaya.', en: 'Long ago, Palembang was the center of Srivijaya.', plm: 'Dulu nian, Palembang iko pusat maritim.' },
    quiz: [
      { question: 'Sriwijaya adalah kerajaan?', options: ['Gurun', 'Maritim/Laut', 'Hutan', 'Pegunungan'], correctIndex: 1 },
      { question: 'Apa arti kata Sriwijaya?', options: ['Ikan Besar', 'Bunga Cantik', 'Kemenangan Gemilang', 'Raja yang Baik'], correctIndex: 2 },
      { question: 'Di mana pusat Kerajaan Sriwijaya?', options: ['Jakarta', 'Palembang', 'Medan', 'Surabaya'], correctIndex: 1 }
    ],
    mapPos: { x: 20, y: 30 }
  },
  {
    id: 'quran-akbar',
    difficulty: 'Medium',
    title: { id: 'Al-Quran Al-Akbar', en: 'Giant Quran', plm: 'Al-Quran Al-Akbar' },
    pronunciation: { id: 'Al-Qur-an Al-Ak-bar', en: 'Ahl-Qoor-ahn Ahl Ack-bar', plm: 'Al-Qur-an Al-Ak-bar' },
    description: { id: 'Al-Quran raksasa yang diukir indah pada kayu.', en: 'Giant Quran beautifully carved on wood.', plm: 'Al-Quran besak nian diukir di kayu.' },
    funFact: {
      id: 'Ini adalah Al-Quran ukiran kayu terbesar di dunia dengan tinggi mencapai 15 meter!',
      en: 'This is the largest wood-carved Quran in the world, standing at 15 meters high!',
      plm: 'Quran iko paling besak di dunio yang dari kayu, tingginyo 15 meter.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: { id: 'Indah sekali ukiran ayat suci ini.', en: 'These holy carvings are so beautiful.', plm: 'Subhanallah, besak nian ayat-ayat Quran iko.' },
    quiz: [
      { question: 'Terbuat dari bahan apa Quran ini?', options: ['Batu', 'Kayu', 'Besi', 'Plastik'], correctIndex: 1 },
      { question: 'Berapa tinggi Quran raksasa ini?', options: ['5 meter', '10 meter', '15 meter', '20 meter'], correctIndex: 2 },
      { question: 'Quran ini adalah yang terbesar di?', options: ['Asia', 'Eropa', 'Dunia', 'Indonesia saja'], correctIndex: 2 }
    ],
    mapPos: { x: 85, y: 65 }
  },
  {
    id: 'history-stories',
    difficulty: 'Easy',
    title: { id: 'Cerita Sejarah', en: 'History Stories', plm: 'Cerito Lamo' },
    pronunciation: { id: 'Se-ja-rah', en: 'Seh-jah-rah', plm: 'Se-ja-rah' },
    description: {
      id: 'Kisah-kisah hebat tentang keberanian orang Palembang di masa lalu.',
      en: 'Great stories about the bravery of Palembang people in the past.',
      plm: 'Cerito hebat wong Palembang jaman dulu.'
    },
    funFact: {
      id: 'Palembang adalah salah satu kota tertua di Indonesia, lho!',
      en: 'Palembang is one of the oldest cities in Indonesia!',
      plm: 'Palembang iko salah satu koto paling tuo di Indonesia!'
    },
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Ayo dengarkan cerita seru tentang sejarah kota kita!',
      en: 'Let\'s listen to an exciting story about our city\'s history!',
      plm: 'Payo kito dengerke cerito seru tentang koto kito dulu.'
    },
    quiz: [
      { question: 'Palembang adalah salah satu kota tertua di?', options: ['Dunia', 'Indonesia', 'Mars', 'Eropa'], correctIndex: 1 },
      { question: 'Siapa yang memimpin kerajaan maritim dulu?', options: ['Bajak Laut', 'Raja Sriwijaya', 'Superman', 'Astronot'], correctIndex: 1 },
      { question: 'Sungai apa yang menjadi jalur sejarah utama?', options: ['Sungai Musi', 'Sungai Nil', 'Sungai Solo', 'Sungai Kapuas'], correctIndex: 0 }
    ],
    mapPos: { x: 12, y: 72 }
  },
  {
    id: 'rumah-limas',
    difficulty: 'Medium',
    title: { id: 'Rumah Limas', en: 'Limas House', plm: 'Rumah Limas' },
    pronunciation: { id: 'Li-mas', en: 'Lee-mas', plm: 'Li-mas' },
    description: {
      id: 'Rumah tradisional Palembang yang unik dengan atap berbentuk limas dan lantai bertingkat.',
      en: 'Unique Palembang traditional house with a pyramid-shaped roof and tiered floors.',
      plm: 'Rumah adat kito yang atapnyo cak limas, lantainyo ado tingkat-tingkat.'
    },
    funFact: {
      id: 'Rumah Limas pernah menghiasi uang kertas sepuluh ribu rupiah, lho!',
      en: 'Limas House was once featured on the ten thousand rupiah banknote!',
      plm: 'Rumah Limas iko pernah ado di duet sepuluh ribu, tau dak kau?'
    },
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Ini adalah Rumah Limas, tempat tinggal bangsawan Palembang zaman dahulu.',
      en: 'This is Limas House, where Palembang nobles used to live long ago.',
      plm: 'Iko namonyo Rumah Limas, tempat wong kayo jaman dulu tinggal.'
    },
    quiz: [
      { question: 'Apa bentuk atap rumah ini?', options: ['Datar', 'Limas/Piramida', 'Bulat', 'Miring'], correctIndex: 1 },
      { question: 'Di uang kertas berapa gambar rumah ini pernah ada?', options: ['Rp 1.000', 'Rp 5.000', 'Rp 10.000', 'Rp 50.000'], correctIndex: 2 },
      { question: 'Kenapa lantainya bertingkat?', options: ['Biar keren', 'Status sosial pemilik', 'Biar gak kena banjir saja', 'Buat main petak umpet'], correctIndex: 1 }
    ],
    mapPos: { x: 35, y: 25 }
  },
  {
    id: 'songket',
    difficulty: 'Hard',
    title: { id: 'Kain Songket', en: 'Songket Fabric', plm: 'Songket' },
    pronunciation: { id: 'Song-ket', en: 'Song-ket', plm: 'Song-ket' },
    description: {
      id: 'Kain tenun mewah dengan benang emas yang ditenun dengan tangan.',
      en: 'Luxury hand-woven fabric with gold threads, often called the Queen of Fabrics.',
      plm: 'Kain tenun yang pake benang emas, elok nian dipakenyo.'
    },
    funFact: {
      id: 'Satu helai kain Songket butuh waktu berbulan-bulan untuk ditenun karena sangat sulit!',
      en: 'One piece of Songket can take months to weave because it is so difficult!',
      plm: 'Nenun Songket iko lamo nian, pacak berbulan-bulan baru jadi sebuting.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574531200171-89309c0631c1?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Wah, lihatlah kilauan emas pada kain Songket yang indah ini!',
      en: 'Wow, look at the golden sparkle on this beautiful Songket fabric!',
      plm: 'Cubo jingok, bekilau nian benang emas di Songket iko!'
    },
    quiz: [
      { question: 'Benang apa yang digunakan pada Songket mewah?', options: ['Benang Plastik', 'Benang Emas', 'Benang Kayu', 'Benang Karet'], correctIndex: 1 },
      { question: 'Berapa lama biasanya menenun satu kain Songket?', options: ['1 hari', '1 minggu', 'Berbulan-bulan', '1 jam'], correctIndex: 2 },
      { question: 'Apa julukan kain Songket?', options: ['Raja Kain', 'Ratu Segala Kain', 'Kain Biasa', 'Kain Tidur'], correctIndex: 1 }
    ],
    mapPos: { x: 60, y: 75 }
  },
  {
    id: 'tari-tanggai',
    difficulty: 'Medium',
    title: { id: 'Tari Tanggai', en: 'Tanggai Dance', plm: 'Tari Tanggai' },
    pronunciation: { id: 'Tang-gai', en: 'Tang-guy', plm: 'Tang-gai' },
    description: {
      id: 'Tarian selamat datang untuk menyambut tamu agung dengan kuku-kuku panjang berwarna emas.',
      en: 'A welcoming dance for honored guests featuring golden long-nail accessories.',
      plm: 'Tarian kito buat nyambut tamu, penarinyo pake kuku panjang abang-emas.'
    },
    funFact: {
      id: 'Nama "Tanggai" diambil dari nama aksesori kuku panjang yang dipakai penarinya!',
      en: 'The name "Tanggai" is taken from the long-nail accessory worn by the dancers!',
      plm: 'Namonyo Tari Tanggai karno penarinyo pake Tanggai, kuku panjang yang mengkilap.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1620211110006-21a41764667d?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Ayo belajar menari Tanggai untuk menyambut tamu spesial kita!',
      en: 'Let\'s learn the Tanggai dance to welcome our special guests!',
      plm: 'Payo kito belajau nari Tanggai, biar pacak nyambut tamu kito.'
    },
    quiz: [
      { question: 'Apa nama aksesori kuku panjang penarinya?', options: ['Kuku Macan', 'Tanggai', 'Cincin', 'Gelang'], correctIndex: 1 },
      { question: 'Tarian ini digunakan untuk?', options: ['Menyambut tamu', 'Mengusir nyamuk', 'Latihan olahraga', 'Main bola'], correctIndex: 0 },
      { question: 'Apa warna kuku Tanggai biasanya?', options: ['Hitam', 'Putih', 'Emas/Kuning', 'Biru'], correctIndex: 2 }
    ],
    mapPos: { x: 15, y: 45 }
  },
  {
    id: 'ikan-belido',
    difficulty: 'Easy',
    title: { id: 'Ikan Belido', en: 'Belido Fish', plm: 'Iwak Belido' },
    pronunciation: { id: 'Be-li-do', en: 'Be-lee-doh', plm: 'Be-li-do' },
    description: {
      id: 'Ikan khas Sungai Musi yang menjadi bahan utama pempek zaman dahulu.',
      en: 'The iconic fish of Musi River that was the original main ingredient for Pempek.',
      plm: 'Iwak asli Musi yang dulu nian dipake buat buat pempek.'
    },
    funFact: {
      id: 'Sekarang Ikan Belido sangat langka, jadi kita harus menjaga kebersihan sungai kita!',
      en: 'Now Belido fish is very rare, so we must keep our river clean!',
      plm: 'Iwak Belido iko sekarang lah dikit nian, mangkonyo kito jangan buang sampah di sungai.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Halo! Kenalkan, ini Ikan Belido, si ikan hebat penghuni Sungai Musi.',
      en: 'Hello! Meet Belido Fish, the amazing resident of the Musi River.',
      plm: 'Halo budak-budak! Iko namonyo Iwak Belido, penghuni sungai Musi.'
    },
    quiz: [
      { question: 'Di mana Ikan Belido tinggal?', options: ['Laut', 'Sawah', 'Sungai Musi', 'Hutan'], correctIndex: 2 },
      { question: 'Ikan ini adalah bahan asli pembuatan apa?', options: ['Roti', 'Pempek', 'Nasi Goreng', 'Pizza'], correctIndex: 1 },
      { question: 'Kenapa kita harus menjaga kebersihan sungai?', options: ['Biar airnya enak diminum saja', 'Agar Ikan Belido tidak punah', 'Biar kapal bisa lewat', 'Gak ada alasan'], correctIndex: 1 }
    ],
    mapPos: { x: 80, y: 20 }
  },
  {
    id: 'mie-celor',
    difficulty: 'Easy',
    title: { id: 'Mie Celor', en: 'Mie Celor', plm: 'Mie Celor' },
    pronunciation: { id: 'Mie Ce-lor', en: 'Mee Che-lor', plm: 'Mie Ce-lor' },
    description: {
      id: 'Mie lezat dengan kuah santan kental and kaldu udang yang sangat gurih.',
      en: 'Delicious noodles with thick coconut milk gravy and savory shrimp broth.',
      plm: 'Mie pake kuah udang santan yang kental nian, lemak nian rasonyo.'
    },
    funFact: {
      id: 'Mie Celor biasanya dimakan untuk sarapan supaya kita semangat beraktivitas!',
      en: 'Mie Celor is usually eaten for breakfast to give us energy for the day!',
      plm: 'Mie Celor iko biasonyo dimakan pas sarapan biar semangat belajau.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Ayo sarapan Mie Celor! Kuahnya kental dan penuh rasa udang.',
      en: 'Let\'s have Mie Celor for breakfast! The broth is thick and full of shrimp flavor.',
      plm: 'Payo sarapan Mie Celor, kuah udangnyo mantap nian budak!'
    },
    quiz: [
      { question: 'Apa rasa utama kuah Mie Celor?', options: ['Ayam', 'Udang', 'Keju', 'Sapi'], correctIndex: 1 },
      { question: 'Kapan waktu favorit orang Palembang makan Mie Celor?', options: ['Malam hari', 'Tengah malam', 'Sarapan pagi', 'Waktu tidur'], correctIndex: 2 },
      { question: 'Tekstur kuah Mie Celor adalah?', options: ['Cair seperti air', 'Kental bersantan', 'Kering', 'Berminyak saja'], correctIndex: 1 }
    ],
    mapPos: { x: 25, y: 85 }
  },
  {
    id: 'masjid-agung',
    difficulty: 'Medium',
    title: { id: 'Masjid Agung Palembang', en: 'Great Mosque of Palembang', plm: 'Masjid Agung' },
    pronunciation: { id: 'Ah-gung', en: 'Ah-goong', plm: 'Ah-gung' },
    description: {
      id: 'Masjid tertua dan terbesar di Palembang dengan arsitektur yang sangat indah.',
      en: 'The oldest and largest mosque in Palembang with stunning unique architecture.',
      plm: 'Masjid paling lamo dan paling besak di Palembang, elok nian bentuknyo.'
    },
    funFact: {
      id: 'Masjid Agung punya menara unik yang bentuknya mirip bangunan di negeri Tiongkok!',
      en: 'The Great Mosque has a unique minaret that looks like buildings in China!',
      plm: 'Masjid Agung iko menaronyo cak bangunan Tiongkok, beda nian kan?'
    },
    imageUrl: 'https://awsimages.detik.net.id/community/media/visual/2024/06/14/masjid-agung-palembang_169.jpeg?w=1200',
    videoUrl: 'https://github.com/user-attachments/assets/a6b9b940-4d0a-409d-bd17-6f7c7b351167',
    voiceoverScript: {
      id: 'Lihatlah Masjid Agung yang megah ini, pusat sejarah kota kita.',
      en: 'Look at this majestic Great Mosque, the historical center of our city.',
      plm: 'Jingoklah Masjid Agung iko, besak nian dan bersejarah.'
    },
    quiz: [
      { question: 'Masjid Agung adalah masjid yang?', options: ['Terbaru', 'Terbesar dan Tertua di Palembang', 'Hanya ada di pinggir hutan', 'Berwarna ungu'], correctIndex: 1 },
      { question: 'Menaranya mirip bangunan dari negara mana?', options: ['Tiongkok', 'Inggris', 'Amerika', 'Mesir'], correctIndex: 0 },
      { question: 'Arsitektur masjid ini mencampurkan gaya?', options: ['Nusantara, Eropa, Tiongkok', 'Modern saja', 'Lego', 'Minecraft'], correctIndex: 0 }
    ],
    mapPos: { x: 45, y: 40 }
  },
  {
    id: 'perahu-bidar',
    difficulty: 'Hard',
    title: { id: 'Perahu Bidar', en: 'Bidar Boat', plm: 'Perahu Bidar' },
    pronunciation: { id: 'Bi-dar', en: 'Bee-dar', plm: 'Bi-dar' },
    description: {
      id: 'Lomba perahu tradisional yang sangat seru dan cepat di Sungai Musi.',
      en: 'An exciting and fast traditional boat racing competition on the Musi River.',
      plm: 'Lomba perahu di sungai Musi, laju nian jalannyo, seru nian ditonton.'
    },
    funFact: {
      id: 'Satu perahu Bidar bisa dinaiki sampai 50 orang pendayung yang kompak!',
      en: 'One Bidar boat can hold up to 50 rowers working together!',
      plm: 'Sebuting perahu Bidar iko pacak dimuat 50 wong yang kompak ngayun dayung.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1540560416410-d02316e2978d?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Ayo semangat! Perahu Bidar meluncur cepat di atas air Sungai Musi.',
      en: 'Go go go! The Bidar boat glides fast over the Musi River water.',
      plm: 'Payo semangat! Perahu Bidar laju nian di pucuk sungai Musi.'
    },
    quiz: [
      { question: 'Berapa jumlah pendayung maksimal satu perahu Bidar?', options: ['5 orang', '10 orang', '50 orang', '100 orang'], correctIndex: 2 },
      { question: 'Lomba ini diadakan di?', options: ['Kolam Renang', 'Sungai Musi', 'Laut Lepas', 'Gunung'], correctIndex: 1 },
      { question: 'Pendayung perahu Bidar harus?', options: ['Sendiri-sendiri', 'Kompak bersama-sama', 'Sambil tidur', 'Sambil makan'], correctIndex: 1 }
    ],
    mapPos: { x: 55, y: 55 }
  },
  {
    id: 'kemplang',
    difficulty: 'Easy',
    title: { id: 'Kemplang', en: 'Kemplang Crackers', plm: 'Kemplang' },
    pronunciation: { id: 'Kem-plang', en: 'Kem-plahng', plm: 'Kem-plang' },
    description: {
      id: 'Kerupuk ikan khas Palembang yang gurih, biasanya dipanggang atau digoreng.',
      en: 'Savory Palembang fish crackers, usually grilled or fried until crunchy.',
      plm: 'Kerupuk iwak kito yang gurih nian, biasonyo dipanggang atau digoreng.'
    },
    funFact: {
      id: 'Kemplang Tunu dimasak with cara dipanggang di atas bara api, bukan digoreng!',
      en: 'Kemplang Tunu is cooked by grilling over hot coals, not deep-fried!',
      plm: 'Kemplang Tunu tu dipanggang di pucuk baro api, mangkonyo rasonyo beda.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1610450518356-9b0d66c1b351?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Kriuk! Makan Kemplang paling enak pakai sambal terasi pedas.',
      en: 'Crunch! Kemplang tastes best when eaten with spicy chili sauce.',
      plm: 'Kriuk! Makan Kemplang ni mantap nian kalo pake sambal pedes.'
    },
    quiz: [
      { question: 'Kemplang terbuat dari?', options: ['Ikan', 'Buah-buahan', 'Sayuran', 'Kayu'], correctIndex: 0 },
      { question: 'Bagaimana cara memasak Kemplang Tunu?', options: ['Direbus', 'Dipanggang/Dibakar', 'Digoreng', 'Dikukus'], correctIndex: 1 },
      { question: 'Makan kemplang paling enak pakai?', options: ['Es Krim', 'Sambal Terasi', 'Garam saja', 'Air putih'], correctIndex: 1 }
    ],
    mapPos: { x: 70, y: 85 }
  },
  {
    id: 'martabak-har',
    difficulty: 'Medium',
    title: { id: 'Martabak HAR', en: 'HAR Martabak', plm: 'Martabak HAR' },
    pronunciation: { id: 'Har', en: 'Hah-er', plm: 'Har' },
    description: {
      id: 'Martabak telur legendaris yang disajikan dengan kuah kari kentang yang kental.',
      en: 'Legendary egg martabak served with thick savory potato curry sauce.',
      plm: 'Martabak telok legendaris yang dimakan pake kuah kari kentang kental.'
    },
    funFact: {
      id: 'HAR adalah singkatan dari nama pemiliknya, yaitu Haji Abdul Rozak!',
      en: 'HAR stands for the name of its owner, Haji Abdul Rozak!',
      plm: 'HAR tu singkatan namo wong yang punyo, Haji Abdul Rozak!'
    },
    imageUrl: 'https://images.unsplash.com/photo-1616012431267-33671236894d?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Hmm, harumnya kuah kari Martabak HAR ini bikin lapar!',
      en: 'Hmm, the aroma of this HAR Martabak curry makes me hungry!',
      plm: 'Subhanallah, harum nian kuah kari Martabak HAR iko!'
    },
    quiz: [
      { question: 'Apa singkatan dari HAR?', options: ['Hebat Amat Rasanya', 'Haji Abdul Rozak', 'Hari Amat Ramai', 'Hobi Anak Remaja'], correctIndex: 1 },
      { question: 'Kuah apa yang menemani martabak ini?', options: ['Kuah Kari Kentang', 'Kuah Cokelat', 'Kuah Keju', 'Kuah Bakso'], correctIndex: 0 },
      { question: 'Bahan utama martabak ini adalah?', options: ['Telur', 'Buah', 'Permen', 'Sayur sawi'], correctIndex: 0 }
    ],
    mapPos: { x: 38, y: 78 }
  },
  {
    id: 'kampung-arab',
    difficulty: 'Medium',
    title: { id: 'Kampung Arab Al-Munawar', en: 'Al-Munawar Arabic Village', plm: 'Kampung Arab' },
    pronunciation: { id: 'Al Mu-na-war', en: 'Ahl Moo-nah-wahr', plm: 'Al Mu-na-war' },
    description: {
      id: 'Kampung bersejarah di pinggir Sungai Musi dengan rumah-rumah tua yang unik.',
      en: 'Historic village on the Musi River bank with unique century-old houses.',
      plm: 'Kampung kito di pinggir sungai Musi yang rumahnyo lah tuo-tuo nian.'
    },
    funFact: {
      id: 'Banyak rumah di sini usianya sudah lebih dari 200 tahun tapi masih berdiri kokoh!',
      en: 'Many houses here are over 200 years old but still standing strong!',
      plm: 'Rumah disiko lah ado yang 200 tahun umurnyo, tapi masih mantap.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a594?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Ayo berkeliling Kampung Arab dan melihat rumah kuno yang indah!',
      en: 'Let\'s walk around the Arabic Village and see the beautiful ancient houses!',
      plm: 'Payo kito bejalan ke Kampung Arab, jingok rumah lamo yang elok.'
    },
    quiz: [
      { question: 'Berapa usia rumah-rumah tua di sini?', options: ['10 tahun', '50 tahun', 'Lebih dari 200 tahun', '1000 tahun'], correctIndex: 2 },
      { question: 'Kampung ini terletak di pinggir?', options: ['Hutan', 'Sungai Musi', 'Pantai', 'Sawah'], correctIndex: 1 },
      { question: 'Apa nama kampung ini?', options: ['Al-Munawar', 'Al-Azhar', 'Al-Bukhori', 'Al-Islam'], correctIndex: 0 }
    ],
    mapPos: { x: 65, y: 45 }
  },
  {
    id: 'pindang-patin',
    difficulty: 'Hard',
    title: { id: 'Pindang Patin', en: 'Pindang Patin', plm: 'Pindang Patin' },
    pronunciation: { id: 'Pa-tin', en: 'Pah-teen', plm: 'Pa-tin' },
    description: {
      id: 'Sup ikan patin dengan rasa asam, pedas, dan segar yang sangat nikmat.',
      en: 'Patin fish soup with a sour, spicy, and fresh flavor that is so delicious.',
      plm: 'Iwak patin dimasak kuah bening asem-pedes, seger nian rasonyo.'
    },
    funFact: {
      id: 'Rasa asam segarnya biasanya berasal dari irisan buah nanas, lho!',
      en: 'The fresh sour taste usually comes from pineapple slices!',
      plm: 'Raso asem segernyo iko karno dikasih nanas, tau dak kau?'
    },
    imageUrl: 'https://blog.tokowahab.com/wp-content/uploads/2020/06/Resep-Pindang-Ikan-Patin-Khas-Palembang.jpg',
    videoUrl: 'https://github.com/user-attachments/assets/c698ebaa-c7a8-4b6b-b046-a514e3a532dc',
    voiceoverScript: {
      id: 'Segar sekali rasa kuah Pindang Patin ini. Pakai nasi hangat ya!',
      en: 'This Pindang Patin soup is so fresh. Eat it with warm rice!',
      plm: 'Seger nian kuah pindang iko. Makan pake nasi anget payo!'
    },
    quiz: [
      { question: 'Apa jenis ikan yang dimasak pindang ini?', options: ['Lele', 'Patin', 'Hiu', 'Paus'], correctIndex: 1 },
      { question: 'Apa rahasia rasa asam segarnya?', options: ['Jeruk nipis', 'Buah Nanas', 'Cuka apel', 'Asam jawa saja'], correctIndex: 1 },
      { question: 'Pindang Patin paling enak dimakan dengan?', options: ['Nasi hangat', 'Es krim', 'Roti tawar', 'Cokelat'], correctIndex: 0 }
    ],
    mapPos: { x: 22, y: 15 }
  },
  {
    id: 'batik-palembang',
    difficulty: 'Medium',
    title: { id: 'Batik Palembang', en: 'Palembang Batik', plm: 'Batik Palembang' },
    pronunciation: { id: 'Ba-tik', en: 'Bah-teek', plm: 'Ba-tek' },
    description: {
      id: 'Kain batik khas Palembang dengan motif yang terinspirasi dari alam dan bunga.',
      en: 'Palembang traditional batik with motifs inspired by nature and flowers.',
      plm: 'Batik asli Palembang, motifnyo bunga-bunga and warno-warni.'
    },
    funFact: {
      id: 'Batik Palembang sering menggunakan warna-warna cerah seperti merah dan kuning!',
      en: 'Palembang Batik often uses bright colors like red and yellow!',
      plm: 'Batik kito ni biasonyo warno abang samo kuning, cerah nian.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574531200171-89309c0631c1?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Indah sekali ya motif bunga pada Batik Palembang ini!',
      en: 'How beautiful are the flower motifs on this Palembang Batik!',
      plm: 'Elok nian bunga-bunga di batik Palembang iko budak!'
    },
    quiz: [
      { question: 'Warna apa yang sering ada di Batik Palembang?', options: ['Cerah (Merah & Kuning)', 'Gelap (Hitam & Abu)', 'Hanya Putih', 'Hijau saja'], correctIndex: 0 },
      { question: 'Inspirasi motifnya berasal dari?', options: ['Gedung tinggi', 'Alam dan Bunga', 'Mobil balap', 'Robot'], correctIndex: 1 },
      { question: 'Batik Palembang ditenun menggunakan?', options: ['Mesin modern', 'Tangan (Cap/Tulis)', 'Printer', 'Lego'], correctIndex: 1 }
    ],
    mapPos: { x: 82, y: 42 }
  },
  {
    id: 'laksan',
    difficulty: 'Easy',
    title: { id: 'Laksan', en: 'Laksan', plm: 'Laksan' },
    pronunciation: { id: 'Lak-san', en: 'Luck-sahn', plm: 'Lak-san' },
    description: {
      id: 'Irisan pempek lenjer yang disajikan dalam kuah santan merah yang gurih.',
      en: 'Sliced fish cakes served in a rich and savory red coconut milk broth.',
      plm: 'Pempek lenjer yang dipotong-potong, dimakan pake kuah santan abang.'
    },
    funFact: {
      id: 'Meskipun kuahnya berwarna merah, rasa Laksan tidak terlalu pedas untuk anak-anak!',
      en: 'Although the broth is red, Laksan is usually not too spicy for kids!',
      plm: 'Walo kuahnyo abang, tapi dak pedes nian, pas buat kito makan.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    voiceoverScript: {
      id: 'Laksan adalah sarapan favorit di Palembang. Kuahnya gurih sekali!',
      en: 'Laksan is a favorite breakfast in Palembang. The broth is so savory!',
      plm: 'Laksan iko menu sarapan paling lemak budak. Gurih nian!'
    },
    quiz: [
      { question: 'Terbuat dari irisan apakah Laksan?', options: ['Roti', 'Pempek Lenjer', 'Daging Ayam', 'Sosis'], correctIndex: 1 },
      { question: 'Apa warna kuah Laksan?', options: ['Putih', 'Kuning', 'Merah (Santan)', 'Hitam'], correctIndex: 2 },
      { question: 'Laksan biasanya dimakan saat?', options: ['Malam hari', 'Sarapan pagi', 'Tengah malam', 'Hanya saat ultah'], correctIndex: 1 }
    ],
    mapPos: { x: 62, y: 22 }
  }
];

export const UI_STRINGS = {
  welcome: {
    id: 'Jelajahi Budaya Palembang Bersamo Kito',
    en: 'Explore Palembang Culture With Us',
    plm: 'Peh kito pelajari Budayo Palembang'
  },
  startQuiz: { id: 'Mulai Kuis', en: 'Start Quiz', plm: 'Payo Kuis' },
  back: { id: 'Kembali', en: 'Back', plm: 'Balek' },
  didYouKnow: {
    id: 'Tahukah Kamu?',
    en: 'Did You Know?',
    plm: 'Tau Dak Kau?'
  }
};
