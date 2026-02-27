// Data konten budaya Palembang dalam 3 bahasa
const cultureData = {
    pempek: {
        id: {
            title: "Pempek",
            icon: "🍽️",
	    video:"video/pempek.mp4",
            description: "Pempek adalah makanan khas Palembang yang terbuat dari ikan dan sagu. Pempek memiliki berbagai jenis seperti pempek kapal selam, pempek lenjer, dan pempek adaan. Makanan ini biasanya disajikan dengan kuah cuko yang terbuat dari gula merah, cuka, bawang putih, dan cabai.",
            facts: [
                "Pempek sudah ada sejak abad ke-16",
                "Nama 'pempek' berasal dari panggilan 'apek' yang berarti paman dalam bahasa Hokkian",
                "Pempek kapal selam berisi telur ayam di dalamnya",
                "Cuko adalah saus khas yang membuat pempek semakin nikmat"
            ],
            funFact: "Tahukah kamu? Setiap hari, ribuan pempek diproduksi di Palembang! 🎉"
        },
        en: {
            title: "Pempek",
            icon: "🍽️",
	    video:"video/pempek.mp4",
            description: "Pempek is a typical Palembang food made from fish and sago. Pempek has various types such as pempek kapal selam (submarine pempek), pempek lenjer, and pempek adaan. This food is usually served with cuko sauce made from palm sugar, vinegar, garlic, and chili.",
            facts: [
                "Pempek has existed since the 16th century",
                "The name 'pempek' comes from the Hokkian word 'apek' meaning uncle",
                "Pempek kapal selam contains chicken eggs inside",
                "Cuko is a special sauce that makes pempek more delicious"
            ],
            funFact: "Did you know? Thousands of pempek are produced in Palembang every day! 🎉"
        },
        plm: {
            title: "Pempek",
            icon: "🍽️",
	    video:"video/pempek.mp4",
            description: "Pempek tu makanan khas Palembang yang dibuat dari ikan samo sagu. Pempek ado macem-macem macam pempek kapal selam, pempek lenjer, samo pempek adaan. Makanan ini biasonyo dimakan samo kuah cuko yang dibuat dari gulo merah, cuko, bawang putih, samo cabe.",
            facts: [
                "Pempek itu dah ado sejak abad ke-16",
                "Namonyo 'pempek' tu asalnyo dari panggilan 'apek' yang artinya paman dalam bahasa Hokkian",
                "Pempek kapal selam tu isinya ado telur ayam",
                "Cuko tu saus khas yang bikin pempek makin sedap"
            ],
            funFact: "Tau idak? Setiap hari, ribuan pempek diproduksi di Palembang! 🎉"
        }
    },
    
    "rumah-adat": {
        id: {
            title: "Rumah Limas",
            icon: "🏠",
            description: "Rumah Limas adalah rumah adat khas Palembang yang memiliki bentuk atap seperti limas atau piramida. Rumah ini dibangun dengan menggunakan kayu ulin yang kuat dan tahan lama. Rumah Limas memiliki struktur panggung yang tinggi untuk menghindari banjir dan binatang buas.",
            facts: [
                "Rumah Limas memiliki 5 tingkat atap yang melambangkan 5 rukun Islam",
                "Bagian bawah rumah biasanya digunakan untuk menyimpan hasil panen",
                "Ornamen rumah Limas penuh dengan ukiran tradisional",
                "Rumah ini mencerminkan status sosial pemiliknya"
            ],
            funFact: "Rumah Limas bisa bertahan hingga ratusan tahun! 🏛️"
        },
        en: {
            title: "Limas Traditional House",
            icon: "🏠",
            description: "Rumah Limas is a traditional Palembang house with a roof shaped like a pyramid. This house is built using strong and durable ironwood. Rumah Limas has a high stilt structure to avoid floods and wild animals.",
            facts: [
                "Rumah Limas has 5 roof levels symbolizing the 5 pillars of Islam",
                "The lower part of the house is usually used to store harvests",
                "Limas house ornaments are full of traditional carvings",
                "This house reflects the social status of its owner"
            ],
            funFact: "Rumah Limas can last for hundreds of years! 🏛️"
        },
        plm: {
            title: "Rumah Limas",
            icon: "🏠",
            description: "Rumah Limas tu rumah adat khas Palembang yang bentuk atoknyo tu macam limas atau piramida. Rumah ini dibangun pake kayu ulin yang kuat samo tahan lamo. Rumah Limas tu tinggi panggungannyo buat ngindari banjir samo binatang buas.",
            facts: [
                "Rumah Limas ado 5 tingkat atok yang melambangkan 5 rukun Islam",
                "Bagian bawah rumah biasonyo dipake buat nyimpen hasil panen",
                "Ornamen rumah Limas penuh samo ukiran tradisional",
                "Rumah ini mencerminkan status sosial pemiliknya"
            ],
            funFact: "Rumah Limas biso bertahan sampe ratusan tahun! 🏛️"
        }
    },
    
    jembatan: {
        id: {
            title: "Jembatan Ampera",
            icon: "🌉",
            description: "Jembatan Ampera adalah ikon Kota Palembang yang membentang di atas Sungai Musi. Jembatan ini dibangun pada tahun 1962 dan awalnya dapat diangkat untuk memberi jalan bagi kapal yang lewat. Jembatan Ampera menjadi simbol kemajuan dan kebanggaan masyarakat Palembang.",
            facts: [
                "Panjang jembatan adalah 1.177 meter",
                "Nama 'Ampera' singkatan dari Amanat Penderitaan Rakyat",
                "Jembatan ini dulunya bernama Jembatan Musi",
                "Mekanisme angkat jembatan sudah tidak digunakan sejak 1970"
            ],
            funFact: "Jembatan Ampera adalah jembatan vertikal pertama di Indonesia! 🌉"
        },
        en: {
            title: "Ampera Bridge",
            icon: "🌉",
            description: "Ampera Bridge is an icon of Palembang City that stretches over the Musi River. This bridge was built in 1962 and could originally be lifted to make way for passing ships. Ampera Bridge has become a symbol of progress and pride for the people of Palembang.",
            facts: [
                "The bridge length is 1,177 meters",
                "The name 'Ampera' stands for Amanat Penderitaan Rakyat (Mandate of People's Suffering)",
                "This bridge was formerly called Musi Bridge",
                "The bridge lifting mechanism has not been used since 1970"
            ],
            funFact: "Ampera Bridge is the first vertical bridge in Indonesia! 🌉"
        },
        plm: {
            title: "Jembatan Ampera",
            icon: "🌉",
            description: "Jembatan Ampera tu ikon Kota Palembang yang membentang di atas Sungai Musi. Jembatan ini dibangun tahun 1962 samo awalnyo biso diangkat buat ngasi jalan kapal yang lewat. Jembatan Ampera jadi simbol kemajuan samo kebanggaan masyarakat Palembang.",
            facts: [
                "Panjang jembatan tu 1.177 meter",
                "Namo 'Ampera' tu singkatan dari Amanat Penderitaan Rakyat",
                "Jembatan ini dulunyo bernamo Jembatan Musi",
                "Mekanisme angkat jembatan dah idak dipake sejak 1970"
            ],
            funFact: "Jembatan Ampera tu jembatan vertikal pertamo di Indonesia! 🌉"
        }
    },
    
    tari: {
        id: {
            title: "Tari Gending Sriwijaya",
            icon: "💃",
            description: "Tari Gending Sriwijaya adalah tarian tradisional Palembang yang menggambarkan keanggunan dan kegembiraan masyarakat dalam menyambut tamu. Tarian ini biasanya ditampilkan dengan gerakan lemah gemulai dan kostum yang penuh warna cerah serta aksesoris emas.",
            facts: [
                "Tarian ini diciptakan pada tahun 1960-an",
                "Penari mengenakan mahkota emas yang disebut 'aesan gede'",
                "Gerakan tari melambangkan keramahan masyarakat Palembang",
                "Musik pengiringnya menggunakan alat musik tradisional seperti gendang dan serunai"
            ],
            funFact: "Tari Gending Sriwijaya sering ditampilkan untuk menyambut tamu penting! 👑"
        },
        en: {
            title: "Gending Sriwijaya Dance",
            icon: "💃",
            description: "Gending Sriwijaya Dance is a traditional Palembang dance that depicts the elegance and joy of the community in welcoming guests. This dance is usually performed with graceful movements and costumes full of bright colors and gold accessories.",
            facts: [
                "This dance was created in the 1960s",
                "Dancers wear a gold crown called 'aesan gede'",
                "Dance movements symbolize the hospitality of Palembang people",
                "The accompanying music uses traditional instruments such as drums and serunai"
            ],
            funFact: "Gending Sriwijaya Dance is often performed to welcome important guests! 👑"
        },
        plm: {
            title: "Tari Gending Sriwijaya",
            icon: "💃",
            description: "Tari Gending Sriwijaya tu tarian tradisional Palembang yang menggambarkan keanggunan samo kegembiraan masyarakat dalam nyambut tamu. Tarian ini biasonyo ditampilkan samo gerakan lemah gemulai samo kostum yang penuh warno cerah samo aksesoris emas.",
            facts: [
                "Tarian ini diciptakan tahun 1960-an",
                "Penari make mahkota emas yang disebutnyo 'aesan gede'",
                "Gerakan tari melambangkan keramahan masyarakat Palembang",
                "Musik pengiringnya make alat musik tradisional macam gendang samo serunai"
            ],
            funFact: "Tari Gending Sriwijaya sering ditampilkan buat nyambut tamu penting! 👑"
        }
    },
    
    sriwijaya: {
        id: {
            title: "Kerajaan Sriwijaya",
            icon: "🏛️",
            description: "Kerajaan Sriwijaya adalah kerajaan maritim yang berjaya pada abad ke-7 hingga ke-13 Masehi dengan pusat di Palembang. Kerajaan ini menguasai jalur perdagangan maritim di Selat Malaka dan menjadi pusat penyebaran agama Buddha di Asia Tenggara.",
            facts: [
                "Sriwijaya adalah kerajaan maritim terbesar di Nusantara",
                "Raja terkenal: Raja Balaputradewa",
                "Memiliki armada laut yang sangat kuat",
                "Menjadi pusat pendidikan Buddha terbesar di Asia Tenggara"
            ],
            funFact: "Kerajaan Sriwijaya pernah menguasai hampir seluruh wilayah Nusantara! ⚔️"
        },
        en: {
            title: "Sriwijaya Kingdom",
            icon: "🏛️",
            description: "Sriwijaya Kingdom was a maritime kingdom that flourished from the 7th to 13th century AD with its center in Palembang. This kingdom controlled maritime trade routes in the Strait of Malacca and became a center for the spread of Buddhism in Southeast Asia.",
            facts: [
                "Sriwijaya was the largest maritime kingdom in the archipelago",
                "Famous king: King Balaputradewa",
                "Had a very strong naval fleet",
                "Became the largest Buddhist education center in Southeast Asia"
            ],
            funFact: "The Sriwijaya Kingdom once controlled almost the entire archipelago! ⚔️"
        },
        plm: {
            title: "Kerajaan Sriwijaya",
            icon: "🏛️",
            description: "Kerajaan Sriwijaya tu kerajaan maritim yang berjayo pada abad ke-7 sampe ke-13 Masehi samo pusatnyo di Palembang. Kerajaan ini nguasai jalur perdagangan maritim di Selat Malaka samo jadi pusat penyebaran agama Buddha di Asia Tenggara.",
            facts: [
                "Sriwijaya tu kerajaan maritim terbesar di Nusantara",
                "Raja terkenal: Raja Balaputradewa",
                "Punya armada laut yang sangat kuat",
                "Jadi pusat pendidikan Buddha terbesar di Asia Tenggara"
            ],
            funFact: "Kerajaan Sriwijaya pernah nguasai hampir seluruh wilayah Nusantara! ⚔️"
        }
    },
    
    pakaian: {
        id: {
            title: "Pakaian Adat Aesan Gede",
            icon: "👘",
            description: "Aesan Gede adalah pakaian adat Palembang yang mewah dan megah, biasanya digunakan dalam upacara pernikahan adat. Pakaian ini dihiasi dengan hiasan emas, songket, dan mahkota yang indah. Aesan Gede mencerminkan kemegahan Kerajaan Sriwijaya.",
            facts: [
                "Aesan Gede berarti 'perhiasan besar'",
                "Menggunakan kain songket yang ditenun dengan benang emas",
                "Mahkota pengantin bisa mencapai berat 3-4 kg",
                "Perhiasan terdiri dari kalung, gelang, dan anting-anting emas"
            ],
            funFact: "Satu set Aesan Gede lengkap bisa seberat 10 kg! 👑"
        },
        en: {
            title: "Aesan Gede Traditional Costume",
            icon: "👘",
            description: "Aesan Gede is a luxurious and magnificent Palembang traditional costume, usually used in traditional wedding ceremonies. This outfit is decorated with gold ornaments, songket, and beautiful crowns. Aesan Gede reflects the grandeur of the Sriwijaya Kingdom.",
            facts: [
                "Aesan Gede means 'big jewelry'",
                "Uses songket fabric woven with gold thread",
                "Bridal crown can weigh up to 3-4 kg",
                "Jewelry consists of gold necklaces, bracelets, and earrings"
            ],
            funFact: "A complete set of Aesan Gede can weigh 10 kg! 👑"
        },
        plm: {
            title: "Pakaian Adat Aesan Gede",
            icon: "👘",
            description: "Aesan Gede tu pakaian adat Palembang yang mewah samo megah, biasonyo dipake dalam upacara pernikahan adat. Pakaian ini dihiasi samo hiasan emas, songket, samo mahkota yang cantik. Aesan Gede mencerminkan kemegahan Kerajaan Sriwijaya.",
            facts: [
                "Aesan Gede tu artinya 'perhiasan besar'",
                "Make kain songket yang ditenun samo benang emas",
                "Mahkota pengantin biso sampe berat 3-4 kg",
                "Perhiasan terdiri dari kalung, gelang, samo anting-anting emas"
            ],
            funFact: "Satu set Aesan Gede lengkap biso seberat 10 kg! 👑"
        }
    },
    
    musik: {
        id: {
            title: "Alat Musik Tradisional",
            icon: "🎵",
            description: "Palembang memiliki berbagai alat musik tradisional seperti Gendang Melayu, Serunai, dan Gambus. Alat-alat musik ini digunakan dalam berbagai upacara adat dan pertunjukan seni. Musik tradisional Palembang memiliki irama yang khas dan merdu.",
            facts: [
                "Gendang Melayu terbuat dari kayu dan kulit hewan",
                "Serunai adalah alat musik tiup dari bambu",
                "Gambus berasal dari pengaruh budaya Arab",
                "Musik tradisional sering mengiringi tari-tarian"
            ],
            funFact: "Musik tradisional Palembang memadukan pengaruh Melayu, Arab, dan Jawa! 🎶"
        },
        en: {
            title: "Traditional Musical Instruments",
            icon: "🎵",
            description: "Palembang has various traditional musical instruments such as Gendang Melayu, Serunai, and Gambus. These instruments are used in various traditional ceremonies and art performances. Palembang traditional music has a distinctive and melodious rhythm.",
            facts: [
                "Gendang Melayu is made from wood and animal skin",
                "Serunai is a bamboo wind instrument",
                "Gambus comes from Arab cultural influence",
                "Traditional music often accompanies dances"
            ],
            funFact: "Palembang traditional music combines Malay, Arab, and Javanese influences! 🎶"
        },
        plm: {
            title: "Alat Musik Tradisional",
            icon: "🎵",
            description: "Palembang ado macem-macem alat musik tradisional macam Gendang Melayu, Serunai, samo Gambus. Alat-alat musik ini dipake dalam macem-macem upacara adat samo pertunjukan seni. Musik tradisional Palembang ado irama yang khas samo merdu.",
            facts: [
                "Gendang Melayu dibuat dari kayu samo kulit hewan",
                "Serunai tu alat musik tiup dari bambu",
                "Gambus asalnyo dari pengaruh budaya Arab",
                "Musik tradisional sering ngiringi tari-tarian"
            ],
            funFact: "Musik tradisional Palembang memadukan pengaruh Melayu, Arab, samo Jawa! 🎶"
        }
    },
    
    songket: {
        id: {
            title: "Kain Songket",
            icon: "🧵",
            description: "Songket Palembang adalah kain tenun tradisional yang dihiasi dengan benang emas dan perak. Pembuatan songket membutuhkan ketelitian dan waktu yang lama. Songket biasanya digunakan dalam acara-acara resmi dan upacara adat.",
            facts: [
                "Satu lembar songket bisa memakan waktu 1-3 bulan pembuatan",
                "Motif songket terinspirasi dari alam dan kerajaan Sriwijaya",
                "Menggunakan benang emas 24 karat asli",
                "Setiap motif memiliki makna filosofis tersendiri"
            ],
            funFact: "Songket Palembang termasuk kain tenun termahal di Indonesia! ✨"
        },
        en: {
            title: "Songket Fabric",
            icon: "🧵",
            description: "Palembang Songket is a traditional woven fabric decorated with gold and silver threads. Making songket requires precision and a long time. Songket is usually used in official events and traditional ceremonies.",
            facts: [
                "One piece of songket can take 1-3 months to make",
                "Songket motifs are inspired by nature and the Sriwijaya kingdom",
                "Uses genuine 24-karat gold thread",
                "Each motif has its own philosophical meaning"
            ],
            funFact: "Palembang Songket is one of the most expensive woven fabrics in Indonesia! ✨"
        },
        plm: {
            title: "Kain Songket",
            icon: "🧵",
            description: "Songket Palembang tu kain tenun tradisional yang dihiasi samo benang emas samo perak. Pembuatan songket butuh ketelitian samo waktu yang lamo. Songket biasonyo dipake dalam acara-acara resmi samo upacara adat.",
            facts: [
                "Satu lembar songket biso makan waktu 1-3 bulan pembuatan",
                "Motif songket terinspirasi dari alam samo kerajaan Sriwijaya",
                "Make benang emas 24 karat asli",
                "Setiap motif ado makna filosofis tersendirinyo"
            ],
            funFact: "Songket Palembang termasuk kain tenun termahal di Indonesia! ✨"
        }
    },
    
    sejarah: {
        id: {
            title: "Kisah Sejarah Palembang",
            icon: "📖",
            description: "Palembang memiliki sejarah panjang sebagai pusat Kerajaan Sriwijaya yang jaya. Kota ini menjadi saksi berbagai peristiwa penting dalam sejarah Indonesia, mulai dari zaman kerajaan hingga kemerdekaan. Palembang juga dikenal dengan Benteng Kuto Besak yang bersejarah.",
            facts: [
                "Palembang adalah salah satu kota tertua di Indonesia",
                "Prasasti Kedukan Bukit (tahun 682 M) adalah bukti kejayaan Sriwijaya",
                "Benteng Kuto Besak dibangun pada tahun 1780",
                "Palembang pernah menjadi ibukota Kesultanan Palembang Darussalam"
            ],
            funFact: "Palembang berusia lebih dari 1300 tahun! 📜"
        },
        en: {
            title: "History of Palembang",
            icon: "📖",
            description: "Palembang has a long history as the center of the glorious Sriwijaya Kingdom. This city has witnessed various important events in Indonesian history, from the kingdom era to independence. Palembang is also known for the historic Kuto Besak Fort.",
            facts: [
                "Palembang is one of the oldest cities in Indonesia",
                "Kedukan Bukit Inscription (682 AD) is proof of Sriwijaya's glory",
                "Kuto Besak Fort was built in 1780",
                "Palembang was once the capital of the Palembang Darussalam Sultanate"
            ],
            funFact: "Palembang is over 1300 years old! 📜"
        },
        plm: {
            title: "Kisah Sejarah Palembang",
            icon: "📖",
            description: "Palembang ado sejarah panjang sebagai pusat Kerajaan Sriwijaya yang jayo. Kota ini jadi saksi macem-macem peristiwa penting dalam sejarah Indonesia, mulai dari zaman kerajaan sampe kemerdekaan. Palembang juga dikenal samo Benteng Kuto Besak yang bersejarah.",
            facts: [
                "Palembang tu salah satu kota tertuonyo di Indonesia",
                "Prasasti Kedukan Bukit (tahun 682 M) tu bukti kejayaan Sriwijaya",
                "Benteng Kuto Besak dibangun tahun 1780",
                "Palembang pernah jadi ibukota Kesultanan Palembang Darussalam"
            ],
            funFact: "Palembang berusia lebih dari 1300 tahun! 📜"
        }
    },
    
    permainan: {
        id: {
            title: "Permainan Tradisional",
            icon: "🎮",
            description: "Anak-anak Palembang memiliki berbagai permainan tradisional seperti Tebak-tebak Buah Manggis, Main Kelereng, dan Congklak. Permainan ini mengajarkan nilai-nilai kerjasama, strategi, dan kegembiraan bersama teman-teman.",
            facts: [
                "Tebak-tebak Buah Manggis adalah permainan tebak-tebakan",
                "Congklak menggunakan papan kayu dan biji-bijian",
                "Main Kelereng melatih ketangkasan dan strategi",
                "Permainan tradisional dimainkan saat sore hari"
            ],
            funFact: "Permainan tradisional tidak butuh gadget tapi tetap seru! 🎯"
        },
        en: {
            title: "Traditional Games",
            icon: "🎮",
            description: "Palembang children have various traditional games such as Tebak-tebak Buah Manggis, Marbles, and Congklak. These games teach values of cooperation, strategy, and joy with friends.",
            facts: [
                "Tebak-tebak Buah Manggis is a guessing game",
                "Congklak uses a wooden board and seeds",
                "Playing Marbles trains dexterity and strategy",
                "Traditional games are played in the afternoon"
            ],
            funFact: "Traditional games don't need gadgets but are still fun! 🎯"
        },
        plm: {
            title: "Permainan Tradisional",
            icon: "🎮",
            description: "Anak-anak Palembang ado macem-macem permainan tradisional macam Tebak-tebak Buah Manggis, Main Kelereng, samo Congklak. Permainan ini ngajarin nilai-nilai kerjasama, strategi, samo kegembiraan bersamo kawan-kawan.",
            facts: [
                "Tebak-tebak Buah Manggis tu permainan tebak-tebakan",
                "Congklak make papan kayu samo biji-bijian",
                "Main Kelereng melatih ketangkasan samo strategi",
                "Permainan tradisional dimainkan waktu sore hari"
            ],
            funFact: "Permainan tradisional idak butuh gadget tapi tetap seru! 🎯"
        }
    }
};

// Export data untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cultureData;
}
