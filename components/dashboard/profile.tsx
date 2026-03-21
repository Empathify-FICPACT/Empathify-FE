"use client";

import Image from "next/image";
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("/avatar/avatar1.svg");
  const [selectedGender, setSelectedGender] = useState("Laki-laki");

  const avatars = [
    { src: "/avatar/avatar1.svg", bg: "bg-[#cbf3f0]" },
    { src: "/avatar/avatar2.svg", bg: "bg-[#ffe066]" },
    { src: "/avatar/avatar3.svg", bg: "bg-[#aadbed]" },
    { src: "/avatar/avatar4.svg", bg: "bg-[#7ae5b4]" },
  ];

  return (
    <div className="w-[1500px] items-start max-w-[1740px] mx-12 px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex justify-between items-center mb-6 lg:mb-8 mt-2">
        <h1 className="text-2xl md:text-[28px] font-bold text-gray-900">
          {isEditing ? "Profile Anda" : "Profil Anda"}
        </h1>
      </div>

      {!isEditing ? (
        <>
          {/* View Mode */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between mb-8 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-[100px] h-[100px] rounded-[16px] overflow-hidden bg-[#cbf3f0] flex-shrink-0">
                <Image
                  src={selectedAvatar}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[#2cb46c] text-xl lg:text-2xl font-bold leading-none mb-2">
                  Febrian Faiq
                </h3>
                <p className="text-sm lg:text-xl font-semibold text-gray-900 leading-none mb-3">
                  febrianfaiq@gmail.com
                </p>
                <p className="text-base font-medium text-gray-400 mt-3 leading-none">
                  Bergabung Maret 2026
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 md:mt-0 px-8 py-2.5 bg-[#2cb46c] text-white text-lg font-bold rounded-xl hover:bg-[#259b5c] transition-colors"
            >
              Ubah
            </button>
          </div>

          <h2 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-6 mt-4">
            Statistik
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-[20px] p-6 flex flex-1 items-center gap-4 shadow-sm">
              <div className="w-[70px] h-[70px] flex-shrink-0">
                <Image
                  src="/icon/PenghargaanSimbol.svg"
                  alt="Coin"
                  width={70}
                  height={70}
                />
              </div>
              <div  className="ml-2">
                <p className="text-lg lg:text-xl font-medium text-gray-400 mb-0.5">
                  Total Pingo Coin
                </p>
                <p className="text-xl lg:text-2xl font-extrabold text-gray-900 leading-snug">
                  30 Coin
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[20px] p-6 flex flex-1 items-center gap-4 shadow-sm">
              <div className="w-[70px] h-[70px] flex-shrink-0">
                <Image
                  src="/logo/BadgeLevel.svg"
                  alt="Lencana"
                  width={70}
                  height={70}
                />
              </div>
              <div className="ml-2">
                <p className="text-lg lg:text-xl font-medium text-gray-400 mb-0.5">
                  Lencana
                </p>
                <p className="text-xl lg:text-2xl font-extrabold text-gray-900 leading-snug">
                  Pemula
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Edit Mode */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 lg:p-8 shadow-sm">
            <h3 className="text-lg font-medium text-gray-400 mb-4">
              Foto Profile
            </h3>
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {avatars.map((av, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedAvatar(av.src)}
                  className={`w-[100px] h-[100px] rounded-[16px] overflow-hidden flex-shrink-0 cursor-pointer ${
                    av.bg
                  } border-[3px] ${
                    selectedAvatar === av.src
                      ? "border-[#2cb46c]"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={av.src}
                    alt={`Avatar ${idx + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <h3 className="text-lg font-medium text-gray-400 mb-4">
              Informasi Akun
            </h3>

            <div className="flex flex-col gap-6">
              {/* Nama Input */}
              <div>
                <label className="block text-xl font-bold text-gray-900 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  defaultValue="Febrian Faiq"
                  className="w-full h-[48px] px-4 rounded-xl border border-gray-200 text-xl outline-none focus:border-[#2cb46c] text-gray-900 font-medium"
                />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-xl font-bold text-gray-900 mb-2">
                  Jenis Kelamin
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setSelectedGender("Laki-laki")}
                    className={`flex-1 h-[48px] rounded-xl border flex items-center justify-center sm:justify-start px-4 gap-3 text-gray-900 font-medium text-xl transition-colors ${
                      selectedGender === "Laki-laki"
                        ? "border-[#2cb46c] bg-[#e6fbf2]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <Image
                      src="/icon/SimbolCowo.svg"
                      alt="Laki-laki"
                      width={20}
                      height={20}
                    />
                    Laki-laki
                  </button>
                  <button
                    onClick={() => setSelectedGender("Perempuan")}
                    className={`flex-1 h-[48px] rounded-xl border flex items-center justify-center sm:justify-start px-4 gap-3 text-gray-900 font-medium text-xl transition-colors ${
                      selectedGender === "Perempuan"
                        ? "border-[#2cb46c] bg-[#e6fbf2]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <Image
                      src="/icon/SimbolCewe.svg"
                      alt="Perempuan"
                      width={30}
                      height={30}
                    />
                    Perempuan
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xl font-bold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="febrianfaiq@gmail.com"
                  className="w-full h-[48px] px-4 rounded-xl border border-gray-200 text-xl outline-none focus:border-[#2cb46c] text-gray-900 font-medium disabled:bg-gray-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="px-8 py-3 bg-[#2cb46c] text-white font-bold text-xl rounded-xl hover:bg-[#259b5c] transition-colors"
                >
                  Simpan Perubahan
                </button>
                {/* <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-8 py-3  text-[#FF0000] font-bold text-xl rounded-xl hover:bg-red-100 border border-gray-300 transition-colors"
                >
                  Hapus Akun
                </button> */}
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 bg-[#E9F8F0] text-[#2cb46c] font-bold text-xl border border-gray-300 rounded-xl hover:text-green-700"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-[24px] w-full max-w-[400px] p-6 lg:p-8 flex flex-col items-center text-center shadow-lg">
            <div className="w-[120px] h-[120px] mb-4 flex items-center justify-center">
              <Image
                src="/pinguin/PinguinSenang.svg"
                alt="Pingo"
                width={200}
                height={200}
                className="object-contain "
              />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-2">
              Simpan perubahan sekarang?
            </h3>
            <p className="text-[14px] font-medium text-gray-500 mb-8 px-4">
              Perubahan yang kamu lakukan akan disimpan.
            </p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3.5 bg-[#e6fbf2] text-[#2cb46c] font-bold rounded-xl hover:bg-[#d1f7e4] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setIsEditing(false);
                }}
                className="flex-1 py-3.5 bg-[#2cb46c] text-white font-bold rounded-xl hover:bg-[#259b5c] transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-[24px] w-full max-w-[400px] p-6 lg:p-8 flex flex-col items-center text-center shadow-lg">
            <div className="w-[120px] h-[120px] mb-4 flex items-center justify-center">
              <Image
                src="/pinguin/PinguinSedih.svg"
                alt="Pingo Crying"
                width={200}
                height={200}
                className="object-contain "
              />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-2">
              Yakin ingin menghapus akun?
            </h3>
            <p className="text-[14px] font-medium text-gray-500 mb-8 px-2 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan dan semua data akan terhapus.
            </p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3.5 bg-[#f9fafb] text-[#ff0000] border border-gray-100 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setIsEditing(false);
                }}
                className="flex-1 py-3.5 bg-[#ff0000] text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
