
import React from 'react';

const HallOfFame = () => {
  const committees = [
    {
      id: 1,
      name: "1st Executive Committee",
      president: "Dr. Biru Paksha Paul",
      secretary: "Mohammad Niamot Ali Elahi",
      presidentImage: "https://i.ibb.co.com/Q70kGtZ5/biru-paksha-paul.jpg",
      secretaryImage: "https://i.ibb.co.com/example/secretary1.jpg",
    },
    {
      id: 2,
      name: "2nd Executive Committee",
      president: "Dr. Biru Paksha Paul",
      secretary: "Dr. Abdun or Tushar",
      presidentImage: "https://i.ibb.co.com/Q70kGtZ5/biru-paksha-paul.jpg",
      secretaryImage: "https://i.ibb.co.com/example/secretary2.jpg",
    },
    {
      id: 3,
      name: "3rd Executive Committee",
      president: "A.K.M Shamsul Kabir",
      secretary: "Imran Khan",
      presidentImage: "https://i.ibb.co.com/example/president3.jpg",
      secretaryImage: "https://i.ibb.co.com/vCJ854fX/imran-khan.webp",
    },
    {
      id: 4,
      name: "4th Executive Committee",
      president: "Sheher Imam Chowdhury",
      secretary: "Faham Abdus Salam",
      presidentImage: "https://i.ibb.co.com/example/president4.jpg",
      secretaryImage: "https://i.ibb.co.com/example/secretary4.jpg",
    },
    {
      id: 5,
      name: "5th Executive Committee",
      president: "Hasan Mahmud Biplob",
      secretary: "Tasin Uddin Ahmed",
      presidentImage: "https://i.ibb.co.com/example/president5.jpg",
      secretaryImage: "https://i.ibb.co.com/Y4KMMTn9/tahsin-uddin.jpg",
    },
    {
      id: 6,
      name: "6th Executive Committee",
      president: "Bulbul Hasan",
      secretary: "Asif Newaz",
      presidentImage: "https://i.ibb.co.com/example/president6.jpg",
      secretaryImage: "https://i.ibb.co.com/zVGKVYz5/Asif-Newaz.jpg",
    },
    {
      id: 7,
      name: "7th Executive Committee",
      president: "Tasin Uddin Ahmed",
      secretary: "Sanjib Saha",
      presidentImage: "https://i.ibb.co.com/Y4KMMTn9/tahsin-uddin.jpg",
      secretaryImage: "https://i.ibb.co.com/JRkk6v0K/sanjib-saha.jpg",
    },
    {
      id: 8,
      name: "8th Executive Committee",
      president: "Dr. Abdun or Tushar",
      secretary: "Mahfuz Mishu",
      presidentImage: "https://i.ibb.co.com/example/president8.jpg",
      secretaryImage: "https://i.ibb.co.com/N6Xx0Y5g/Mahfuz-mishu.jpg",
    },
    {
      id: 9,
      name: "9th Executive Committee",
      president: "Sanjib Saha",
      secretary: "Abdullah Md Shukrana",
      presidentImage: "https://i.ibb.co.com/JRkk6v0K/sanjib-saha.jpg",
      secretaryImage: "https://i.ibb.co.com/S49bQYVy/shukrana.jpg",
    },
    
    {
      id: 10,
      name: "10th Executive Committee",
      president: "Abdullah Md Shukrana",
      secretary: "Murad Rony",
      presidentImage: "https://i.ibb.co.com/S49bQYVy/shukrana.jpg",
      secretaryImage: "https://i.ibb.co.com/ZzBMcNZW/murad-rony.jpg",
    },
    {
      id: 11,
      name: "11th Executive Committee",
      president: "Mohammed Saifuddin Munna (Acting)",
      secretary: "Zehad Al Mehedi",
      presidentImage: "https://admin.puc.ac.bd/ProfilePictures/Munna_eee_Saifuddin%20Munna.JPG",
      secretaryImage: "https://i.ibb.co.com/nqYtDDt8/zeyad-al-mehedi.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - নেভবারের নিচে নামানো হয়েছে */}
        <div className="text-center mb-12 mt-0 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Hall of Fame
          </h1>
          <p className="text-gray-600 text-lg">
            Executive Committee Records
          </p>
        </div>

        {/* Committees List */}
        <div className="space-y-8">
          {committees.map((committee) => (
            <div 
              key={committee.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="md:flex">
                {/* Left Side - Committee Info */}
                <div className="md:w-3/5 p-8">
                  <div className="h-full flex flex-col justify-center">
                    <div className="mb-6">
                      <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-2">
                        Executive Committee
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {committee.name}
                      </h2>
                    </div>
                    
                    {/* Removed President and Secretary text sections */}
                  </div>
                </div>

                {/* Right Side - Images */}
                <div className="md:w-2/5 bg-gradient-to-r from-emerald-50 to-white p-8 flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    {/* President */}
                    <div className="text-center">
                      <div className="w-36 h-36 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src={committee.presidentImage} 
                          alt={committee.president}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://i.ibb.co.com/default-avatar.png";
                          }}
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {committee.president}
                      </h3>
                      <p className="text-emerald-600 font-medium">President</p>
                    </div>

                    {/* Secretary */}
                    <div className="text-center">
                      <div className="w-36 h-36 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src={committee.secretaryImage} 
                          alt={committee.secretary}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://i.ibb.co.com/default-avatar.png";
                          }}
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {committee.secretary}
                      </h3>
                      <p className="text-emerald-600 font-medium">General Secretary</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
